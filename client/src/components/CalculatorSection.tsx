import React, { useState } from "react";

export default function CalculatorSection() {
  const [activeCalculator, setActiveCalculator] = useState<'lengthWidth' | 'area'>('lengthWidth');
  const [error, setError] = useState<string | null>(null);

  // Length & Width Calculator
  const [lwInputs, setLwInputs] = useState({
    length: '',
    width: '',
    depth: ''
  });
  const [lwResults, setLwResults] = useState({
    visible: false,
    cubicYards: '0',
    cubicFeet: '0'
  });

  // Area Calculator
  const [areaInputs, setAreaInputs] = useState({
    area: '',
    depth: ''
  });
  const [areaResults, setAreaResults] = useState({
    visible: false,
    cubicYards: '0',
    cubicFeet: '0'
  });

  const handleLwInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLwInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAreaInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateLw = () => {
    const length = parseFloat(lwInputs.length);
    const width = parseFloat(lwInputs.width);
    const depth = parseFloat(lwInputs.depth);

    if (length > 0 && width > 0 && depth > 0) {
      setError(null);
      // Convert dimensions to cubic feet
      const cubicFeet = (length * width * (depth / 12));
      // Convert cubic feet to cubic yards (27 cubic feet = 1 cubic yard)
      const cubicYards = cubicFeet / 27;

      setLwResults({
        visible: true,
        cubicYards: cubicYards.toFixed(2),
        cubicFeet: cubicFeet.toFixed(2)
      });
    } else {
      setError("Please enter valid dimensions greater than zero.");
    }
  };

  const calculateArea = () => {
    const area = parseFloat(areaInputs.area);
    const depth = parseFloat(areaInputs.depth);

    if (area > 0 && depth > 0) {
      setError(null);
      // Convert dimensions to cubic feet
      const cubicFeet = area * (depth / 12);
      // Convert cubic feet to cubic yards
      const cubicYards = cubicFeet / 27;

      setAreaResults({
        visible: true,
        cubicYards: cubicYards.toFixed(2),
        cubicFeet: cubicFeet.toFixed(2)
      });
    } else {
      setError("Please enter valid dimensions greater than zero.");
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-tr from-background via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-heading font-bold">Topsoil Calculator</h2>
          <p className="mt-2 text-foreground/75 max-w-3xl">
            Estimate how much material you need, then we can deliver and spread the right blend for lawns and beds.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-lg">
            <div className="p-5 sm:p-6 border-b border-border">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    activeCalculator === "lengthWidth"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/70",
                  ].join(" ")}
                  onClick={() => setActiveCalculator("lengthWidth")}
                >
                  Length & Width
                </button>
                <button
                  type="button"
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    activeCalculator === "area"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/70",
                  ].join(" ")}
                  onClick={() => setActiveCalculator("area")}
                >
                  Area
                </button>
              </div>
              {error && (
                <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6">
              {/* Length & Width Calculator */}
              <div className={activeCalculator === "lengthWidth" ? "" : "hidden"}>
                <h3 className="text-xl font-heading font-semibold mb-4">Calculate by Length & Width</h3>

                <div className="mb-6">
                  <p className="mb-4 text-muted-foreground">Enter your area dimensions and desired depth:</p>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="length" className="calculator-label">Length (feet)</label>
                        <input
                          type="number"
                          id="length"
                          name="length"
                          min="1"
                          value={lwInputs.length}
                          onChange={handleLwInputChange}
                          className="calculator-input"
                        />
                      </div>
                      <div>
                        <label htmlFor="width" className="calculator-label">Width (feet)</label>
                        <input
                          type="number"
                          id="width"
                          name="width"
                          min="1"
                          value={lwInputs.width}
                          onChange={handleLwInputChange}
                          className="calculator-input"
                        />
                      </div>
                      <div>
                        <label htmlFor="depth" className="calculator-label">Depth (inches)</label>
                        <input
                          type="number"
                          id="depth"
                          name="depth"
                          min="1"
                          max="12"
                          value={lwInputs.depth}
                          onChange={handleLwInputChange}
                          className="calculator-input"
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <button
                        type="button"
                        onClick={calculateLw}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2.5 px-6 rounded-lg transition-colors"
                      >
                        Calculate
                      </button>
                    </div>
                  </div>
                </div>

                {lwResults.visible && (
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <h4 className="font-heading font-semibold mb-2">Results</h4>
                    <p>You will need approximately <span className="font-bold text-primary">{lwResults.cubicYards}</span> cubic yards.</p>
                    <p className="mt-2 text-sm text-muted-foreground">That’s about <span className="font-semibold text-foreground">{lwResults.cubicFeet}</span> cubic feet.</p>
                  </div>
                )}
              </div>

              {/* Area Calculator */}
              <div className={activeCalculator === "area" ? "" : "hidden"}>
                <h3 className="text-xl font-heading font-semibold mb-4">Calculate by Area</h3>

                <div className="mb-6">
                  <p className="mb-4 text-muted-foreground">Enter your area and desired depth:</p>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="area" className="calculator-label">Area (square feet)</label>
                        <input
                          type="number"
                          id="area"
                          name="area"
                          min="1"
                          value={areaInputs.area}
                          onChange={handleAreaInputChange}
                          className="calculator-input"
                        />
                      </div>
                      <div>
                        <label htmlFor="areaDepth" className="calculator-label">Depth (inches)</label>
                        <input
                          type="number"
                          id="areaDepth"
                          name="depth"
                          min="1"
                          max="12"
                          value={areaInputs.depth}
                          onChange={handleAreaInputChange}
                          className="calculator-input"
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <button
                        type="button"
                        onClick={calculateArea}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2.5 px-6 rounded-lg transition-colors"
                      >
                        Calculate
                      </button>
                    </div>
                  </div>
                </div>

                {areaResults.visible && (
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <h4 className="font-heading font-semibold mb-2">Results</h4>
                    <p>You will need approximately <span className="font-bold text-primary">{areaResults.cubicYards}</span> cubic yards.</p>
                    <p className="mt-2 text-sm text-muted-foreground">That’s about <span className="font-semibold text-foreground">{areaResults.cubicFeet}</span> cubic feet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-lg p-6">
            <h3 className="text-xl font-heading font-semibold">Need help with topsoil?</h3>
            <p className="mt-2 text-muted-foreground">
              Once you’ve calculated your amount, we can recommend the right depth and handle delivery + spreading.
            </p>
            <a
              href="#quotes"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-secondary px-5 py-2.5 font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/90 transition-colors"
            >
              Request Topsoil Delivery Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}