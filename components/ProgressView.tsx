export default function ProgressView() {
  return (
    <div className="space-y-4 px-2">
      {/* Progress Stats */}
      <div className="pixel-card">
        <div className="grid grid-cols-3 gap-4 text-center py-6">
          <div>
            <div className="pixel-font text-3xl mb-2">12</div>
            <div className="pixel-font text-xs">TASKS DONE</div>
          </div>
          <div>
            <div className="pixel-font text-3xl mb-2">125</div>
            <div className="pixel-font text-xs">cUSD EARNED</div>
          </div>
          <div>
            <div className="pixel-font text-3xl mb-2">3</div>
            <div className="pixel-font text-xs">LEVEL</div>
          </div>
        </div>
      </div>

      {/* No Tasks Message */}
      <div className="pixel-card text-center py-12">
        <h2 className="pixel-font text-lg mb-6">NO TASKS IN PROGRESS</h2>
        <button className="pixel-button bg-pink-soft text-sm px-6 py-3">FIND TASKS</button>
      </div>
    </div>
  )
}
