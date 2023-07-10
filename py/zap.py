#!/usr/bin/env python3
import time
import concurrent.futures
import threading
import subprocess
import sys
import re
import json
import pprint
from pathlib import Path

import zap_parser
import zap_ui

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

    caveats:
     STDIN
       writes (via job["give_stdin"]) are not getting there
        if interrupted, the thread was apparently in: process.stdin.flush()
       we want something similar to:
        echo input | ssh gox -v 'perl test.pl'
        which in this case fails to echo our input
         while trying to convert the above to a one liner
         this weird behaviour came up:
            s@g:~$ echo that
            that
            s@g:~$ echo lep | perl -E "say qq{this:$_} while <>"
            this:that
         this is because $_ is being interpolated by the shell
          it is the last word of the last command
           ie what Esc-. will insert for you
     sudo
       password prompting must be avoided, see STDIN
        by editing /etc/sudoers, and adding something like:
         someuser   ALL=(ALL:ALL) NOPASSWD: /bin/echo "non"
        at the end
       it might work for you!
        scars left in, see sudostdin
        
    
'''















# By using the r prefix before the opening quotes ('''),
#  the string is treated as a raw string
#  and backslashes within the string are not treated as escape characters.
cmd_source = r'''
    # style_dev
       cd ~/stylehouse
        ./serve.pl
    # letz_dev
       cd ~/src
        lsyncd -nodaemon -delay 0 -rsyncssh letz gox src/letz
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
       cd ~/src/letz
        code .
    # dev_fe
       chromium \
        http://editong.localhost:1812/ \
        http://192.168.122.92:5000/dir/ \
        http://192.168.122.92:8000/
       
    # nico
       ssh n
        sudo mount -t 9p -o trans=virtio allmusic allmusic/
         # input: share, is a qemu filesystem%%type="mount"/source,target,readonly
         #  note the readonly
       cd ~
        sshfs n:Downloads/ Mail
         # output: to sort
       ssh -X n
        cd Downloads/
         # it sometimes drops files where it cd?
        nicotine
         # a python window
       upnpc -r 2234 TCP
        ssh -L 0.0.0.0:2234:n:2234 n
         # let peer in

    # test
       cd ~/stylehouse
        ./serve.pl
       ssh gox
         # < redoif /no route/
         #       virsh start gox
         #       redoif /bridge helper: stderr=failed to create tun device: Operation not permitted/
         #           # freshly installed something needs:
         #           sudo chmod u+s /usr/lib/qemu/qemu-bridge-helper
        echo rop
        #perl test.pl
        sudo /bin/echo "non"
        sleep 1
        echo "Several!"
        sleep 1
        echo "Several loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooongnesses!"
        sleep 1
        echo "Several!"
        sleep 1
        echo "Several!"
        sleep 1
        echo "Several!"
        sleep 1
        echo "Several!"
        sleep 1
        echo "Several!"
        sleep 1
        echo "Several!"
        sleep 1
        echo "Completo!"
       echo "yup"
        sleep 2
        ll nonexists
         # 'll' is not found, exit code 127
        echo "Very nearly!"
        exit 4
'''




















systems = zap_parser.parse_cmd_source(cmd_source)
# Iterate over systems and create titles for jobs
for system in systems:
    jobs = system['jobs']
    for job in jobs:
        cmds = job['cmds']
        job['t'] = zap_parser.create_job_title(job,cmds)


# try one only
only = sys.argv[1] if len(sys.argv)>1 else None
if only:
    systems = [system for system in systems if system['t'] == only]
else:
    systems = [system for system in systems if not system['t'] == 'nico']
    systems = [system for system in systems if not system['t'] == 'test']

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

        if 0 and 'sudostdin':
            # sudo to accept password on stdin
            # < we should note which cmd had it,
            #    check that cmd is currently executing via a supervisory ssh 'ps faux'
            cmds = [cmd.replace("sudo ", "sudo -S ") for cmd in cmds]
        job['cmds'] = cmds

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

def run_job(job):
    i = job["i"]
    command = job["command"]
    def diag(s):
        #print(s)
        1
    diag(f"[{i}] starts: "+ job["t"])
    # [{std:'out',s:'hello\n',ms:123}+]
    job["output"] = []

    process = subprocess.Popen(command, shell=True,
                                stdin=subprocess.PIPE,
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE,
                                text=True,
                                bufsize=0)
    def readaline(ch,std):
        linesing = iter(std.readline, "")
        for line in linesing:
            # < do we want the ^ + and \n$
            # seem to do \n before turning off TerminalColors, just remove it
            line = re.sub("\n","",line)
            out = {"std":ch,"s":line.strip(),"time":time.time()}
            diag(f"[{i}] std{ch}: "+out["s"])
            job["output"].append(out)
    
    readaline('out',process.stdout)
    readaline('err',process.stderr)

    # stdin
    def inN(N):
        if not "wrote_stdin" in job:
            job["wrote_stdin"] = 0
        
        for l in N:
            job["wrote_stdin"] = job["wrote_stdin"] + 1
            process.stdin.write(l + "\n")
            print("Wrote to "+job["t"]+":     '"+l+"'")
        # flush reduces latency and the need to \n$, but the receiver might be waiting for one?
        process.stdin.flush()
    job["give_stdin"] = inN
    # < multiple sudos in a command should work
    #   password fed only the first time
    if 0 and "sudostdin" and 'sudo ' in command:
        host = job["on_host"]
        if not host:
            raise ValueError("only know vms")
        file_path = Path("secrets/sudo-on-"+host)
        password = file_path.read_text()
        if not password:
            raise ValueError("dont know "+file_path)
        # 
        time.sleep(0.4)
        inN([password])

    job["exit_code"] = None
    
    def check1s():
        exit_code = process.poll()
        if exit_code is not None:
            diag(f"[{i}] trouble! code:"+str(exit_code))
            job["exit_code"] = exit_code
            diag(f"[{i}] finito")
            job["check1s"] = lambda: 1
    job["check1s"] = check1s





# run commands without blocking the UI
def all_systems_go_thread():
    all_systems_go()
all_systems_go_thread = threading.Thread(target=all_systems_go_thread)
all_systems_go_thread.start()

# Run the UI
zap_ui.begin(i_job,job_i,systems)



dd(systems)