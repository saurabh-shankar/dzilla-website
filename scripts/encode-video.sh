#!/usr/bin/env bash
# Encode a source video for the site: web MP4 (H.264/AAC, faststart) + JPEG poster.
#
#   scripts/encode-video.sh <source.mp4> <name>
#
# Writes public/videos/<name>.mp4 and public/videos/posters/<name>.jpg.
# Landscape → up to 1080p, bitrate-capped so even long films stay under ~90MB
# (GitHub's file limit is 100MB). Vertical → 720x1280. Needs ffmpeg + python3.
set -euo pipefail
in="$1"; name="$2"
out="$(cd "$(dirname "$0")/.." && pwd)/public/videos"
mkdir -p "$out/posters"

read -r w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$in" | tr x ' ')
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
hasaudio=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$in" | head -1)

if [ "$w" -ge "$h" ]; then
  vf="scale='min(1920,iw)':-2"
  cap=$(python3 -c "d=$dur; print(int(min(3000, 88*8*1000/d - 110)))")   # kbit/s
  crf=26; pw=1280
else
  vf="scale=720:-2"
  cap=1600; crf=27; pw=720
fi
audio="-an"; [ -n "$hasaudio" ] && audio="-c:a aac -b:a 96k -ac 2"

ffmpeg -nostdin -v error -y -i "$in" -vf "$vf,fps='min(30,source_fps)'" -c:v libx264 -preset slow -crf $crf \
  -maxrate ${cap}k -bufsize $((cap*2))k -profile:v high -level 4.1 -pix_fmt yuv420p -g 60 \
  $audio -movflags +faststart "$out/$name.mp4"

t=$(python3 -c "print(round(min(2.0, $dur/3), 2))")
ffmpeg -nostdin -v error -y -ss "$t" -i "$out/$name.mp4" -frames:v 1 -vf "scale=$pw:-2" -q:v 4 "$out/posters/$name.jpg"
echo "$name: $(du -m "$out/$name.mp4" | cut -f1)MB"
