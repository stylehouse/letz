# moodbar

makes pictures of sound. glowy intensities, different colours somehow.

# compile moodbar

from https://github.com/exaile/moodbar

```
apt install libgstreamer-plugins-base1.0-dev libfftw3-dev meson pkgconf
meson --buildtype=release build/
cd build/
ninja
```

See `py/requirements.txt` for runtime deps.

# saas moodbar

Takes POST opusdata and returns webp data.

A client:
```
curl -X POST -F "opusdata=@loom.opus" http://localhost:8000/moodbar --output bar.webp
```

A javascript client, returning what can be used as a `src`:
```
async function get_moodbar_webpdata_from_opusdata(arrayBuffer) {
    const formData = new FormData();
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
    formData.append('opusdata', blob);

    // < configure this somewhere!?
    const response = await fetch('http://localhost:8000/moodbar', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        console.error('Bad response:', response);
        throw new Error(`Error sending data: ${response.statusText}`);
    }
    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob);
}
```


