// 아티팩트용 index.html(본문만 있는 파일)을 일반 웹사이트용 docs/index.html 로 감싼다.
// 사용: node backend-study/build-web.js
// 웹 버전에는 claude.ai 저장소가 없으므로 진행 상황은 브라우저(localStorage)에 저장된다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(dir, 'index.html'), 'utf8')
  .replace(/<meta name="claude:viewport-fit-sides"[^>]*>\n?/, '');

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="백엔드 필수 개념 46개를 암기 카드, 퀴즈, 오답노트로 공부하는 사이트">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%232456c7'/%3E%3Ctext x='16' y='22' font-family='monospace' font-size='15' font-weight='700' fill='white' text-anchor='middle'%3E%7B%7D%3C/text%3E%3C/svg%3E">
<style>
:root { color-scheme: light; padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
body { margin: 0; font-size: 14px; }
img { max-width: 100%; }
[hidden] { display: none !important; }
</style>
</head>
<body>
${src}
</body>
</html>
`;

const out = path.join(dir, 'docs');   // GitHub Pages 배포 폴더
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('built docs/index.html');
