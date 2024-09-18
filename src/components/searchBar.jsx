import { useEffect, useState } from "react"

export default function SearchBar({handleOnCreate}) {

    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('https://opentdb.com/api_category.php');
            const data = await response.json();
            setCategories(data.trivia_categories);
        }
        fetchCategories();
    }, []);

    return (
        <div className="flex space-x-4">
            <select id="categorySelect" className="block w-full bg-gray-200 p-2 rounded"
                    onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <select id="difficultySelect" className="block w-full bg-gray-200 p-2 rounded"
                    onChange={(e) => setDifficulty(e.target.value)}
            >
                <option value="">Select difficulty</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select>

            <button id="createBtn" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-500" disabled={!(category && difficulty)}
                onClick={()=> handleOnCreate(category, difficulty)}
            >
                Create
            </button>
        </div>
    )
}