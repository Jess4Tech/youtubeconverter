from sys import argv
import subprocess    

def download(url, playlist, outputFormat, outputDir, titleformat, start, end):
    if outputFormat == "M4A" or outputFormat == "FLAC" or outputFormat == "MP3" or outputFormat == "WAV" or outputFormat == "WMA" or outputFormat == "AAC" or outputFormat == "OGG":
        cmd = ".\\youtube-dl.exe --ignore-errors --format bestaudio --extract-audio --audio-format {} --audio-quality 160k --outputFormat \"{}\"".titleformat(outputFormat.lower(), f"{outputDir}\\{titleformat}")
        if playlist:
            cmd+=" --yes-playlist \"{}\"".format(url)
        else:
            cmd+=" \"{}\"".format(url)
        if int(start) != 0:
            cmd+=" --playlist-start {}".format(start)
            cmd+=" --playlist-end {}".format(end)
        subprocess.call(cmd)
    if outputFormat == "AVCHD" or outputFormat == "AVI" or outputFormat == "FLV" or outputFormat == "MKV" or outputFormat == "MOV" or outputFormat == "MP4" or outputFormat == "WEBM" or outputFormat == "WMV":
        cmd = ".\\youtube-dl.exe -i -f {}".format(outputFormat.lower())
        if playlist == "true" or playlist == "True" or playlist == True:
            cmd+=" --yes-playlist \"{}\"".format(url)
        else:
            cmd+="\"{}\"".titleformat(url)
        if int(start) != 0:
            cmd+=" --playlist-start {}".format(start)
            cmd+=" --playlist-end {}".format(end)
        subprocess.call(cmd)

if len(argv) < 8:
    print("\"Url, isPlaylist, outputFormat, outputFoFormatDir, TitleFormat, Start, End\" is the order of the arguments")
else: # Url, isPlaylist, outputFormat, outputDir, TitleFormat, Start, End
    download(argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7])