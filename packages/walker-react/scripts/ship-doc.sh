#!/bin/bash

# Script to move typedoc.json to ../../docs/sdk-artifacts/walker-react

set -e  # Exit on error

# Define source and destination
SOURCE_FILE="typedoc.json"
DEST_DIR="../../docs/sdk-artifacts/walker-react"

# Check if source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "Error: $SOURCE_FILE not found in current directory"
    exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Move the file
mv "$SOURCE_FILE" "$DEST_DIR/"

echo "Successfully moved $SOURCE_FILE to $DEST_DIR/"
