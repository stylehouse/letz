
import curses
import time
import pprint
import textwrap
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
            if not 'output' in job:
                stdscr.clear()
                stdscr.addstr(0, 0, "job!output")
                stdscr.refresh()
                time.sleep(0.5)
                curses.endwin()
                dd([job])
                exit(0)
            else:
                view_job(stdscr,job)

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
            # Determine the formatting of the command based on selection
            if i == selected_row:
                stdscr.attron(curses.color_pair(1))
            
            # title
            stdscr.addstr(i, 0, "["+str(job["i"])+"] "+dotdotdotat(job["t"], cols - 20))

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
            if i == selected_row:
                stdscr.attroff(curses.color_pair(1))
    
    # Refresh the screen
    stdscr.refresh()

# viewing output of a job
def view_job(stdscr,job):

    # Wait for key press to continue, with a non-blocking getch()
    oft = freq(2.3)
    while True:
        # draw new output  every 0.5s
        if oft():
            draw_job(stdscr,job)
        # respond to enter to leave this loop
        key = stdscr.getch()
        if isenter(key):
            break
        time.sleep(0.03)

def draw_job(stdscr,job):
    rows, cols = stdscr.getmaxyx()
    outs = job["output"]

    stdscr.clear()
    stdscr.addstr(0, 0, "job ["+str(job["i"])+"] "+dotdotdotat(job["t"],cols-20))
    # then a blank line:
    outi = 2
    draw_output(stdscr,outs,outi)
    # Refresh the screen
    stdscr.refresh()

def draw_output(stdscr,outs,outi):
    rows, cols = stdscr.getmaxyx()

    lines = []
    for out in outs:
        # < background colour stderrs?
        ind = '   ' if out["std"] == 'out' else '!! '
        try:
            # Wrap the output text based on the available columns
            wrapped_text = textwrap.wrap(out["s"], cols - len(ind))
            # Add the indented and wrapped text to the screen
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
        stdscr.addstr(outi + line_num, 0, ind + line)


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
