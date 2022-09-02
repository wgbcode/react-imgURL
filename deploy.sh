set -e
yarn build
cd build
git init
git add -A
git commit -m "deploy"
git remote add origin git@github.com:wgbcode/react-imgURL.git
git push -uf origin master:gh-pages 
cd -