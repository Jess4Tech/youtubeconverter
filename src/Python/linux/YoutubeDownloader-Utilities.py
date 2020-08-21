from sys import argv
import subprocess    

def download(url, playlist, output, format, start, end):
    if output == "M4A" or output == "FLAC" or output == "MP3" or output == "WAV" or output == "WMA" or output == "AAC" or output == "OGG":
        cmd = ".\\youtube-dl.exe --ignore-errors --format bestaudio --extract-audio --audio-format {} --audio-quality 160k --output \"{}\"".format(output.lower(), format)
        if playlist:
            cmd+=" --yes-playlist \"{}\"".format(url)
        else:
            cmd+=" \"{}\"".format(url)
        if int(end) != 0 and int(start) != 0:
            cmd+=" --playlist-start {}".format(start)
            cmd+=" --playlist-end {}".format(end)
        print(cmd)
        subprocess.call(cmd)
    if output == "AVCHD" or output == "AVI" or output == "FLV" or output == "MKV" or output == "MOV" or output == "MP4" or output == "WEBM" or output == "WMV":
        cmd = ".\\youtube-dl.exe -i -f {}".format(output.lower())
        if playlist == "true" or playlist == "True" or playlist == True:
            cmd+= " --yes-playlist \"{}\"".format(url)
        else:
            cmd+="\"{}\"".format(url)
        if int(end) != 0 and int(start) != 0:
            cmd+=" --playlist-start {}".format(start)
            cmd+=" --playlist-end {}".format(end)
        print(cmd)
        subprocess.call(cmd)

if len(argv) < 7:
    print("\"Url, isPlaylist, Output, TitleFormat, Start, End\" is the order of the arguments")
else: # Url, isPlaylist, Output, TitleFormat, Start, End
    print(len(argv))
    download(argv[1], argv[2], argv[3], argv[4], argv[5], argv[6])