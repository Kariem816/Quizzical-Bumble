import React from "react"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"

const DETAILS_LOCAL_KEY = "quizzical.bumble.details"

function App() {
  const [quizState, setQuizState] = React.useState(false)
  const [quizDetails, setQuizDetails] = React.useState(
    JSON.parse(localStorage.getItem(DETAILS_LOCAL_KEY)) ||
    {
      number: 10,
      category: "any",
      difficulty: "any",
      type: "any",
    }
  )

  function toggleQuizState() {
    setQuizState(prevState => !prevState)
  }

  return (
    <>
      <main>
        {
          !quizState &&
          <StartPage
            handleClick={toggleQuizState}
            quizDetails={quizDetails}
            setQuizDetails={setQuizDetails}
          />
        }

        {
          quizState &&
          <QuizPage
            details={quizDetails}
            handleClick={toggleQuizState}
          />
        }
      </main>
    </>
  )
}

export default App
