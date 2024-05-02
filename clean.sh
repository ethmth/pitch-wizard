#!/bin/bash

if ! [ -f "server.py" ]; then
    echo "Make sure you're in the root directory of the repo"
    exit 1
fi

rm -rf __pycache__
rm -rf deploy
rm -rf logs
rm .env
rm .env.example
rm .gitignore
rm docker-compose.yml
rm README.md
rm TODO.txt

rm -- "$0"