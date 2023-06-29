

import paramiko
import subprocess
import concurrent.futures
import re
import pprint
def dd(data,depth=5):
    pp = pprint.PrettyPrinter(depth=depth)
    pp.pprint(data)

'''
    prompt:
        I want to automate running and monitoring all these commands.

        It needs to present an interface (in the terminal or gtk) showing things running normally, also everything should begin slowly. if anything makes unusual noise (learn what things usually do) it should bring that information into view, ie showing the user novel events.

        Here are several sequences of commands,
         the first is usually an ssh session the rest happen in
         then we wait observing the last command forever

    has nobody made a harness for this though,
     that unifies all the potential messaging these commands could emit
      certainly STDERR would be top priority
      perhaps with machine learning their expected output and scanning for novelty.
    
'''

# By using the r prefix before the opening quotes ('''),
#  the string is treated as a raw string
#  and backslashes within the string are not treated as escape characters.
cmd_source = r'''
    # style_dev
       cd stylehouse
        ./serve.pl
    # letz_dev
       ssh -A gox
        sshfs s:/media/s/Elvis/Photo v
         # s is 192.168.122.1, virbr0 on sa
         # v is the mount at gox:~s/v, goes into:
       ssh gox
        cd src/letz
        podman run -v ~/v:/v:ro -v .:/app:exec -p 5000:5000 --rm -it --name pyt py bash -c './yt.sh'
       ssh gox
        cd src/letz
        podman run -v .:/app:exec -p 8000:8000 --rm -it --name cos1 cos npm run dev -- --port 8000 --host 0.0.0.0
       cd src/letz
        code .
    # dev_fe
       chromeium \
        http://editong.localhost:1812/ \
        http://192.168.122.92:5000/dir/ \
        http://192.168.122.92:8000/
       
    # nico
       ssh n
        sudo mount -t 9p -o trans=virtio allmusic allmusic/
         # input: share, is a qemu filesystem%type="mount"/source,target,readonly
       sshfs n:Downloads/ Mail
         # output: to sort
       ssh -X n
        cd Downloads/
         # it sometimes drops files where it cd?
        nicotine
         # a python window
'''

# python obviously doesn't like chewing on text
def parse_cmd_source(L):
    leading_pattern = re.compile(r'^(\s+)(# ?)?(.+?)$')
    escaped_newline = re.compile(r'^(.*)\\$')

    # to be system/job/command+
    systems = []
    system = None
    job = None
    indof = {'system': None, 'job': None}

    same_cmd_next = 0
    def job_cmd_stuff(stuff):
        nonlocal same_cmd_next
        same_cmd_now = same_cmd_next
        
        # in bash you can escape the \n at the end
        match = escaped_newline.match(stuff)
        if match:
            same_cmd_next = 1
            stuff = match.group(1)
        else:
            same_cmd_next = 0
        
        if same_cmd_now:
            job["cmds"][-1] += stuff
        else:
            job["cmds"].append(stuff)

    for line in L.split("\n"):
        match = leading_pattern.match(line)
        if match:
            indent, iscomment, stuff = match.groups()
            indent = len(indent)
            if iscomment:
                if not indof['system'] or indof['system'] == indent:
                    # establishes or is how indented system titles are
                    indof['system'] = indent
                    # is a system title
                    system = {"t":stuff,"jobs": []}
                    systems.append(system)

                # else a comment in the source
                continue
            
            if not indof['job'] or indof['job'] == indent:
                # establishes or is how indented jobs' first (and subsequent commands) are
                indof['job'] = indent
                if not system:
                    raise ValueError("nosystem")
                
                job = {"cmds":[]}
                system["jobs"].append(job)

                job_cmd_stuff(stuff)
            
            if indof['job']+1 == indent:
                if not job:
                    raise ValueError("nojob")
                
                job_cmd_stuff(stuff)

    return systems


systems = parse_cmd_source(cmd_source)
'''
    that is:
    [{'jobs': [{'cmds': ['cd stylehouse', './serve.pl']}], 't': 'style_dev'},
    {'jobs': [{'cmds': ['ssh -A gox', 'sshfs s:/media/s/Elvis/Photo v']},
            {'cmds': ['ssh gox',
                        'cd src/letz',
                        'podman run -v ~/v:/v:ro -v .:/app:exec -p 5000:5000 --rm '
                        "-it --name pyt py bash -c './yt.sh'"]},
            {'cmds': ['ssh gox',
                        'cd src/letz',
                        'podman run -v .:/app:exec -p 8000:8000 --rm -it --name '
                        'cos1 cos npm run dev -- --port 8000 --host 0.0.0.0']},
            {'cmds': ['cd src/letz', 'code .']}],
    't': 'letz_dev'},
    {'jobs': [{'cmds': ['chromeium \\',
                        'http://editong.localhost:1812/ \\',
                        'http://192.168.122.92:5000/dir/ \\',
                        'http://192.168.122.92:8000/']}],
    't': 'dev_fe'},
    {'jobs': [{'cmds': ['ssh n',
                        'sudo mount -t 9p -o trans=virtio allmusic allmusic/']},
            {'cmds': ['sshfs n:Downloads/ Mail']},
            {'cmds': ['ssh -X n', 'cd Downloads/', 'nicotine']}],
    't': 'nico'}]

'''





