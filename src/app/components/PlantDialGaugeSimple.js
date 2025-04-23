import GaugeComponent from "react-gauge-component";

const BREAKPOINTS = [
    { limit: 30, color: "#FF0000", label: "Needs More Work (0–30%)" },
    { limit: 60, color: "#F9C802", label: "Slightly Under Capacity (30–60%)" },
    { limit: 95, color: "#00FF00", label: "Healthy Capacity (60–95%)" },
    { limit: 100, color: "#F9C802", label: "Close to Over Capacity (95–100%)" },
    { limit: 120, color: "#FF0000", label: "Over Capacity (>100%)" },
];

export default function PlantDialGaugeSimple() {
    return (
        <div className="p-4 rounded border shadow min-h-[250px] flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-3">Macomb</h3>
            <div className="h-[150px] w-full">
                <GaugeComponent
                    value={45} // ✅ this is the key fix
                    type="semicircle"
                    arc={{
                        subArcs: [
                            { limit: 50, color: "#FF0000" },
                            { limit: 80, color: "#F9C802" },
                            { limit: 100, color: "#00FF00" },
                        ],
                        padding: 0.02,
                    }}
                    pointer={{
                        elastic: true,
                        animationDelay: 0,
                    }}
                    labels={{
                        tickLabels: {
                            type: "inner",
                            ticks: [
                                { value: 25 },
                                { value: 50 },
                                { value: 70 },
                                { value: 80 },
                                { value: 100 }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    );
}
