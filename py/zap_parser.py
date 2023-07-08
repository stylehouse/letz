
import re
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
def create_job_title(job,cmds):
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
            job["on_host"] = match.group(1)
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
