import { useState } from 'react';
import { useParams, useLocation } from "react-router";
import styles from'../css/downloadSetPages.module.css';

function App() {
  const [format, setFormat] = useState('mp3');
  const [quality, setQuality] = useState('bestaudio');
  const [message, setMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const params = useParams();
  const { url } = params;
  const location = useLocation();
  const { title } = location.state || {};

  const handleDownload = async () => {
    setMessage('다운로드 시작...');
    setDownloadLink('');

    const response = await fetch('http://localhost:3300/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, format, quality }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      setMessage(text);

      if (text.includes('다운로드 링크:')) {
        const linkMatch = text.match(/다운로드 링크: (http.+)/);
        if (linkMatch) {
          setDownloadLink(linkMatch[1]);
          setMessage('다운로드 완료!');
        }
      }

      if (text.includes('오류 발생!')) {
        setMessage('다운로드 실패!');
      }
    }
  };

  return (
    <div className="app-container" style={styles}>
      <h1>YT-DLP 다운로드 {title}</h1>
      <select value={format} onChange={(e) => setFormat(e.target.value)} className="select-format">
        <option value="mp3">MP3</option>
        <option value="mp4">MP4</option>
      </select>
      <select
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        className="select-quality"
      >
        <option value="bestaudio">최고 오디오</option>
        <option value="bestvideo">최고 비디오</option>
        <option value="worst">최저 품질</option>
      </select>
      <button onClick={handleDownload} className="download-button">
        다운로드 시작
      </button>

      <pre className="status-message">{message}</pre>

      {downloadLink && (
        <div className="download-container">
          <a href={downloadLink} download className="download-link">
            다운로드 파일 받기
          </a>
        </div>
      )}
    </div>
  );
}

export default App;