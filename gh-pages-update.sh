#!/bin/sh

rm -rf .gh-pages-tmp lib  &&
mkdir .gh-pages-tmp &&
node node_modules/webpack/bin/webpack.js --config ./webpack.docs.config.js &&
cp -R lib/* .gh-pages-tmp &&
cp -R src/server/demo/index.html .gh-pages-tmp &&
cp -R src/server/demo/static .gh-pages-tmp &&
cp -R src/server/demo/api .gh-pages-tmp &&

git branch -d gh-pages &&
git checkout -b gh-pages &&
git ls-files | grep -v -e "\(^\.gitignore$\|^\.gitattributes$\|^\.gh-pages-tmp$\)" | xargs rm -rf &&
rm -rf ./api ./static &&
mv .gh-pages-tmp/* . &&
rm -rf .gh-pages-tmp &&
git add . &&
git commit -m "Update gh-pages" &&
git push --force origin gh-pages &&
git checkout master
