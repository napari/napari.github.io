#!/usr/bin/env bash -x

# This script is usually run from within the .github/workflows directory and so
# all paths are relative. The ROOTDIR variable can be set via command line.
if [ -z "$1" ]; then
    ROOTDIR="../../"
else
    ROOTDIR="$1"
fi

SRCDIR="${ROOTDIR}dev/_static/images"
echo "Finding duplicate videos from ${ROOTDIR}"

# Find all folders with version numbers of the type m.m.m
mapfile -t folders < <(find "${ROOTDIR}" -maxdepth 1 -type d -name "[0-9]*.[0-9]*.[0-9]*" -exec basename {} \;)

echo "Folders with version numbers: ${folders[@]}"

for folder in "${folders[@]}"; do
    DUPDIR="${ROOTDIR}${folder}/_static/images"
    echo "In ${DUPDIR}..."
    # Store the hashes in arrays of two strings: the file path and the hash
    mapfile -t dev < <(find "${SRCDIR}" -type f -name "*.webm" -exec sha256sum {} \; | awk '{print $2 " " $1}')
    mapfile -t version < <(find "${DUPDIR}" -type f -name "*.webm" -exec sha256sum {} \; | awk '{print $2 " " $1}')

    # Now, compare the two arrays to find duplicate videos
    for item in "${dev[@]}"; do
        split=($item)
        for item_v in "${version[@]}"; do
            split_v=($item_v)
            if [[ "${split[1]}" == "${split_v[1]}" ]]; then
                echo "Duplicate video found: ${split[0]}"
                # Grab only filename for video in dev
                FILE=$(basename "${split[0]}")
                # Replace video in version with a symbolic link to the video in dev
                ln -sf "../${SRCDIR}/${FILE}" "${DUPDIR}/${FILE}"
                # If this is a duplicate webm, there is also a duplicate mp4 resulting from the automatic conversion in another step
                ln -sf "../${SRCDIR}/${FILE%.*}.mp4" "${DUPDIR}/${FILE%.*}.mp4"
            fi
        done
    done
done
