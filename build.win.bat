SET ProjectRoot=%cd%
IF [%1] EQU [p] (
    echo Building Production
    cd src\Python\win
    ..\venv\Scripts\pyinstaller.exe --log-level=WARN --noconfirm --clean --name dl --onefile --add-binary="..\Exes\ffmpeg.exe;ffmpeg.exe" --add-binary="..\Exes\youtube-dl.exe;youtube-dl.exe" .\Utilities-Win.py
    copy dist\dl.exe ..\..\..\public
    cd "%ProjectRoot%"
    xcopy /S/Y/I .\src\JS\ui\Images .\public\images
    npx webpack -p
    npx minify .\src\JS\electron\electron.js -d .\public
    npx electron-builder -c.extraMetadata.main=public/electron.js -w nsis --x64
) ELSE (
    echo Building Debug
    cd src\Python\win
    ..\venv\Scripts\pyinstaller.exe --log-level=WARN --noconfirm --clean --name dl --onefile --add-binary="..\Exes\ffmpeg.exe;ffmpeg.exe" --add-binary="..\Exes\youtube-dl.exe;youtube-dl.exe" .\Utilities-Win.py
    copy dist\dl.exe ..\..\..\public
    cd "%ProjectRoot%"
    xcopy /S/Y/I .\src\JS\ui\Images .\public\images
    npx webpack
    copy .\src\JS\electron\electron.js public
    npx electron-builder -c.extraMetadata.main=public/electron.js -w nsis --x64
)