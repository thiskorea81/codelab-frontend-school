import { useState } from 'react'

// 주석과 문자열 문맥만 아주 가볍게 강조하는 미니 하이라이터 (라이브러리 없이 동작)
const TOKEN_REGEX =
  /(\/\*[\s\S]*?\*\/)|(\/\/[^\n]*)|(<!--[\s\S]*?-->)|('(?:\\.|[^'\\])*')|("(?:\\.|[^"\\])*")|(`(?:\\.|[^`\\])*`)/g

function renderHighlighted(code) {
  const parts = []
  let lastIndex = 0
  let match
  let key = 0

  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    if (match.index > lastIndex) {
      parts.push(code.slice(lastIndex, match.index))
    }
    const token = match[0]
    let className = ''
    if (token.startsWith('/*') || token.startsWith('//') || token.startsWith('<!--')) {
      className = 'tok-comment'
    } else {
      className = 'tok-string'
    }
    parts.push(
      <span key={key++} className={className}>
        {token}
      </span>,
    )
    lastIndex = match.index + token.length
  }

  if (lastIndex < code.length) {
    parts.push(code.slice(lastIndex))
  }
  return parts
}

export default function CodeBlock({ language, filename, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // 클립보드 접근이 차단된 환경에서도 무시
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="codeblock">
      <div className="codeblock-header">
        <div className="codeblock-meta">
          <span className="codeblock-lang">{language}</span>
          {filename && <span>{filename}</span>}
        </div>
        <button type="button" className="codeblock-copy" onClick={handleCopy}>
          {copied ? '복사됨!' : '복사'}
        </button>
      </div>
      <pre>
        <code>{renderHighlighted(code)}</code>
      </pre>
    </div>
  )
}
