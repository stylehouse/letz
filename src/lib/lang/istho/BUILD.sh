#!/bin/sh
# I only have node in the container!
node ../../../../node_modules/.bin/lezer-generator --typeScript --output parser.ts istho.grammar
echo "...now go and copy the output back to letz.git: rsync -a gox:/home/s/src/letz/src/lib/lang/istho src/lib/lang/"
