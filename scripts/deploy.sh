#!/bin/bash
set -e
# https://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html

# git must be clean to deploy
if [ -z "$(git status --porcelain)" ]; then 
  # Working directory clean
  echo Working directory clean
else 
  # Uncommitted Changes
  echo ===\> Uncommitted Changes, won\'t deploy \<===
  exit 1
fi

rm -rf deploy
mkdir deploy
cd deploy
pwd
git clone https://github.com/sangiovannilipioni/sangiovannilipioni.github.io.git
cd sangiovannilipioni.github.io
if test -f "../../.env"; then
  cp ../../.env .
fi
yarn install
yarn generate
cd dist
pwd
git init
git add -A
git commit -m "generated on `date +'%Y-%m-%d %H:%M:%S'`"
git push -f https://github.com/sangiovannilipioni/sangiovannilipioni.github.io.git master:gh-pages
cd ../..
