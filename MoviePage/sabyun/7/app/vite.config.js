import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // 절대 경로 설정
    },
  },
  server: {
    port: 3000, // 개발 서버 포트
    open: true, // 브라우저 자동 열림
  },
  build: {
    target: 'esnext', // 최신 브라우저 지원
    outDir: 'dist',   // 빌드 결과 폴더
    sourcemap: true,  // 디버깅용 소스맵 생성
    minify: 'esbuild', // 빠른 빌드
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // React 자동 주입
  },
  envPrefix: 'VITE_', // 환경 변수 접두사
});
