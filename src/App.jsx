import React from "react"
import Navbar from "./components/Navbar"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"

const DETAILS_LOCAL_KEY = "quizzical.bumble.details"
const DARKMODE_LOCAL_KEY = "quizzical.bumble.darkmode"
const body = document.body

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
  const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem(DARKMODE_LOCAL_KEY)) || false)

  React.useEffect(() => {
    if (darkMode) {
      body.classList.add("dark")
    } else {
      body.classList.remove("dark")
    }
    localStorage.setItem(DARKMODE_LOCAL_KEY, JSON.stringify(darkMode))
  }, [darkMode])

  function toggleQuizState() {
    setQuizState(prevState => !prevState)
  }

  return (
    <>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prevState => !prevState)}
      />
      <main>
        {
          !quizState &&
          <StartPage
            darkMode={darkMode}
            handleClick={toggleQuizState}
            quizDetails={quizDetails}
            setQuizDetails={setQuizDetails}
          />
        }

        {
          quizState &&
          <QuizPage
            darkMode={darkMode}
            details={quizDetails}
            handleClick={toggleQuizState}
          />
        }
      </main>
    </>
  )
}

export default App
