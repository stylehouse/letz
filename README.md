# letz

[stylehouse](https://github.com/stylehouse/letz) via modern javascript tooling (Svelte)

## install

Clone this. Probably to ~/src/letz.

The following can be opted out of mostly by hacking the job list in zap.py:
 - sudo apt install podman
   - opt out: use Docker, rename Containerfile
 - Point the hostname `sa` to where to ssh to run containers, or to localhost in ```/etc/hosts```
   - opt out: delete the ssh step

```bash
git submodule init
git submodule update
# < the "gox" qemu vm creation (a debian)
#   put ssh key in
#   sudo apt install lsyncd podman sshfs openssh-server
py/zap.py init
```
Having read a bit of `zap.py` first.

You probably don't need a vm with containers inside, [things get very job-security over there](https://github.com/stylehouse/stylehouse/blob/151fe09b32e4562e20a67ac2766a3259a794b4d6/G/Lafr/Inside#L1168)

## run
run:
```bash
py/zap.py
```

# description

computer parts.

# status

research-grade, difficult to say
