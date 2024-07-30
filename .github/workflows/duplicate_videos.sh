#!/usr/bin/env bash -x

# This script is run from within the .github/workflows directory and so
# all paths are relative.

echo "Finding duplicate videos..."

SRCDIR="../../dev/_static/images"

# Find all folders with version numbers of the type m.m.m
mapfile -t folders < <(find ../../ -maxdepth 1 -type d -name "[0-9]*.[0-9]*.[0-9]*" -exec basename {} \;)

echo "Folders with version numbers: ${folders[@]}"

for folder in "${folders[@]}"; do
    DUPDIR="../../${folder}/_static/images"
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
