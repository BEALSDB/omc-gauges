"use client";
import { useState } from "react";

export default function CapacityGauge({ site, segments, usedPercent, totalCapacityPercent = 120 }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const remainingPercent = Math.max(0, totalCapacityPercent - usedPercent);

    const fullBar = [...segments];

    if (remainingPercent > 0) {
        fullBar.push({
            percent: remainingPercent,
            color: "white",
            tooltip: "Available Unused Capacity",
            link: null,
        });
    }

    const tickMarks = [0, 25, 50, 75, 100, totalCapacityPercent];

    return (
        <div className="mb-6">
            <div className="font-semibold mb-1">
                {site}: <span className="text-sm font-normal text-gray-500">{usedPercent.toFixed(1)}% used of {totalCapacityPercent}% capacity</span>
            </div>



            {/* Gauge Bar Container (overflow-visible to support tooltip!) */}
            <div className="relative w-full h-6 rounded overflow-visible border border-gray-300 shadow-sm flex z-0">
                {fullBar.map((segment, i) => {
                    const tooltipColor =
                        segment.color === "white"
                            ? "#555"
                            : segment.color === "yellow"
                                ? "#FACC15"
                                : segment.color;

                    return (
                        <div
                            key={i}
                            onClick={() => segment.link && window.open(segment.link, "_blank")}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`relative h-full transition-all duration-150 ${segment.link ? "cursor-pointer hover:opacity-80" : "cursor-default"
                                }`}
                            style={{
                                width: `${segment.percent}%`,
                                backgroundColor: segment.color,
                                borderRight: i !== fullBar.length - 1 ? "1px solid white" : "none",
                            }}
                        >
                            {/* Tooltip */}
                            {hoveredIndex === i && (
                                <div
                                    className="absolute bottom-full mb-2 left-1/2 z-50 px-2 py-1 text-xs font-semibold text-white rounded transform -translate-x-1/2 whitespace-nowrap shadow-lg"
                                    style={{
                                        backgroundColor: tooltipColor,
                                        textShadow: "0px 0px 3px rgba(0, 0, 0, 0.6)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {segment.tooltip}
                                </div>
                            )}

                            {/* Inner Label (count + % inside segment) */}
                            {segment.count !== undefined && segment.percent > 5 && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold"
                                    style={{
                                        textShadow: "0px 0px 2px rgba(0,0,0,0.8)",
                                        color:
                                            segment.color === "yellow" || segment.color === "white"
                                                ? "#000"
                                                : "#fff",
                                    }}
                                >
                                    {segment.count} ({segment.percent.toFixed(0)}%)
                                </div>
                            )}
                        </div>
                    );

                })}
            </div>


            {/* Tick Labels */}
            <div className="relative w-full h-4 mb-1">
                {tickMarks.map((mark, i) => (
                    <div
                        key={i}
                        className="absolute text-xs font-medium text-gray-600"
                        style={{
                            left: `${(mark / totalCapacityPercent) * 100}%`,
                            transform: mark === 0 ? "translateX(0)" : mark === totalCapacityPercent ? "translateX(-100%)" : "translateX(-50%)"
                        }}
                    >
                        {mark}%
                    </div>
                ))}
            </div>
        </div>
    );
}
