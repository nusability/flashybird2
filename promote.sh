#!/bin/sh
# Promote the beta to the release: beta.html becomes index.html, with the
# handful of lines that differ between the two put back the release way.
#
#   ./promote.sh Z0.18.0        # the version the release goes out as
#
# Everything else — the game itself — is copied across untouched, so the file
# you tested on your phone is the file that ships.
set -e
[ -n "$1" ] || { echo "usage: ./promote.sh <version>   e.g. ./promote.sh Z0.18.0" >&2; exit 1; }
V="$1"
cd "$(dirname "$0")"
sed -e "s|const VERSION='[^']*';|const VERSION='$V zones';|" \
    -e 's|<title>FLASHY BIRD ZONES — beta</title>|<title>FLASHY BIRD ZONES</title>|' \
    -e 's|content="Flashy Beta"|content="Flashy Zones"|' \
    -e 's|href="icon-beta-180.png"|href="icon-180.png"|' \
    -e 's|href="manifest-beta.webmanifest"|href="manifest.webmanifest"|' \
    beta.html > index.html
# and the beta carries on from there, one version ahead of what just shipped
sed -i "s|const VERSION='[^']*';|const VERSION='$V beta';|" beta.html
grep -n "const VERSION=" index.html beta.html
echo "bump the service worker's CACHE generation if any cached file changed."
