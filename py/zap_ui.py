
import curses
import time

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

            view_job(stdscr,job)

        # Redraw the interface
        view_systems(stdscr, systems, selected_row)

        # Refresh the screen
        stdscr.refresh()
        time.sleep(0.1)

# view everything
#  list of jobs and their state
# < inc systems
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
            if "wrote_stdin" in job:
                much = job["wrote_stdin"]
                stdscr.addstr(i, 48, "in:"+str(much))

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
    outs = job["output"]

    stdscr.clear()
    stdscr.addstr(0, 0, "job ["+str(job["i"])+"] "+job["t"])
    outi = 0
    for out in outs:
        # < background colour stderrs?
        ind = '   ' if out["std"] == 'out' else '!! '
        try:
            stdscr.addstr(2+outi, 0, ind+out["s"])
        except curses.error:
            pass
        outi += 1
        
    # Refresh the screen
    stdscr.refresh()
    

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
