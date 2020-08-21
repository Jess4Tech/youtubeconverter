@ECHO OFF

del /F/Q/S dist > NUL 
del /F/Q/S public > NUL
SET ProjectRoot=%cd%
IF [%1] EQU [p] (
    echo Building Production
    cd src\Python\win
    ..\venv\Scripts\pyinstaller.exe --log-level=WARN --noconfirm --clean --name dl --onefile --add-binary="..\ffmpeg.exe;ffmpeg.exe" --add-binary="..\youtube-dl.exe;youtube-dl.exe" .\YoutubeDownloader-Utilities.py
    copy dist\dl.exe ..\..\..\public > NUL
    cd "%ProjectRoot%"
    npx webpack -p
    npx minify .\src\JS\electron\electron.js -d .\public
    npx electron-builder -c.extraMetadata.main=public/electron.js -w nsis --x64
) ELSE (
    echo Building Debug
    cd src\Python\win
    ..\venv\Scripts\pyinstaller.exe --log-level=WARN --noconfirm --clean --name dl --onefile --add-binary="..\ffmpeg.exe;ffmpeg.exe" --add-binary="..\youtube-dl.exe;youtube-dl.exe" .\YoutubeDownloader-Utilities.py
    copy dist\dl.exe ..\..\..\public > NUL
    cd "%ProjectRoot%"
    npx webpack
    copy .\src\JS\electron\electron.js public
    npx electron-builder -c.extraMetadata.main=public/electron.js -w nsis --x64
)