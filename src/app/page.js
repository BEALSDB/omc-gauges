"use client";
import { useEffect, useState } from "react";
import CapacityGauge from "./components/CapacityGauge";
import ForecastTable from "./components/ForecastTable";
import PlantDialGauge from "./components/PlantDialGauge";

export default function Home() {
  const [plantData, setPlantData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const PlantDialGauge = dynamic(() => import("./components/PlantDialGauge"), {
  //   ssr: false,
  // });

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const res = await fetch("/api/plant-capacity");
        const rawData = await res.json();

        const processed = rawData.map(plant => {
          const totalOrders = Object.values(plant.orders).reduce((a, b) => a + b, 0);
          const percentUsed = (totalOrders / plant.capacity) * 100;

          const segments = [
            {
              percent: (plant.orders.plant_determination / plant.capacity) * 100,
              count: plant.orders.plant_determination,
              color: "black",
              tooltip: "Can't Move",
              link: null
            },
            {
              percent: (plant.orders.should_not_move / plant.capacity) * 100,
              count: plant.orders.should_not_move,
              color: "yellow",
              tooltip: "Shouldn't Move",
              link: "/apex/placeholder"
            },
            {
              percent: (plant.orders.can_move / plant.capacity) * 100,
              count: plant.orders.can_move,
              color: "limegreen",
              tooltip: "Can Move",
              link: "/apex/placeholder"
            }
          ];

          return {
            site: plant.site,
            segments,
            percentUsed
          };
        });


        setPlantData(processed);
      } catch (err) {
        console.error("Failed to fetch plant capacity:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantData();
  }, []);


  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Plant Availability (Dial View)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center mb-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"> */}
        {plantData.map((plant, index) => (
          <PlantDialGauge
            key={index}
            site={plant.site}
            percentUsed={plant.percentUsed}
          />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Forecast Tables (EXAMPLE - I HATE HOW THIS LOOKS)</h2>
      <ForecastTable />

      <h1 className="text-2xl font-bold mb-4">Plant Capacity</h1>
      {loading ? (
        <p className="text-gray-600">Loading data...</p>
      ) : (
        plantData.map((plant, index) => (
          <CapacityGauge
            key={index}
            site={plant.site}
            segments={plant.segments}
            usedPercent={plant.percentUsed}
          />
        ))
      )}
    </main>
  );
}
