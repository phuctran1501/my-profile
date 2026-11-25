interface InkShutterProps {
  triggerKey: number;
}

const DELAYS = [0, 30, 60, 90, 120, 150, 180];

export function InkShutter({ triggerKey }: InkShutterProps) {
  if (triggerKey === 0) return null;

  return (
    <div key={triggerKey} aria-hidden="true" className="shutter-columns">
      {DELAYS.map((delayMs, idx) => (
        <div
          key={idx}
          className="shutter-col sweeping"
          style={{ animationDelay: `${delayMs}ms` }}
        />
      ))}
    </div>
  );
}
