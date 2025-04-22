const rawDemand = [
    { date: "4/23/2025", macomb: 1619, gettysburg: 861, reidsville: 75 },
    { date: "4/24/2025", macomb: 2279, gettysburg: 789, reidsville: 4 },
    { date: "4/25/2025", macomb: 1696, gettysburg: 2066, reidsville: 210 },
    { date: "4/28/2025", macomb: 1920, gettysburg: 1274, reidsville: 333 },
];

const calculateTotal = (row) => row.macomb + row.gettysburg + row.reidsville;

const demandByShipDate = rawDemand.map(row => ({
    ...row,
    total: calculateTotal(row)
}));

const forecast = [
    { label: "April Forecast", macomb: 1972, gettysburg: 1764, reidsville: 404 },
    { label: "5 day average", macomb: 1857, gettysburg: 1880, reidsville: 448 },
    { label: "Current Targets", macomb: 1840, gettysburg: 1980, reidsville: 440 },
];

forecast.forEach(row => {
    row.total = row.macomb + row.gettysburg + row.reidsville;
});

forecast.push({
    label: "5 day avg vs. Current target",
    macomb: `${Math.round((forecast[1].macomb / forecast[2].macomb) * 100)}%`,
    gettysburg: `${Math.round((forecast[1].gettysburg / forecast[2].gettysburg) * 100)}%`,
    reidsville: `${Math.round((forecast[1].reidsville / forecast[2].reidsville) * 100)}%`,
    total: `${Math.round((forecast[1].total / forecast[2].total) * 100)}%`
});

const remainingAfterRelease = [
    { date: "5/1/2025", macomb: 0, gettysburg: 0, reidsville: 0 },
    { date: "5/2/2025", macomb: 1814, gettysburg: 319, reidsville: 70 },
    { date: "5/5/2025", macomb: 1604, gettysburg: 2325, reidsville: 72 },
    { date: "5/6/2025", macomb: 148, gettysburg: 348, reidsville: 0 },
];

remainingAfterRelease.forEach(row => {
    row.total = row.macomb + row.gettysburg + row.reidsville;
});

const totalMacomb = remainingAfterRelease.slice(1).reduce((sum, row) => sum + row.macomb, 0);
const totalGettysburg = remainingAfterRelease.slice(1).reduce((sum, row) => sum + row.gettysburg, 0);
const totalReidsville = remainingAfterRelease.slice(1).reduce((sum, row) => sum + row.reidsville, 0);
const totalAll = totalMacomb + totalGettysburg + totalReidsville;

const summary = {
    total: { macomb: totalMacomb, gettysburg: totalGettysburg, reidsville: totalReidsville, total: totalAll },
    ratioRemaining: {
        macomb: (totalMacomb / forecast[2].macomb).toFixed(2),
        gettysburg: (totalGettysburg / forecast[2].gettysburg).toFixed(2),
        reidsville: (totalReidsville / forecast[2].reidsville).toFixed(2),
        total: (totalAll / forecast[2].total).toFixed(2)
    },
    available: {
        day1: {
            macomb: `${Math.round((remainingAfterRelease[1].macomb / forecast[2].macomb) * 100)}%`,
            gettysburg: `${Math.round((remainingAfterRelease[1].gettysburg / forecast[2].gettysburg) * 100)}%`,
            reidsville: `${Math.round((remainingAfterRelease[1].reidsville / forecast[2].reidsville) * 100)}%`,
            total: `${Math.round((remainingAfterRelease[1].total / forecast[2].total) * 100)}%`
        },
        day2: {
            macomb: `${Math.round(((remainingAfterRelease[1].macomb + remainingAfterRelease[2].macomb) / forecast[2].macomb) * 100)}%`,
            gettysburg: `${Math.round(((remainingAfterRelease[1].gettysburg + remainingAfterRelease[2].gettysburg) / forecast[2].gettysburg) * 100)}%`,
            reidsville: `${Math.round(((remainingAfterRelease[1].reidsville + remainingAfterRelease[2].reidsville) / forecast[2].reidsville) * 100)}%`,
            total: `${Math.round(((remainingAfterRelease[1].total + remainingAfterRelease[2].total) / forecast[2].total) * 100)}%`
        },
        day3: {
            macomb: `${Math.round((totalMacomb / forecast[2].macomb) * 100)}%`,
            gettysburg: `${Math.round((totalGettysburg / forecast[2].gettysburg) * 100)}%`,
            reidsville: `${Math.round((totalReidsville / forecast[2].reidsville) * 100)}%`,
            total: `${Math.round((totalAll / forecast[2].total) * 100)}%`
        }
    }
};

