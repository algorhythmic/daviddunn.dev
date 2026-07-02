// Animated flame tongues overlaid on a button when it "catches fire".
// Absolutely positioned; parent must be `relative`.
const FLAMES = [
  { left: "10%", w: 26, delay: "0s", dur: "0.45s" },
  { left: "28%", w: 34, delay: "0.15s", dur: "0.55s" },
  { left: "45%", w: 42, delay: "0.05s", dur: "0.5s" },
  { left: "62%", w: 34, delay: "0.22s", dur: "0.6s" },
  { left: "80%", w: 28, delay: "0.1s", dur: "0.48s" },
  { left: "92%", w: 22, delay: "0.28s", dur: "0.52s" },
]

export function Flames() {
  return (
    <span aria-hidden className="btn-fire">
      {FLAMES.map((f, i) => (
        <span
          key={i}
          className="btn-flame"
          style={{
            left: f.left,
            width: f.w,
            height: f.w * 1.9,
            marginLeft: -(f.w / 2),
            animationDelay: f.delay,
            animationDuration: f.dur,
          }}
        />
      ))}
    </span>
  )
}