# < name jobs, eg "serve", "gox: sshfs Photo v", "gox: @pyt", "n: nicotine"
def wordynoiseblob(s):
    enough = 0.76
    got = len(re.findall(r'\w', s)) / len(s)
    return False if got < enough else True
def create_job_title(cmds):
    titles = []
    for cmd in cmds:
        match = re.search(r'^sudo (.+)$', cmd)
        if match:
            cmd = match.group(1)
        
        match = re.search(r'^cd ', cmd)
        if match:
            continue

        match = re.search(r'^ssh .*?(\w+)$', cmd)
        if match:
            titles.append(match.group(1)+':')
            continue

        match = re.search(r'^podman run .* --name (\S+) (\S+) ?((\w+ ?)+)?', cmd)
        if match:
            titles.append(match.group(2)+'->'+match.group(1))
            if match.group(3):
                titles.append(match.group(3).strip())
            continue

        match = re.search(r'^(sshfs \w+:)(\S*?)([^\s/]+)/? (\S+)$', cmd)
        if match:
            vague = '...' if len(match.group(3)) else ''
            if len(match.group(2)+match.group(3)) < 11:
                titles.append(cmd)
            else:
                titles.append(match.group(1)+vague+match.group(3)+' '+match.group(4))
            continue

        match = re.search(r'(\w\S{2,}( \S{,3})?)$', cmd)
        if match:
            guess = match.group(1)
            match = re.search(r'^(\w\S+) ', cmd)
            if match:
                command = match.group(1)
                if not command in guess:
                    titles.append(command)
            if wordynoiseblob(guess):
                titles.append(guess)
            if len(titles):
                # either command or guess is better than whole cmd
                continue
        
        titles.append(cmd)
    return ' '.join(titles)
# Iterate over systems and create titles for jobs
for system in systems:
    jobs = system['jobs']
    for job in jobs:
        cmds = job['cmds']
        job['t'] = create_job_title(cmds)


dd(systems)

# try one only
systems = [system for system in systems if system['t'] == 'nico']

# < convert to one ssh call? eg ssh -X n 'cd Downloads; nicotine'


exit();

def run_ssh_command(hostname, username, password, command):
    # Create SSH client
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        # Connect to the SSH server
        client.connect(hostname)

        # Execute the command
        session = client.get_transport().open_session()
        session.exec_command(command)

        # Return the output
        return session.makefile().read()

    finally:
        # Close the SSH connection
        client.close()

def run_local_command(command):
    # Execute the command and capture the output
    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    # Return the output
    return result.stdout.strip()

# Define your commands
commands = [
    {
        "type": "ssh",
        "hostname": "gox",
        "username": "your_username",
        "password": "your_password",
        "command": "sshfs s:/media/s/Elvis/Photo v",
    },
    {
        "type": "ssh",
        "hostname": "gox",
        "username": "your_username",
        "password": "your_password",
        "command": "cd src/letz; podman run -v ~/v:/v:ro -v .:/app:exec -p 5000:5000 --rm -it --name pyt py bash -c './yt.sh'",
    },
    {
        "type": "ssh",
        "hostname": "gox",
        "username": "your_username",
        "password": "your_password",
        "command": "cd src/letz; podman run -v .:/app:exec -p 8000:8000 --rm -it --name cos1 cos npm run dev -- --port 3000 --host 0.0.0.0",
    },
    {
        "type": "local",
        "command": "cd stylehouse; ./serve.pl",
    },
    # Add more commands as needed
]
exit
# Create a ThreadPoolExecutor with the maximum number of workers
with concurrent.futures.ThreadPoolExecutor(max_workers=len(commands)) as executor:
    # Submit each command to the executor
    future_results = []
    for cmd in commands:
        if cmd["type"] == "ssh":
            future_results.append(executor.submit(run_ssh_command, cmd["hostname"], cmd["username"], cmd["password"], cmd["command"]))
        elif cmd["type"] == "local":
            future_results.append(executor.submit(run_local_command, cmd["command"]))

    # Process the results as they become available
    for future in concurrent.futures.as_completed(future_results):
        result = future.result()
        # Process the result (e.g., display or save the output as needed)
        print(result)
