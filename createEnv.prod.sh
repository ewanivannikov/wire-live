#!/bin/sh

# Скрипт упадет, если какая-либо операция завершалась неудачно
set -e

cd dist/static

echo "window.__ENV__={RELEASE_STAGE: 'production'};" >> ./env.js
