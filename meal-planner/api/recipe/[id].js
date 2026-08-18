export default async function handler(req, res) {
    const { id } = req.query;
    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        res.status(200).json(data.meals ? data.meals[0] : null);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipe details' });
    }
}
