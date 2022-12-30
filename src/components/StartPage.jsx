import React from "react";
import Settings from "./Settings";

export default function StartPage(props) {
    const [showSettings, setShowSettings] = React.useState(false);

    return (
        <div className={`start-page${props.darkMode ? " dark" : ""}`}>
            <h1 className="start-page-title">Quizzical</h1>
            <p className="start-page-description">
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
                <button
                    style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                        padding: "0",
                    }}
                    aria-label="settings"
                >
                    <i
                        style={{ fontSize: "40px" }}
                        className="fa"
                        onClick={() => setShowSettings(true)}
                    >
                        &#xf013;
                    </i>
                </button>
            </div>
            <Settings
                darkMode={props.darkMode}
                close={() => setShowSettings(false)}
                quizDetails={props.quizDetails}
                setQuizDetails={props.setQuizDetails}
                isShown={showSettings}
                aria-hidden={!showSettings}
            />
        </div>
    );
}
