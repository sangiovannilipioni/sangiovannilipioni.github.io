#!/bin/bash

if [ ! -f $1 ] || [ $# -ne 1 ]
then
    echo Queries the github graphql API
    echo "Usage:"
    echo
    echo "$0 somefile.gql"
fi

QUERY=$(jq -n \
        --arg q "$(cat $1 | tr -d '\n')" \
        '{ query: $q }')

curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: bearer $GITHUB_TOKEN" \
  --data "$QUERY" \
  https://api.github.com/graphql 
