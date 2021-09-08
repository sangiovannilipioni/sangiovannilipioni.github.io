#!/usr/bin/env bash
export NUXT_ENV_CURRENT_GIT_SHA=`git rev-parse HEAD`
export NUXT_ENV_GIT_DIRTY=`git diff --quiet || echo dirty`
export NUXT_ENV_GENERATION_TIMESTAMP=`date +'%s'`
export NUXT_ENV_API_GIT_SHA=`source scripts/ghgql.sh graphql/lastSglApiGitSha.gql | jq -r '. | .data.repository.defaultBranchRef.target.history.nodes[0].oid'`
echo NUXT_ENV_CURRENT_GIT_SHA $NUXT_ENV_CURRENT_GIT_SHA
echo NUXT_ENV_GIT_DIRTY $NUXT_ENV_GIT_DIRTY
echo NUXT_ENV_GENERATION_TIMESTAMP $NUXT_ENV_GENERATION_TIMESTAMP
echo NUXT_ENV_API_GIT_SHA $NUXT_ENV_API_GIT_SHA
