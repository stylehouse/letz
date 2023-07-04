# letz python!

a couple of components are in python, including the [cluster supervisor thingy](#zap.py)



## serve.py

**media server**

does thumbnails etc, see /sshfs/ in [zap.py](#zap.py)

runs in the container specified in this directory, named pyt->py as we run it in [zap.py](#zap.py)

should be a safe place to use lots of random software.



## zap.py

**cluster supervisor**

runs the container mentioned above along with everything else.

to make a dev environment.

runs commands that might error, has ncurses interface.

various podman-build are implied.

should be secure, only uses core python.
