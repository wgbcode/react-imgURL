cd dist
git init
git add .
git commit -m "deploy"
git remote add origin git@github.com:wgbcode/react-imgURL-webpage.git
git push origin master
cd -