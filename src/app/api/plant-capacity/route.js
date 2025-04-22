export async function GET() {
    const data = [
        {
            site: "Macomb",
            capacity: 1000,
            orders: {
                plant_determination: 300,
                should_not_move: 150,
                can_move: 100,
            },
        },
        {
            site: "Gettysburg",
            capacity: 800,
            orders: {
                plant_determination: 100,
                should_not_move: 200,
                can_move: 400,
            },
        },
        {
            site: "Daniel Test",
            capacity: 2500,
            orders: {
                plant_determination: 600,
                should_not_move: 250,
                can_move: 250,
            },
        },
        {
            site: "Daniel Test2",
            capacity: 7500,
            orders: {
                plant_determination: 1500,
                should_not_move: 2500,
                can_move: 1250,
            },
        },
        {
            site: "Daniel Test3",
            capacity: 2500,
            orders: {
                plant_determination: 800,
                should_not_move: 250,
                can_move: 250,
            },
        },
    ];

    return Response.json(data);
}
