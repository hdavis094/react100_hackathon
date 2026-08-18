export default async function handler(req, res) {
    const { ingredient } = req.query;
    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
        );
        const data = await response.json();
        res.status(200).json(data.meals || []);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
}
