#!/usr/bin/env bash -x

# This script is usually run from within the .github/workflows directory and so
# all paths are relative. The ROOTDIR variable can be set via command line.
if [ -z "$1" ]; then
    ROOTDIR="../../"
else
    ROOTDIR="$1"
fi

SRCDIR_VIDEOS="${ROOTDIR}dev/_static/images"
SRCDIR_IMAGES="${ROOTDIR}dev/_images"
echo "Finding duplicate images/videos from ${ROOTDIR}"

# Find all folders with version numbers of the type m.m.m
mapfile -t folders < <(find "${ROOTDIR}" -maxdepth 1 -type d -name "[0-9]*.[0-9]*.[0-9]*" -exec basename {} \;)

echo "Folders with version numbers: ${folders[@]}"

for folder in "${folders[@]}"; do
    DUPDIR_VIDEOS="${ROOTDIR}${folder}/_static/images"
    DUPDIR_IMAGES="${ROOTDIR}${folder}/_images"
    echo "In ${folder}..."
    # Store the hashes in arrays of two strings: the file path and the hash
    mapfile -t dev_videos < <(find "${SRCDIR_VIDEOS}" -type f -name "*.webm" -exec sha256sum {} \; | awk '{print $2 " " $1}')
    mapfile -t version_videos < <(find "${DUPDIR_VIDEOS}" -type f -name "*.webm" -exec sha256sum {} \; | awk '{print $2 " " $1}')
    mapfile -t dev_images < <(find "${SRCDIR_IMAGES}" -type f -name "*.png" -exec sha256sum {} \; | awk '{print $2 " " $1}')
    mapfile -t version_images < <(find "${DUPDIR_IMAGES}" -type f -name "*.png" -exec sha256sum {} \; | awk '{print $2 " " $1}')

    # Now, compare the two arrays to find duplicate videos
    for item in "${dev_videos[@]}"; do
        split=($item)
        for item_v in "${version_videos[@]}"; do
            split_v=($item_v)
            if [[ "${split[1]}" == "${split_v[1]}" ]]; then
                echo "Duplicate video found: ${split[0]}"
                # Grab only filename for video in dev
                FILE=$(basename "${split[0]}")
                # Replace video in version with a symbolic link to the video in dev
                ln -sf "../${SRCDIR_VIDEOS}/${FILE}" "${DUPDIR_VIDEOS}/${FILE}"
                # If this is a duplicate webm, there is also a duplicate mp4 resulting from the automatic conversion in another step
                ln -sf "../${SRCDIR_VIDEOS}/${FILE%.*}.mp4" "${DUPDIR_VIDEOS}/${FILE%.*}.mp4"
            fi
        done
    done
    # Compare the two arrays to find duplicate images
    for item in "${dev_images[@]}"; do
        split=($item)
        for item_v in "${version_images[@]}"; do
            split_v=($item_v)
            if [[ "${split[1]}" == "${split_v[1]}" ]]; then
                echo "Duplicate image found: ${split[0]}"
                # Grab only filename for image in dev
                FILE=$(basename "${split[0]}")
                # Replace image in version with a symbolic link to the image in dev
                ln -sf "../${SRCDIR_IMAGES}/${FILE}" "${DUPDIR_IMAGES}/${FILE}"
            fi
        done
    done
done
