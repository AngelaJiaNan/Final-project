#!/bin/sh

set -e

# shellcheck source=/dev/null
test -f .env && . .env

psql "postgres://dev:dev@localhost/runwithme" -f database/schema.sql -f database/data.sql
