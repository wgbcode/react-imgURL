yarn build
cd build
git init
git add -A
git commit -m "deploy"
git push -f git@github.com:wgbcode/react-imgURL-webpage.git
cd -