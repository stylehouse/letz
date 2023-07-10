
import curses
import time
import pprint
import textwrap
import culour
import re
import subprocess
import threading
import os
import tempfile
import signal
def dd(data,depth=7):
    pp = pprint.PrettyPrinter(depth=depth)
    pp.pprint(data)


def begin(i_job,job_i,systems):
    curses.wrapper(main,i_job,job_i,systems)

def main(stdscr,i_job,job_i,systems):
    # Initialize curses settings
    curses.curs_set(0)
    curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_WHITE)
    # for non-blocking stdscr.getch() (loop must sleep)
    stdscr.nodelay(1)

    # Initially selected row
    selected_row = 0

    # Draw the interface
    view_systems(stdscr, systems, selected_row)

    # Event loop
    while True:
        key = stdscr.getch()

        # Handle key events
        if key == curses.KEY_UP and selected_row > 0:
            selected_row -= 1
        elif key == curses.KEY_DOWN and selected_row < job_i - 1:
            selected_row += 1
        elif isenter(key):
            # look into selected command
            job = i_job[selected_row]
            stdscr = less_job(stdscr, job)
            # < see ansiicolours
            #view_job(stdscr,job)

        # Redraw the interface
        view_systems(stdscr, systems, selected_row)

        # Refresh the screen
        stdscr.refresh()
        time.sleep(0.1)

# view everything
#  list of jobs and their state
# < inc systems
def dotdotdotat(s,n):
    wrapped_text = textwrap.wrap(s,n)
    if len(wrapped_text) > 1:
        wrapped_text[0] += '...'
    return wrapped_text[0]
    





def view_systems(stdscr, systems, selected_row):
    # Clear the screen
    stdscr.clear()

    # Define the dimensions of the interface
    rows, cols = stdscr.getmaxyx()

    # Draw the list of jobs
    for system in systems:
        jobs = system['jobs']
        for job in jobs:
            i = job["i"]
            # hilight selection
            if i == selected_row:
                stdscr.attron(curses.color_pair(1))
            
            draw_job_label(stdscr,job,i)
            if i == selected_row:
                # turn off again
                stdscr.attroff(curses.color_pair(1))
    
    stdscr.addstr(rows-1, 0, "sel:"+str(selected_row))
    # Refresh the screen
    stdscr.refresh()

def draw_job_label(stdscr,job,i):
    rows, cols = stdscr.getmaxyx()

    # title
    stdscr.addstr(i, 0, "["+str(job["i"])+"] "+dotdotdotat(job["t"], cols - 23))

    col_status = cols - 15
    col_in = cols - 10
    # status
    if "check1s" in job:
        check = job["check1s"]
        check()
        if job["exit_code"] is not None:
            if not job["exit_code"]:
                # 0 - good
                stdscr.addstr(i, col_status, "done")
            else:
                # 127 etc - bad
                stdscr.addstr(i, col_status, "exit("+str(job["exit_code"])+")")
    if "wrote_stdin" in job:
        much = job["wrote_stdin"]
        stdscr.addstr(i, col_in, "in:"+str(much))
    if not 'output' in job:
        # won't have stdin before starting command
        stdscr.addstr(i, col_in, "!yet?")

terminatables = []
# ignore Ctrl+C intended for the `less` we use for job output
#  seems to cause all our jobs to exit(-2)
# kill it with Ctrl+| (pipe)
def sigint_handler(signal, frame):
    # Ignore the Ctrl+C signal here to prevent it from terminating the program
    for ism in terminatables:
        ism()
    pass

def less_job(stdscr,job):
    # End curses.
    curses.endwin()
    tmp = tempfile.NamedTemporaryFile()
    event = threading.Event()
    # fork to write job.output stream for less to read
    index = 0  # Keep track of the last processed index in job.output
    def write_thread(tmp,event):
        index = 0  # Keep track of the last processed index in job.output
        while not event.is_set():
            if len(job["output"]) > index:
                for out in job["output"][index:]:
                    ind = '   ' if out["std"] == 'out' else '!! '
                    line = ind + out["s"] + "\n"
                    tmp.write(line.encode("utf-8"))
                tmp.flush()  # Flush the buffer to ensure data is written to the file
                index = len(job["output"])
            time.sleep(0.1)  # Sleep for a short duration before checking for new items
    write_thread = threading.Thread(target=write_thread, args=[tmp,event])
    write_thread.start()



    # Set the custom signal handler for SIGINT (Ctrl+C)
    signal.signal(signal.SIGINT, sigint_handler)
    
    # Run `less` with the job output.
    #os.system("less -R +F {}".format(tmp.name))
    less_process = subprocess.Popen(["less", "-R", "+F", tmp.name])
    terminator = lambda: less_process.terminate()
    terminatables.append(terminator)
    less_process.communicate()  # Wait for the less process to complete
    terminatables.remove(terminator)


    # Signal the thread to finish.
    event.set()
    
    time.sleep(0.3)

    # Initialize curses again.
    stdscr = curses.initscr()
    # Return stdscr back to the main loop (will view_systems())
    return stdscr

if 'ansicolours' in 'curses':
    # viewing output of a job
    def view_job(stdscr,job):
        # Wait for key press to continue, with a non-blocking getch()
        oft = freq(2.3)
        while True:
            # draw new output  every 0.5s
            if oft():
                stdscr.clear()
                draw_job(stdscr,job)
                stdscr.refresh()
            # respond to enter to leave this loop
            key = stdscr.getch()
            if isenter(key):
                break
            time.sleep(0.03)

    def draw_job(stdscr,job):
        rows, cols = stdscr.getmaxyx()
        outs = job["output"]

        outi = 0
        draw_job_label(stdscr,job,outi)
        # then a blank line:
        outi = 2
        draw_output(stdscr,outs,outi)

    def draw_output(stdscr,outs,outi):
        rows, cols = stdscr.getmaxyx()

        lines = []
        for out in outs:
            # < background colour stderrs?
            ind = '   ' if out["std"] == 'out' else '!! '
            try:
                # Wrap the output text based on the available columns
                wrapped_text = textwrap.wrap(out["s"], cols - len(ind))
                for line_num, line in enumerate(wrapped_text):
                    lines.append(ind+line)
            except curses.error:
                pass
        
        space = rows - outi
        if len(lines) > space:
            size = space-1
            hiding = len(lines) - size
            lines = ["... x"+str(hiding)] + lines[-size:]
        
        

        for line_num, line in enumerate(lines):
            #culour.addstr(stdscr, outi + line_num, 0, line)
            #line = subprocess.check_output("xxd -", input=line, text=True, shell=True)
            
            stdscr.addstr(outi + line_num, 0, line)





def isenter(key):
    return key == curses.KEY_ENTER or key == ord('\n')

# for a loop full of if branches going off at different intervals
def freq(hz):
    hence = 0
    period = 1/hz
    def when():
        nonlocal hence
        if time.time() - hence > period:
            hence = time.time()
            return 1
    return when
