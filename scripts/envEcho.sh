#!/bin/bash

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

echo NUXT_ENV_CURRENT_GIT_SHA $(green $NUXT_ENV_CURRENT_GIT_SHA)
echo NUXT_ENV_GIT_DIRTY $(red $NUXT_ENV_GIT_DIRTY)
echo NUXT_ENV_GENERATION_TIMESTAMP $(green $NUXT_ENV_GENERATION_TIMESTAMP)
echo NUXT_ENV_API_GIT_SHA $(green $NUXT_ENV_API_GIT_SHA)
