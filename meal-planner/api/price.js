export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { ingredients } = req.body;
    try {
        const body = new URLSearchParams();
        body.append('ingredientList', ingredients.join('\n'));
        body.append('servings', '1');

        const response = await fetch(
            'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/parseIngredients',
            {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body,
            }
        );

        const data = await response.json();

        const items = data.map((item) => ({
            name: item.name,
            costDollars: (item.estimatedCost?.value || 0) / 100,
        }));
        const totalCost = items.reduce((sum, item) => sum + item.costDollars, 0).toFixed(2);

        res.status(200).json({ items, totalCost });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get price estimate' });
    }
}
