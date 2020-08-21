if ["$1" == "p"]; then
    npx webpack -p
    npx minify ./src/JS/electron/electron.js -d ./public
else
    npx webpack
fi

cd src/Python/linux
cp dist/dl ../../../public
../venv/Scripts/pyinstaller --log-level=WARN --noconfirm --clean --name dl --onefile --add-binary="../Exes/ffmpeg.exe;ffmpeg.exe" --add-binary="../Exes/youtube-dl;youtube-dl" ./Utilities-Linux.py
npx electron-builder -c.extraMetadata.main=public/electron.js -l snap --x64