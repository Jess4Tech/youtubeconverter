rm -rf dist
rm -rf public
mkdir public
if ["$1" == "p"]; then
    npx webpack -p
    npx minify ./src/JS/electron/electron.js -d ./public
else
    npx webpack
fi

npx electron-builder -c.extraMetadata.main=public/electron.js -l snap --x64