import { Link } from "react-router-dom";
import Questions from "../components/questions";
import SearchBar from "../components/searchBar";
import { useEffect, useState } from "react";

export default function Quiz() {
    const [creationStarted, setCreationStarted ] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    function handleOnCreate(category, difficulty) {
        setCreationStarted(true)
        setSelectedCategory(category);
        setSelectedDifficulty(difficulty);
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-center">Quiz Maker</h1>
            <SearchBar handleOnCreate={handleOnCreate}></SearchBar>
            { creationStarted && <Questions category={selectedCategory} difficulty={selectedDifficulty}></Questions>}
        </>

    )
}