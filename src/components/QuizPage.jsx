import React from "react";
import Confetti from "react-confetti";
import decode64Code from "../utils/Base64Decoder";
import randomize from "../utils/Randomizer";

const body = document.body;
const html = document.documentElement;
let errorText;
let correctAnswersNo;

function QuizPage(props) {
    const [questions, setQuestions] = React.useState([]);
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [error, setError] = React.useState({ isFound: false, errorCode: "" });

    React.useEffect(() => {
        let isCancelled = false;
        let text = `https://opentdb.com/api.php?amount=${props.details.number}`;
        if (props.details.category !== "any")
            text += `&category=${props.details.category}`;
        if (props.details.difficulty !== "any")
            text += `&difficulty=${props.details.difficulty}`;
        if (props.details.type !== "any") text += `&type=${props.details.type}`;
        text += `&encode=base64`;
        if (!isCancelled) {
            fetch(text)
                .then((res) => res.json())
                .then((data) => {
                    if (data.response_code === 0) setQuestions(data.results);
                    else
                        setError({
                            isFound: true,
                            errorCode: data.response_code,
                        });
                });
            window.addEventListener(
                "resize",
                setDimensions([
                    window.innerWidth,
                    Math.max(
                        body.scrollHeight,
                        body.offsetHeight,
                        html.clientHeight,
                        html.scrollHeight,
                        html.offsetHeight
                    ),
                ])
            );
        }

        return () => {
            isCancelled = true;
        };
    }, []);

    React.useEffect(() => {
        setQuizQuestions(
            questions.map((question) => ({
                ...question,
                choices: randomize([
                    ...question.incorrect_answers,
                    question.correct_answer,
                ]),
            }))
        );
    }, [questions]);

    const [isFinished, setIsFinished] = React.useState(false);
    const [quizAnswers, setQuizAnswers] = React.useState({});
    const [dimentions, setDimensions] = React.useState([
        window.innerWidth,
        Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        ),
    ]);

    function handleChange(e) {
        const { name, value } = e.target;
        if (!isFinished)
            setQuizAnswers((prevQuizData) => {
                return {
                    ...prevQuizData,
                    [name]: value,
                };
            });
    }

    function submit() {
        correctAnswersNo = 0;
        for (let i = 0; i < quizQuestions.length; i++) {
            if (quizQuestions[i].correct_answer === quizAnswers[i])
                correctAnswersNo++;
        }
        setIsFinished((prevState) => !prevState);
    }

    function playAgain() {
        props.handleClick();
    }

    function showError(errorCode = error.errorCode) {
        let errorText;
        switch (errorCode) {
            case 1:
                errorText =
                    "The server couldn't find enough questions. Try to choose less filters or decrease the number of questions";
                break;
            case 2:
                errorText =
                    "The server couldn't understand what you specified. Please return to the main menu and try again";
                break;
            default:
                errorText =
                    "There has been an error with the server. Please return to the main menu and try again";
                break;
        }
        return errorText;
    }

    const questionElements = quizQuestions.map((question, qIndex) => {
        const answerElements = question.choices.map((choice, cIndex) => {
            let labelClassName = "";
            if (isFinished) {
                if (question.correct_answer === choice) {
                    labelClassName = "choice-correct";
                } else if (quizAnswers[qIndex] === choice) {
                    labelClassName = "choice-wrong";
                } else {
                    labelClassName = "choice";
                }
            } else {
                labelClassName = "choice";
            }

            return (
                <div key={cIndex}>
                    <input
                        type="radio"
                        id={`${qIndex + 1}. ${cIndex + 1}`}
                        name={qIndex}
                        value={choice}
                        checked={quizAnswers[qIndex] === choice}
                        onChange={handleChange}
                    />
                    <label
                        className={labelClassName}
                        htmlFor={`${qIndex + 1}. ${cIndex + 1}`}
                    >
                        {decode64Code(choice)}
                    </label>
                </div>
            );
        });
        return (
            <div key={qIndex}>
                <div className="question">
                    <div>
                        <div className="question-head">
                            {decode64Code(question.question)}
                        </div>
                        <div className="question-choices">{answerElements}</div>
                    </div>
                    <div className="tags">
                        <div
                            className={`specifics${
                                props.darkMode ? " dark" : ""
                            }`}
                        >
                            <div className="category">
                                {decode64Code(question.category)}
                            </div>
                            <div className="difficulty">
                                {decode64Code(question.difficulty)}
                            </div>
                        </div>
                        {isFinished && (
                            <div className="answered">
                                {quizAnswers[qIndex] ? (
                                    quizAnswers[qIndex] ===
                                    question.correct_answer ? (
                                        <i
                                            style={{
                                                fontSize: "24px",
                                                color: "#94D7A2",
                                            }}
                                            className="fa"
                                        >
                                            &#xf00c;
                                        </i>
                                    ) : (
                                        <i
                                            style={{
                                                fontSize: "24px",
                                                color: "#F8BCBC",
                                            }}
                                            className="fa"
                                        >
                                            &#xf00d;
                                        </i>
                                    )
                                ) : (
                                    <i
                                        style={{
                                            fontSize: "24px",
                                            color: "#FCEA65",
                                        }}
                                        className="fa"
                                    >
                                        &#xf128;
                                    </i>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <hr />
            </div>
        );
    });

    return (
        <>
            {!error.isFound && (
                <div className={`quiz${props.darkMode ? " dark" : ""}`}>
                    <div>{questionElements}</div>
                    {!isFinished && (
                        <button
                            type="button"
                            onClick={submit}
                            className="start-page-btn"
                        >
                            Check answers
                        </button>
                    )}
                    {isFinished && (
                        <div
                            className={`finished${
                                props.darkMode ? " dark" : ""
                            }`}
                        >
                            <p>
                                You scored {correctAnswersNo}/
                                {quizQuestions.length} correct answer
                            </p>
                            <button
                                type="button"
                                onClick={playAgain}
                                className="start-page-btn"
                            >
                                Play again
                            </button>
                            {correctAnswersNo === quizQuestions.length && (
                                <Confetti
                                    width={dimentions[0] - 10}
                                    height={dimentions[1]}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
            {error.isFound && (
                <div
                    className={`error-message${props.darkMode ? " dark" : ""}`}
                >
                    <div className="question-head">{showError()}</div>
                    <button
                        type="button"
                        onClick={playAgain}
                        className="start-page-btn"
                    >
                        Return to menu
                    </button>
                </div>
            )}
        </>
    );
}

export default QuizPage;
