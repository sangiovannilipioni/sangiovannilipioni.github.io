# /bin/bash
set -ex
# https://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html
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