const mockData = {
    demandByShipDate,
    forecast,
    remainingAfterRelease,
    summary
};


const ForecastTable = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-bold mb-2">Demand by Org by Original Ship Date</h2>
                <table className="w-full table-auto border border-collapse border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">Original Ship Date</th>
                            <th className="border px-2 py-1">M06 Macomb</th>
                            <th className="border px-2 py-1">G03 Gettysburg</th>
                            <th className="border px-2 py-1">V02 Reidsville</th>
                            <th className="border px-2 py-1">Totals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.demandByShipDate.map((row, idx) => (
                            <tr key={idx}>
                                <td className="border px-2 py-1">{row.date}</td>
                                <td className="border px-2 py-1 text-right">{row.macomb}</td>
                                <td className="border px-2 py-1 text-right">{row.gettysburg}</td>
                                <td className="border px-2 py-1 text-right">{row.reidsville}</td>
                                <td className="border px-2 py-1 text-right">{row.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-2">Forecasting Table</h2>
                <table className="w-full table-auto border border-collapse border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">Metric</th>
                            <th className="border px-2 py-1">M06 Macomb</th>
                            <th className="border px-2 py-1">G03 Gettysburg</th>
                            <th className="border px-2 py-1">V02 Reidsville</th>
                            <th className="border px-2 py-1">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.forecast.map((row, idx) => (
                            <tr key={idx}>
                                <td className="border px-2 py-1 font-medium">{row.label}</td>
                                <td className="border px-2 py-1 text-right">{row.macomb}</td>
                                <td className="border px-2 py-1 text-right">{row.gettysburg}</td>
                                <td className="border px-2 py-1 text-right">{row.reidsville}</td>
                                <td className="border px-2 py-1 text-right">{row.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-2">Units Remaining After Release</h2>
                <table className="w-full table-auto border border-collapse border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">Ship Date</th>
                            <th className="border px-2 py-1">M06 Macomb</th>
                            <th className="border px-2 py-1">G03 Gettysburg</th>
                            <th className="border px-2 py-1">V02 Reidsville</th>
                            <th className="border px-2 py-1">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.remainingAfterRelease.map((row, idx) => (
                            <tr key={idx}>
                                <td className="border px-2 py-1">{row.date}</td>
                                <td className="border px-2 py-1 text-right">{row.macomb}</td>
                                <td className="border px-2 py-1 text-right">{row.gettysburg}</td>
                                <td className="border px-2 py-1 text-right">{row.reidsville}</td>
                                <td className="border px-2 py-1 text-right">{row.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 text-sm mb-4">
                    <p>
                        <strong>3 Day Total:</strong> {mockData.summary.total.macomb} / {mockData.summary.total.gettysburg} / {mockData.summary.total.reidsville} — Total: {mockData.summary.total.total}
                    </p>
                    <p>
                        <strong>Ratio Remaining:Target:</strong> {mockData.summary.ratioRemaining.macomb} / {mockData.summary.ratioRemaining.gettysburg} / {mockData.summary.ratioRemaining.reidsville} — Total: {mockData.summary.ratioRemaining.total}
                    </p>
                    <p>
                        <strong>% Available (next day):</strong> {mockData.summary.available.day1.macomb} / {mockData.summary.available.day1.gettysburg} / {mockData.summary.available.day1.reidsville} — Total: {mockData.summary.available.day1.total}
                    </p>
                    <p>
                        <strong>% Available (next 2 days):</strong> {mockData.summary.available.day2.macomb} / {mockData.summary.available.day2.gettysburg} / {mockData.summary.available.day2.reidsville} — Total: {mockData.summary.available.day2.total}
                    </p>
                    <p>
                        <strong>% Available (next 3 days):</strong> {mockData.summary.available.day3.macomb} / {mockData.summary.available.day3.gettysburg} / {mockData.summary.available.day3.reidsville} — Total: {mockData.summary.available.day3.total}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForecastTable;
