# letz

[stylehouse](https://github.com/stylehouse/letz) via modern javascript tooling (Svelte)

## install

Clone this, then:

```bash
sudo apt install lsyncd virt-manager sshfs openssh-server
git submodule init
git submodule update
# < the "gox" qemu vm creation (a debian)
#   put ssh key in
#   sudo apt install lsyncd podman sshfs openssh-server
py/zap.py init
```
Reconfigure `zap.py` if you didn't have a [vm host named gox](https://github.com/stylehouse/stylehouse/blob/151fe09b32e4562e20a67ac2766a3259a794b4d6/G/Lafr/Inside#L1168). Anything could be needed here, not sure. `init` is untested.

## run
run:
```bash
py/zap.py
```

# description

domes in, domes out

