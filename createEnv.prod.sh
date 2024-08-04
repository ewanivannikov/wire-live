#!/bin/sh

# Скрипт упадет, если какая-либо операция завершалась неудачно
set -e

cd dist

echo "window.__ENV__={RELEASE_STAGE: 'production'};" >> ./env.js
