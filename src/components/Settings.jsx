import React from "react"

const DETAILS_LOCAL_KEY = "quizzical.bumble.details"

export default function Settings(props) {
    const [quizDetails, setQuizDetails] = React.useState(props.quizDetails)

    function handleChange(e) {
        let { name, value, type, checked } = e.target

        if (type === "number" && value > 50) value = 50

        setQuizDetails(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function saveDetails() {
        props.setQuizDetails(quizDetails)
        localStorage.setItem(DETAILS_LOCAL_KEY, JSON.stringify(quizDetails))
        props.handleClick()
    }

    return (
        <div className="settings">
            <label className="question-head">Number of Questions</label>
            <input
                type="number"
                name="number"
                min={1}
                max={50}
                onChange={handleChange}
                value={quizDetails.number}
            />

            <label className="question-head">Choose Category</label>
            <select
                name="category"
                value={quizDetails.category}
                onChange={handleChange}
            >
                <option value="any">Any</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime & Manga</option>
                <option value="32">Entertainment: Cartoon & Animations</option>
            </select>

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
                <label
                    className="choice"
                    htmlFor="difficultyAny"
                >
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
                <label
                    className="choice"
                    htmlFor="difficultyEasy"
                >
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
                <label
                    className="choice"
                    htmlFor="difficultyMedium"
                >
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
                <label
                    className="choice"
                    htmlFor="difficultyHard"
                >
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
                <label
                    className="choice"
                    htmlFor="typeAny"
                >
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
                <label
                    className="choice"
                    htmlFor="typeMultiple"
                >
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
                <label
                    className="choice"
                    htmlFor="typeBoolean"
                >
                    True or False
                </label>
            </div>


            <button
                type="button"
                className="start-page-btn"
                onClick={saveDetails}
                style={{
                    marginInline: "auto"
                }}
            >
                OK
            </button>

        </div>
    )
}