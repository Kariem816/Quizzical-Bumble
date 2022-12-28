import React from "react";
import DropDown from "./DropDown/DropDown";
import InputNumber from "./InputNumber/InputNumber";

const DETAILS_LOCAL_KEY = "quizzical.bumble.details";

export default function Settings(props) {
    const [quizDetails, setQuizDetails] = React.useState(props.quizDetails);

    function handleChange(e) {
        let { name, value, type, checked } = e.target;

        if (type === "number" && value > 50) value = 50;

        setQuizDetails((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    function changeCategory(newCategory) {
        setQuizDetails((prevFormData) => {
            return {
                ...prevFormData,
                category: newCategory,
            };
        });
    }

    function changeNumber(newNumber) {
        setQuizDetails((prevFormData) => {
            return {
                ...prevFormData,
                number: newNumber,
            };
        });
    }

    function saveDetails() {
        props.setQuizDetails(quizDetails);
        localStorage.setItem(DETAILS_LOCAL_KEY, JSON.stringify(quizDetails));
        props.handleClick();
    }

    const categories = [
        { option: "Any", value: "any" },
        { option: "General Knowledge", value: "9" },
        { option: "Entertainment: Books", value: "10" },
        { option: "Entertainment: Film", value: "11" },
        { option: "Entertainment: Music", value: "12" },
        { option: "Entertainment: Musicals & Theatres", value: "13" },
        { option: "Entertainment: Television", value: "14" },
        { option: "Entertainment: Video Games", value: "15" },
        { option: "Entertainment: Board Games", value: "16" },
        { option: "Science & Nature", value: "17" },
        { option: "Science: Computers", value: "18" },
        { option: "Science: Mathematics", value: "19" },
        { option: "Mythology", value: "20" },
        { option: "Sports", value: "21" },
        { option: "Geography", value: "22" },
        { option: "History", value: "23" },
        { option: "Politics", value: "24" },
        { option: "Art", value: "25" },
        { option: "Celebrities", value: "26" },
        { option: "Animals", value: "27" },
        { option: "Vehicles", value: "28" },
        { option: "Entertainment: Comics", value: "29" },
        { option: "Science: Gadgets", value: "30" },
        { option: "Entertainment: Japanese Anime & Manga", value: "31" },
        { option: "Entertainment: Cartoon & Animations", value: "32" },
    ];

    return (
        <div
            className={`settings${props.darkMode ? " dark" : ""}`}
            style={{
                opacity: props.isShown ? "100%" : "0",
                zIndex: props.isShown ? "1" : "-1",
                scale: props.isShown ? "1" : "0",
            }}
        >
            <label className="question-head">Number of Questions</label>
            <InputNumber
                className={props.darkMode ? "dark" : ""}
                onChange={changeNumber}
                value={quizDetails.number}
                min={1}
                max={50}
            />

            <label className="question-head">Choose Category</label>
            <DropDown
                className={props.darkMode ? "dark" : ""}
                options={categories}
                onChange={changeCategory}
                defaultOption={quizDetails.category}
                limit={9.8}
            />

            <div className="question-head">Choose Difficulty</div>
            <div className="question-choices">
                <input
                    type="radio"
                    id="difficultyAny"
                    name="difficulty"
                    value="any"
                    checked={quizDetails.difficulty === "any"}
                    onChange={handleChange}
                />
                <label className="choice" htmlFor="difficultyAny">
                    Any
                </label>
                <input
                    type="radio"
                    id="difficultyEasy"
                    name="difficulty"
                    value="easy"
                    checked={quizDetails.difficulty === "easy"}
                    onChange={handleChange}
                />
                <label className="choice" htmlFor="difficultyEasy">
                    Easy
                </label>
                <input
                    type="radio"
                    id="difficultyMedium"
                    name="difficulty"
                    value="medium"
                    checked={quizDetails.difficulty === "medium"}
                    onChange={handleChange}
                />
                <label className="choice" htmlFor="difficultyMedium">
                    Medium
                </label>
                <input
                    type="radio"
                    id="difficultyHard"
                    name="difficulty"
                    value="hard"
                    checked={quizDetails.difficulty === "hard"}
                    onChange={handleChange}
                />
                <label className="choice" htmlFor="difficultyHard">
                    Hard
                </label>
            </div>

            <div className="question-head">Choose Type</div>
            <div className="question-choices">
                <input
                    type="radio"
                    id="typeAny"
                    name="type"
                    value="any"
                    checked={quizDetails.type === "any"}
                    onChange={handleChange}
                />
                <label className="choice" htmlFor="typeAny">
                    Any
                </label>
                <input
                    type="radio"
                    id="typeMultiple"
                    name="type"
                    value="multiple"
                    checked={quizDetails.type === "multiple"}
                    onChange={handleChange}
                />
                <label className="choice" htmlFor="typeMultiple">
                    Multiple Choice
                </label>
                <input
                    type="radio"
                    id="typeBoolean"
                    name="type"
                    value="boolean"
                    checked={quizDetails.type === "boolean"}
                    onChange={handleChange}
                />
                <label className="choice" htmlFor="typeBoolean">
                    True or False
                </label>
            </div>

            <button
                type="button"
                className="start-page-btn"
                onClick={saveDetails}
                style={{
                    marginInline: "auto",
                }}
            >
                OK
            </button>
        </div>
    );
}
