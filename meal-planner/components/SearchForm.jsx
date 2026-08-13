

const days = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function SearchForm({ ingredient, setIngredient, selectedDay, setSelectedDay, onGenerate }) {
    return (
        <div className="card p-3 mb-4 no-print">
            <div className="row align-items-center">
            <div className="col-md-5">
            <input
            className="form-control"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder='Enter a main Ingredient'
            />
            </div>
            <div className="col-md-3">
                <select className="form-select" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                ))}
                </select>
            </div>
            <div className="col-md-4">
                <button className="btn btn-primary w-100" onClick={onGenerate}>Generate Recipes</button>
            </div>
            
            </div>
        </div>
    );
}


export default SearchForm;