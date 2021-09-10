#!/bin/bash

if test -f ".env"; then
    source .env
fi
export NUXT_ENV_CURRENT_GIT_SHA=`git rev-parse HEAD`
export NUXT_ENV_GIT_DIRTY=`git diff --quiet || echo dirty`
export NUXT_ENV_GENERATION_TIMESTAMP=`date +'%s'`
export NUXT_ENV_API_GIT_SHA=`. ./scripts/ghgql.sh ./graphql/lastSglApiGitSha.gql | jq --raw-output '. | .data.repository.defaultBranchRef.target.history.nodes[0].oid'`
