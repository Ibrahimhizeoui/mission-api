#!/usr/bin/env bash

set -e

echo ">> Checking linting"
npm run lint

echo ">> Checking that docs can be generated"
npm test