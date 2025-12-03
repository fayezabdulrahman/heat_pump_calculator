import { useState, useMemo } from "react";

function toNumber(v) {
	const n = Number(v);
	return Number.isNaN(n) ? 0 : n;
}

// Given two points (x1,y1) and (x2,y2), return slope m and intercept b for y = m*x + b
function lineFromPoints(x1, y1, x2, y2) {
	const m = (y2 - y1) / (x2 - x1);
	const b = y1 - m * x1;
	return { m, b };
}

export default function CurveCalculator() {
	// Default example values
	const [x1, setX1] = useState(20);
	const [y1, setY1] = useState(25);
	const [x2, setX2] = useState(-10);
	const [y2, setY2] = useState(40);
	const [outside, setOutside] = useState(10);

	const { m, b, valid, note } = useMemo(() => {
		// guard against same x values
		const a = toNumber(x1),
			c = toNumber(y1),
			d = toNumber(x2),
			f = toNumber(y2);
		if (a === d)
			return {
				valid: false,
				m: 0,
				b: 0,
				note: "Point 1 and Point 2 must have different outside temperatures.",
			};
		const { m, b } = lineFromPoints(a, c, d, f);
		return { valid: true, m, b, note: "" };
	}, [x1, y1, x2, y2]);

	const flowTemp = useMemo(() => {
		const o = toNumber(outside);
		if (!valid) return null;
		return m * o + b;
	}, [outside, m, b, valid]);

	// helper for pretty equation
	const equation = useMemo(() => {
		if (!valid) return "Invalid";
		// y = m*x + b → format nicely
		const mm = Number(m.toFixed(4));
		const bb = Number(b.toFixed(2));
		return `y = ${mm}x ${bb >= 0 ? "+" : "-"} ${Math.abs(bb)}`;
	}, [m, b, valid]);

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<section className="space-y-4">
					<div className="p-4 rounded-lg border border-slate-100 bg-slate-50">
						<h2 className="font-semibold">Two example settings</h2>
						<p className="text-xs text-slate-500 mt-1">
							Tell the tool: "When it's this outside, I want the water to be
							this warm." Use one warm-day point and one cold-day point.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-2">
							<label htmlFor="warm-outside" className="text-xs text-slate-600">
								Warm day — Outside (°C)
							</label>
							<input
								id="warm-outside"
								placeholder="e.g. 20"
								type="number"
								value={x1}
								onChange={(e) => setX1(e.target.value)}
								className="w-full input"
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="warm-flow" className="text-xs text-slate-600">
								Warm day — Flow (°C)
							</label>
							<input
								id="warm-flow"
								placeholder="e.g. 25"
								type="number"
								value={y1}
								onChange={(e) => setY1(e.target.value)}
								className="w-full input"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="cold-outside" className="text-xs text-slate-600">
								Cold day — Outside (°C)
							</label>
							<input
								id="cold-outside"
								placeholder="e.g. -10"
								type="number"
								value={x2}
								onChange={(e) => setX2(e.target.value)}
								className="w-full input"
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="cold-flow" className="text-xs text-slate-600">
								Cold day — Flow (°C)
							</label>
							<input
								id="cold-flow"
								placeholder="e.g. 40"
								type="number"
								value={y2}
								onChange={(e) => setY2(e.target.value)}
								className="w-full input"
							/>
						</div>
					</div>

					<div className="p-3 rounded border border-slate-100 bg-white">
						<p className="text-sm">
							{valid
								? "We calculated a simple straight-line rule from your two example points."
								: note}
						</p>
						{valid && (
							<div className="mt-2 text-xs text-slate-700">
								<div>
									Slope (how much flow changes per 1°C outside) ={" "}
									<span className="font-medium">{m.toFixed(4)}</span>
								</div>
								<div className="mt-1">
									Formula:{" "}
									<code className="rounded px-2 py-1 bg-slate-100">
										{equation}
									</code>
								</div>
							</div>
						)}
					</div>

					{/* FAQ moved to top-level #faq section in App.jsx */}
				</section>

				<aside className="space-y-4">
					<div className="p-4 rounded-lg border border-slate-100 bg-gradient-to-r from-emerald-50 to-sky-50">
						<h2 className="font-semibold">Calculate flow temperature</h2>
						<label
							htmlFor="current-outside"
							className="text-xs text-slate-600 mt-2 block"
						>
							Current outside temp (°C)
						</label>
						<input
							id="current-outside"
							placeholder="e.g. 10"
							type="number"
							value={outside}
							onChange={(e) => setOutside(e.target.value)}
							className="w-full input mt-1"
						/>
						<div className="mt-3">
							<div className="text-xs text-slate-500">Result</div>
							<div className="mt-2 p-4 rounded bg-white border border-slate-100">
								{valid ? (
									<>
										<div className="text-3xl font-bold">
											{flowTemp !== null ? `~${flowTemp.toFixed(1)}` : "—"}°C
										</div>
										<div className="text-xs text-slate-500 mt-1">
											Target flow temp based on your two example settings
										</div>
										<div className="text-2xs text-slate-400 mt-2">
											~ Results are approximate — actual system temps may vary.
										</div>
									</>
								) : (
									<div className="text-sm text-red-600">{note}</div>
								)}
							</div>
						</div>

						<div className="mt-4 text-xs text-slate-600">
							<p>
								<strong>Quick checks:</strong>
							</p>
							<ol className="list-decimal list-inside ml-4 mt-1 space-y-1">
								<li>
									If outside temp equals x₁ you'll get y₁; if it equals x₂
									you'll get y₂.
								</li>
								<li>
									Between x₁ and x₂ values are interpolated on the straight
									line.
								</li>
								<li>
									Outside of the defined points the curve extrapolates (may
									produce high/low temps).
								</li>
							</ol>
						</div>
					</div>
				</aside>
			</div>
			<div className="p-4 rounded border border-slate-100 bg-white">
				<h3 className="font-medium">Advanced tips</h3>
				<ul className="text-xs mt-2 text-slate-600 list-disc list-inside space-y-1">
					<li>
						Keep your slope shallow for UFH and steeper for radiators that need
						hotter water.
					</li>
					<li>Experiment with different settings to achieve highest COP.</li>
					<li>
						When in doubt, ask your installer for recommended field settings.
					</li>
				</ul>
			</div>{" "}
			<style jsx>{`
        .input {
          padding: .5rem;
          border-radius: .5rem;
          border: 1px solid #e6e9ee;
          background: white;
        }
      `}</style>
		</div>
	);
}
