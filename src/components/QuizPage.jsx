import React from "react";
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"
import decode64Code from "../Base64Decoder"
import randomize from "../Randomizer";

function QuizPage(props) {
    const [questions, setQuestions] = React.useState([])
    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [error, setError] = React.useState({ isFound: false, errorCode: "" })


    React.useEffect(() => {
        let isCancelled = false
        let text = `https://opentdb.com/api.php?amount=${props.details.number}`
        if (props.details.category !== "any") text += `&category=${props.details.category}`
        if (props.details.difficulty !== "any") text += `&difficulty=${props.details.difficulty}`
        if (props.details.type !== "any") text += `&type=${props.details.type}`
        text += `&encode=base64`
         if (!isCancelled) {
            fetch(text)
                .then(res => res.json())
                .then(data => {
                    if (data.response_code === 0)
                        setQuestions(data.results)
                    else setError({ isFound: true, errorCode: data.response_code })
                })
            window.addEventListener('resize', setDimensions([window.innerWidth, window.innerHeight]))
        }

        return () => {
            isCancelled = true
        }
    }, [])

    React.useEffect(() => {
        setQuizQuestions(questions.map(question => ({
            ...question,
            choices: randomize([...question.incorrect_answers, question.correct_answer])
        })))
    }, [questions])

    const [isFinished, setIsFinished] = React.useState(false)
    const [correctAnswersNo, setCorrectAnswersNo] = React.useState(0)
    const [quizAnswers, setQuizAnswers] = React.useState({})
    const [dimentions, setDimensions] = React.useState([window.innerWidth, window.innerHeight])


    function handleChange(e) {
        const { name, value } = e.target
        if (!isFinished)
            setQuizAnswers(prevQuizData => {
                return {
                    ...prevQuizData,
                    [name]: value
                }
            })
    }

    function submit() {
        for (let i = 0; i < quizQuestions.length; i++) {
            if (quizQuestions[i].correct_answer === quizAnswers[i])
                setCorrectAnswersNo(prevNumber => prevNumber + 1)
        }
        setIsFinished(prevState => !prevState)
    }

    function playAgain() {
        props.handleClick()
    }

    const questionElements = quizQuestions.map((question, qIndex) => {
        const answerElements = question.choices.map((choice, cIndex) => {
            let labelClassName = ""
            if (isFinished) {
                if (question.correct_answer === choice) {
                    labelClassName = "choice-correct"
                } else if (quizAnswers[qIndex] === choice) {
                    labelClassName = "choice-wrong"
                } else {
                    labelClassName = "choice"
                }
            } else {
                labelClassName = "choice"
            }

            return (
                <div
                    key={cIndex}
                >
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
            )
        })
        return (
            <div
                key={qIndex}
                className="question"
            >
                <div className="question-head">{decode64Code(question.question)}</div>
                <div className="question-choices">
                    {answerElements}
                </div>
                <hr />
            </div>
        )
    })

    return (
        <>
            {
                !error.isFound &&
                <div
                    className="quiz"
                >
                    <div>
                        {questionElements}
                    </div>
                    {
                        !isFinished &&
                        <button
                            type="button"
                            onClick={submit}
                            className="start-page-btn"
                        >
                            Check answers
                        </button>
                    }
                    {
                        isFinished &&
                        <div className="finished">
                            <p>You scored {correctAnswersNo}/{quizQuestions.length} correct answer</p>
                            <button
                                type="button"
                                onClick={playAgain}
                                className="start-page-btn"
                            >
                                Play again
                            </button>
                            {
                                correctAnswersNo === quizQuestions.length &&
                                <Confetti
                                    width={dimentions[0] - 10}
                                    height={dimentions[1]}
                                />
                            }
                        </div>
                    }
                </div>
            }
            {
                error.isFound &&
                <div className="error-message">
                    {
                        error.errorCode === 1 &&
                        <div className="question-head">
                            The server couldn't find enough questions. Try to choose less filters or decrease the number of questions
                        </div>
                    }
                    <button
                        type="button"
                        onClick={playAgain}
                        className="start-page-btn"
                    >
                        Return to menu
                    </button>
                </div>
            }
        </>
    )
}

export default QuizPage