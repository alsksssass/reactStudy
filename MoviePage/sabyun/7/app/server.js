// Node.js 서버 설정
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3300;

// CORS 허용
app.use(cors());
app.use(express.json());

app.post('/download', (req, res) => {
  const { url, format, quality } = req.body;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  const outputDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: 다운로드 시작...\n\n');
  const outputPath = `downloads/%(title)s.%(ext)s`;
  const command = `yt-dlp --ffmpeg-location /usr/bin/ffmpeg -o "${outputPath}" --extract-audio --audio-format ${format} "${url}" --ignore-errors --no-part --no-continue --add-metadata`;

  const process = exec(command);

  process.stdout.on('data', (data) => {
    const progressMatch = data.match(/\[download\]\s+(\d{1,3}\.\d+)%/);
    if (progressMatch) {
      res.write(`data: Progress: ${progressMatch[1]}%`);
    }
  });

  process.stderr.on('data', (data) => {
    console.error(`FFmpeg 오류: ${data}`);
  });

  process.on('close', (code) => {
    if (code === 0) {
      fs.readdir(outputDir, (err, files) => {
        if (err || files.length === 0) {
          res.write('data: 다운로드 실패!');
        } else {
          const downloadLink = `http://localhost:${PORT}/downloads/${encodeURIComponent(files[0])}`;
          res.write(`data: 다운로드 완료!`);
          res.write(`data: 다운로드 링크: ${downloadLink}`);
        }
        res.end();
      });
    } else {
      res.write(`data: 오류 발생! 코드 ${code}`);
      res.end();
    }
  });
});

// 정적 파일 제공
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});