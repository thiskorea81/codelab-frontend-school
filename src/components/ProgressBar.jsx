export default function ProgressBar({ value, max, label, showLabel = true }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0

  return (
    <div className="progress-wrapper">
      {showLabel && (
        <div className="progress-label">
          <span>{label}</span>
          <span>
            {value}/{max} · {percent}%
          </span>
        </div>
      )}
      <div className="progress">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
