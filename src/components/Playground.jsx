import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const DEFAULT_HTML = `<div class="card">
  <h1>안녕하세요, CodeLab!</h1>
  <p>버튼을 눌러 보세요.</p>
  <button id="btn">클릭 횟수: 0</button>
</div>`

const DEFAULT_CSS = `body {
  font-family: sans-serif;
  background: #f4f5fb;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.card {
  background: #fff;
  padding: 32px 48px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
}

button {
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
}`

const DEFAULT_JS = `let count = 0;
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  count += 1;
  btn.textContent = '클릭 횟수: ' + count;
});`

function buildDocument(html, css, js) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<style>${css}</style>
</head>
<body>
${html}
<script>
try {
${js}
} catch (err) {
  document.body.insertAdjacentHTML('beforeend', '<pre style="color:red">' + err + '</pre>');
}
</script>
</body>
</html>`
}

const PANES = [
  { key: 'html', label: 'HTML', dot: '#f97316' },
  { key: 'css', label: 'CSS', dot: '#3b82f6' },
  { key: 'js', label: 'JavaScript', dot: '#facc15' },
]

// 영상 강의에서 넘어온 따라하기 코드를 URL 파라미터에서 읽음
function readSnippet(params) {
  const html = params.get('html')
  const css = params.get('css')
  const js = params.get('js')
  if (!html && !css && !js) return null
  return {
    html: html ?? '',
    css: css ?? '',
    js: js ?? '',
  }
}

export default function Playground() {
  const [searchParams] = useSearchParams()
  const snippet = useMemo(() => readSnippet(searchParams), [searchParams])
  const mission = searchParams.get('mission')
  const videoId = searchParams.get('video')
  const cardIndex = searchParams.get('card')

  const initialCode = snippet ?? {
    html: DEFAULT_HTML,
    css: DEFAULT_CSS,
    js: DEFAULT_JS,
  }

  const [code, setCode] = useState(initialCode)
  const [srcDoc, setSrcDoc] = useState(() =>
    buildDocument(initialCode.html, initialCode.css, initialCode.js),
  )
  const [done, setDone] = useState(false)

  // 변경 시 500ms 디바운스 후 자동 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      setSrcDoc(buildDocument(code.html, code.css, code.js))
    }, 500)
    return () => clearTimeout(timer)
  }, [code])

  const handleChange = (key, value) => {
    setCode((prev) => ({ ...prev, [key]: value }))
  }

  const runNow = () => {
    setSrcDoc(buildDocument(code.html, code.css, code.js))
  }

  const handleReset = () => {
    setCode(initialCode)
    setSrcDoc(buildDocument(initialCode.html, initialCode.css, initialCode.js))
  }

  // 실습 완료 기록 — 영상 강의 카드에 ✓ 표시로 연결됨
  const handleDone = () => {
    if (videoId && cardIndex) {
      try {
        localStorage.setItem(`codelab-lab|${videoId}|${cardIndex}`, '1')
      } catch {
        // localStorage 차단 환경 무시
      }
    }
    setDone(true)
  }

  const totalLength = useMemo(
    () => code.html.length + code.css.length + code.js.length,
    [code],
  )

  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <span className="eyebrow">PLAYGROUND</span>
          <h1>코드 플레이그라운드</h1>
          <p>
            HTML, CSS, JavaScript를 직접 써 보고 오른쪽에서 바로 결과를 확인하세요.
            입력이 멈추면 0.5초 뒤에 자동으로 실행됩니다.
          </p>
        </header>

        {mission && (
          <div className="lab-mission">
            <div>
              <span className="eyebrow">실습 미션</span>
              <p>{mission}</p>
            </div>
            <div className="lab-mission-actions">
              {videoId && (
                <Link to={`/video/${videoId}?card=${cardIndex ?? 0}`} className="btn btn-ghost btn-sm">
                  ← 영상으로 돌아가기
                </Link>
              )}
              <button
                type="button"
                className={`btn btn-sm ${done ? 'btn-ghost' : 'btn-primary'}`}
                onClick={handleDone}
              >
                {done ? '✓ 완료 기록됨' : '실습 완료'}
              </button>
            </div>
          </div>
        )}

        <div className="playground-layout">
          {PANES.map((pane) => (
            <div key={pane.key} className="editor-pane">
              <div className="editor-pane-header">
                <span>
                  <span className="dot" style={{ background: pane.dot }} />
                  {pane.label}
                </span>
                <button
                  type="button"
                  className="codeblock-copy"
                  onClick={() => handleChange(pane.key, '')}
                >
                  지우기
                </button>
              </div>
              <textarea
                value={code[pane.key]}
                onChange={(e) => handleChange(pane.key, e.target.value)}
                spellCheck="false"
                aria-label={`${pane.label} 코드 입력`}
              />
            </div>
          ))}
        </div>

        <div className="preview-header">
          <h2>미리보기</h2>
          <div className="actions">
            <span className="auto-run-note">
              자동 실행 중 · 총 {totalLength}자
            </span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={runNow}>
              ▶ 지금 실행
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleReset}>
              초기화
            </button>
          </div>
        </div>

        <iframe
          className="preview-frame"
          title="코드 실행 미리보기"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
        />
      </div>
    </div>
  )
}
