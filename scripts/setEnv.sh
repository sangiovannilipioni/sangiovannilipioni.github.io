#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

function red {
    printf "${RED}$@${NC}\n"
}

function green {
    printf "${GREEN}$@${NC}\n"
}

function yellow {
    printf "${YELLOW}$@${NC}\n"
}

source .env
export NUXT_ENV_CURRENT_GIT_SHA=`git rev-parse HEAD`
export NUXT_ENV_GIT_DIRTY=`git diff --quiet || echo dirty`
export NUXT_ENV_GENERATION_TIMESTAMP=`date +'%s'`
export NUXT_ENV_API_GIT_SHA=`source scripts/ghgql.sh graphql/lastSglApiGitSha.gql | jq --raw-output '. | .data.repository.defaultBranchRef.target.history.nodes[0].oid'`

echo   NUXT_ENV_CURRENT_GIT_SHA $(green $NUXT_ENV_CURRENT_GIT_SHA)
echo   NUXT_ENV_GIT_DIRTY $(red $NUXT_ENV_GIT_DIRTY)
echo   NUXT_ENV_GENERATION_TIMESTAMP $(green $NUXT_ENV_GENERATION_TIMESTAMP)
echo   NUXT_ENV_API_GIT_SHA $(green $NUXT_ENV_API_GIT_SHA)
