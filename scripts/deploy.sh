#!/usr/bin/env bash
set -ex
# https://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html

# git must be clean to deploy
if [ -z "$(git status --porcelain)" ]; then 
  # Working directory clean
  echo Working directory clean
else 
  # Uncommitted changes
  echo Uncommitted changes
  exit 1
fi

rm -rf deploy
mkdir deploy
cd deploy
git clone https://github.com/sangiovannilipioni/sangiovannilipioni.github.io.git
cd sangiovannilipioni.github.io
cp ../../.env .
yarn install
yarn generate
cd dist
git init
git add -A
git commit -m 'chore: deploy'
git push -f https://github.com/sangiovannilipioni/sangiovannilipioni.github.io.git master:gh-pages
cd ../..
