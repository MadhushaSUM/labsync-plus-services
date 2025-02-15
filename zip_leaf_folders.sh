#!/bin/bash
# This script finds all leaf directories (directories with no subdirectories)
# starting from the current directory and creates a zip archive in each leaf.
# The zip file is named after the leaf folder (e.g. myfolder.zip) and contains
# all files and subdirectories (including hidden ones) inside that leaf folder.

# Use find to iterate over every directory (handling names with spaces/newlines)
find . -type d -print0 | while IFS= read -r -d '' dir; do
    # Check if this directory has any subdirectories.
    if [ -z "$(find "$dir" -mindepth 1 -type d -print -quit)" ]; then
        echo "Processing leaf directory: $dir"
        # Move into the leaf directory
        pushd "$dir" > /dev/null
        
        # Set the zip file name to be the directory's basename with a .zip extension
        zipName="$(basename "$dir").zip"
        # Remove any existing zip file of the same name to avoid including it in the archive
        rm -f "$zipName"
        
        # Create a zip archive of the entire directory content,
        # excluding the zip file itself.
        zip -r "$zipName" . -x "./$zipName"
        
        # Return to the previous directory
        popd > /dev/null
    fi
done
