// components/PlantDialGauge.js
"use client";
import GaugeComponent from "react-gauge-component";

const BREAKPOINTS = [
    { limit: 60, color: "#FF0000", label: "Needs More Work (0–60%)" },
    { limit: 80, color: "#F9C802", label: "Slightly Under Capacity (60–80%)" },
    { limit: 110, color: "#00FF00", label: "Healthy Capacity (80–110%)" },
    { limit: 120, color: "#F9C802", label: "Close to Over Capacity (110–120%)" },
    { limit: 130, color: "#FF0000", label: "Over Capacity (>120%)" },
];

export default function PlantDialGauge({ site, percentUsed }) {
    const clampedValue = Math.min(percentUsed, BREAKPOINTS[BREAKPOINTS.length - 1].limit);

    return (
        <div className="flex flex-col items-center p-2 w-full max-w-[250px]">
            <h3 className="text-sm font-semibold mb-2 text-center">{site}</h3>
            <div className="w-full">
                <GaugeComponent
                    value={clampedValue}
                    minValue={0}
                    maxValue={BREAKPOINTS[BREAKPOINTS.length - 1].limit}
                    type="semicircle"
                    arc={{
                        width: 0.2,
                        padding: 0.01,
                        subArcs: BREAKPOINTS.map(bp => ({
                            limit: bp.limit,
                            color: bp.color,
                            tooltip: { text: bp.label },
                        })),
                    }}
                    pointer={{
                        type: "needle",
                        elastic: true,
                        animationDelay: 0,
                    }}
                    labels={{
                        valueLabel: {
                            formatTextValue: (val) => `${val.toFixed(1)}%`,
                            matchColorWithArc: true,
                            style: { fontSize: "20px", fill: "#333" },
                        },
                        tickLabels: {
                            type: "outer",
                            ticks: BREAKPOINTS.map(bp => ({ value: bp.limit })),
                            defaultTickValueConfig: {
                                style: { fontSize: "10px", fill: "#444" },
                            },
                            defaultTickLineConfig: {
                                length: 5,
                                width: 1,
                                color: "#aaa",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
