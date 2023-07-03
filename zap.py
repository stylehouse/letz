

import curses
import time
import concurrent.futures
import threading
import subprocess
import re
import json
import pprint
def dd(data,depth=7):
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
    # test
       echo "yup"
        echo "non"
        sleep 1
        echo "Completo!"
       echo "yup"
        sleep 3
        ll nonexists
         # 'll' is not found, exit code 127
        echo "Very nearly!"
        exit 4
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

# name jobs, eg "serve.pl", "gox: sshfs s:...Photo v", "gox: py->pyt bash", "n: nicotine"
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


systems = parse_cmd_source(cmd_source)
# Iterate over systems and create titles for jobs
for system in systems:
    jobs = system['jobs']
    for job in jobs:
        cmds = job['cmds']
        job['t'] = create_job_title(cmds)



'''
    dd(systems)
    is:
        [{'jobs': [{'cmds': ['cd stylehouse', './serve.pl'], 't': 'serve.pl'}],
        't': 'style_dev'},
        {'jobs': [{'cmds': ['ssh -A gox', 'sshfs s:/media/s/Elvis/Photo v'],
                    't': 'gox: sshfs s:...Photo v'},
                {'cmds': ['ssh gox',
                            'cd src/letz',
                            'podman run -v ~/v:/v:ro -v .:/app:exec -p 5000:5000 --rm '
                            "-it --name pyt py bash -c './yt.sh'"],
                    't': 'gox: py->pyt bash'},
                {'cmds': ['ssh gox',
                            'cd src/letz',
                            'podman run -v .:/app:exec -p 8000:8000 --rm -it --name '
                            'cos1 cos npm run dev -- --port 8000 --host 0.0.0.0'],
                    't': 'gox: cos->cos1 npm run dev'},
                {'cmds': ['cd src/letz', 'code .'], 't': 'code .'}],
        't': 'letz_dev'},
        {'jobs': [{'cmds': ['chromeium http://editong.localhost:1812/ '
                            'http://192.168.122.92:5000/dir/ '
                            'http://192.168.122.92:8000/'],
                    't': 'chromeium'}],
        't': 'dev_fe'},
        {'jobs': [{'cmds': ['ssh n',
                            'sudo mount -t 9p -o trans=virtio allmusic allmusic/'],
                    't': 'n: mount allmusic/'},
                {'cmds': ['sshfs n:Downloads/ Mail'],
                    't': 'sshfs n:Downloads/ Mail'},
                {'cmds': ['ssh -X n', 'cd Downloads/', 'nicotine'],
                    't': 'n: nicotine'}],
        't': 'nico'}]
'''



































# try one only
systems = [system for system in systems if system['t'] == 'test']

# Create a ThreadPoolExecutor with the maximum number of workers
job_i = 0
i_job = {}
for system in systems:
    jobs = system['jobs']
    for job in jobs:
        cmds = job['cmds']
        match = re.search(r'^ssh ',cmds[0])
        ssh_around = ''
        if match:
            ssh_around = cmds.pop(0)
        
        # we lose their individuality:
        #  each exit code
        #  each slice of stdout
        cmds = ' && '.join(cmds)
        # it all happens over there if cmds starts with ssh
        #  eg ssh -X n 'cd Downloads; nicotine'
        if ssh_around:
            cmds = ssh_around+' '+json.dumps(cmds)
        
        job["command"] = cmds
        job["i"] = job_i
        i_job[job_i] = job
        job_i = job_i + 1




def delta():
    start_time = time.time()
    return lambda: round((time.time() - start_time) * 1000)

def run_job(job):
    i = job["i"]
    command = job["command"]
    def diag(s):
        #print(s)
        1
    diag(f"[{i}] starts: "+ job["t"])
    # [{std:'out',s:'hello\n',ms:123}+]
    job["output"] = []

    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    def readaline(ch,std):
        for line in iter(std.readline, ""):
            # < do we want the ^ + and \n$
            out = {"std":ch,"s":line.strip(),"time":time.time()}
            diag(f"[{i}] std{ch}: "+out["s"])
            job["output"].append(out)
    readaline('out',process.stdout)
    readaline('err',process.stderr)
    # < stdin
    job["exit_code"] = None
    def check1s():
        exit_code = process.poll()
        if exit_code is not None:
            diag(f"[{i}] trouble! code:"+str(exit_code))
            job["exit_code"] = exit_code
            diag(f"[{i}] finito")
            job["check1s"] = lambda: 1
    job["check1s"] = check1s

def all_systems_go():
    # < figure out if any of this can be less terrifying
    # max_workers so that all jobs can stay happening
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Submit each command to the executor
        future_results = []

        for system in systems:
            jobs = system['jobs']
            for job in jobs:
                future_results.append(executor.submit(run_job, job))

            # Process the results as they become available
            for future in concurrent.futures.as_completed(future_results):
                result = future.result()




def draw_interface(stdscr, selected_row):
    # Clear the screen
    stdscr.clear()

    # Define the dimensions of the interface
    rows, cols = stdscr.getmaxyx()

    # Draw the list of jobs
    for system in systems:
        jobs = system['jobs']
        for job in jobs:
            i = job["i"]
            # Determine the formatting of the command based on selection
            if i == selected_row:
                stdscr.attron(curses.color_pair(1))
            
            # title
            stdscr.addstr(i, 0, "["+str(job["i"])+"] "+job["t"])

            # status
            if "check1s" in job:
                check = job["check1s"]
                check()
                if job["exit_code"] is not None:
                    if not job["exit_code"]:
                        # 0 - good
                        stdscr.addstr(i, 44, "done")
                    else:
                        # 127 etc - bad
                        stdscr.addstr(i, 44, "exit("+str(job["exit_code"])+")")

            if i == selected_row:
                stdscr.attroff(curses.color_pair(1))
    
    # Refresh the screen
    stdscr.refresh()

def main(stdscr):
    # Initialize curses settings
    curses.curs_set(0)
    curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_WHITE)
    stdscr.nodelay(1)

    # Initially selected row
    selected_row = 0

    # Draw the interface
    draw_interface(stdscr, selected_row)

    # Event loop
    while True:
        key = stdscr.getch()

        # Handle key events
        if key == curses.KEY_UP and selected_row > 0:
            selected_row -= 1
        elif key == curses.KEY_DOWN and selected_row < job_i - 1:
            selected_row += 1
        elif key == curses.KEY_ENTER or key == ord('\n'):
            # Run the selected command
            job = i_job[selected_row]
            dd(job)
            if 1:
                outs = job["output"] or []

                # Clear the screen
                stdscr.clear()
                stdscr.addstr(0, 0, "job ["+str(job["i"])+"] "+job["t"])
                for out in outs:
                    # < background colour stderrs?
                    ind = '   ' if out["std"] == 'err' else '!! '
                    stdscr.addstr(2, 0, ind+out["s"])
                
            # Refresh the screen
            stdscr.refresh()

            # Wait for key press to continue
            stdscr.getch()

        # Redraw the interface
        draw_interface(stdscr, selected_row)

        # Refresh the screen
        stdscr.refresh()
        time.sleep(0.1)

# run commands without blocking the UI
def all_systems_go_thread():
    all_systems_go()
all_systems_go_thread = threading.Thread(target=all_systems_go_thread)
all_systems_go_thread.start()

# Run the application
curses.wrapper(main)

dd(systems)