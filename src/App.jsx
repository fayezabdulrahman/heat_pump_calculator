import React from "react";
import CurveCalculator from "./components/CurveCalculator";

export default function App() {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-800">
			<header className="border-b bg-white/60 backdrop-blur sticky top-0 z-20">
				<div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
					<div className="flex items-center space-x-3">
						<div className="h-9 w-9 bg-emerald-400 rounded-lg flex items-center justify-center text-white font-bold">
							HP
						</div>
						<div>
							<div className="text-lg font-semibold">Heat Pump</div>
							<div className="text-xs text-slate-500">
								Heating curve made simple
							</div>
						</div>
					</div>

					<nav className="space-x-4 text-sm">
						<a href="#about" className="text-slate-600 hover:text-slate-900">
							About
						</a>
						<a
							href="#calculator"
							className="text-slate-600 hover:text-slate-900"
						>
							Calculator
						</a>
						<a href="#faq" className="text-slate-600 hover:text-slate-900">
							FAQ
						</a>
					</nav>
				</div>
			</header>

			<main className="max-w-6xl mx-auto p-6">
				<section id="about" className="mb-8">
					<div className="bg-gradient-to-r from-emerald-50 to-sky-50 p-8 rounded-2xl shadow-sm">
						<h1 className="text-2xl md:text-3xl font-bold">
							Understand your heat pump settings — quickly
						</h1>
						<p className="mt-2 text-slate-700 max-w-2xl">
							This small tool helps you turn two simple example settings from
							your heat pump into a friendly formula that shows the target water
							(flow) temperature as the outside temperature changes. No 
							jargon — just plain numbers you can verify against your heat pump.
						</p>
						<div className="mt-4 flex flex-col sm:flex-row gap-3">
							<a
								href="#calculator"
								className="inline-block px-4 py-2 bg-emerald-500 text-white rounded shadow-sm text-sm"
							>
								Calculator
							</a>
							<a
								href="#faq"
								className="inline-block px-4 py-2 border border-slate-200 rounded text-sm bg-white"
							>
								Read FAQ
							</a>
						</div>
					</div>
				</section>

				<section id="calculator">
					<div className="bg-white rounded-2xl shadow-lg p-8">
						<CurveCalculator />
					</div>
				</section>

				<section id="faq" className="mt-12">
					<div className="bg-white rounded-2xl shadow-lg p-8">
						<h2 className="text-lg font-semibold">FAQ</h2>
						<ul className="mt-4 text-sm text-slate-600 space-y-3">
							<li>
								<strong>Weather compensation / Water Law:</strong> the pump
								decides the water temperature flow in your Rads/UFH based on how cold it is outside —
								colder outside → hotter water.
							</li>
							<li>
								<strong>COP:</strong> Coefficient of Performance — how efficient
								the heat pump is. Higher COP means more heat per unit of
								electricity. E.g. 1kw consumption, 4kw Generated → COP is 4.
							</li>
							<li>
								<strong>Why lower flow helps efficiency:</strong> Heat pumps
								work better with lower flow temps (e.g., underfloor heating).
								Very high flow temps make them less efficient.
							</li>
							<li>
								<strong>Outside the points:</strong> Between your two example
								points we interpolate. Outside that range we extrapolate —
								values can grow beyond what you expect.
							</li>
						</ul>
					</div>
				</section>
			</main>

			<footer className="max-w-6xl mx-auto p-6 text-sm text-slate-500">
				<div>
					Built by a friendly heat-pump user — verify values with your installer
          if you're unsure.
				</div>
			</footer>
		</div>
	);
}
