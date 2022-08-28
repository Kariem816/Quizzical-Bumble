import React from "react"
import Settings from "./Settings"

export default function StartPage(props) {
    const [showSettings, setShowSettings] = React.useState(false)

    return (
        <div className="start-page">
            <h1
                className="start-page-title"
            >
                Quizzical
            </h1>
            <p
                className="start-page-description"
            >
                Try to Answer as many questions as you can
            </p>
            <div className="start-page-start">
                <button
                    type="button"
                    onClick={props.handleClick}
                    className="start-page-btn"
                >
                    Start quiz
                </button>
                <i
                    style={{ fontSize: "40px" }}
                    className="fa"
                    onClick={() => setShowSettings(true)}
                >
                    &#xf013;
                </i>
            </div>
            {
                showSettings &&
                <Settings
                    handleClick={() => setShowSettings(false)}
                    quizDetails={props.quizDetails}
                    setQuizDetails={props.setQuizDetails}
                />
            }
        </div>
    )
}