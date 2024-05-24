import DarkModeButton from "./components/DarkModeButton"
import Form from "./components/Form"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList"
import { CalorieTracker } from "./components/CalorieTracker"

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const restartApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className=" sticky top-0 z-50 border-b-2 bg-lime-600  py-3 dark:bg-black">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className=" text-lg text-center ml-10 md:ml-0 font-bold text-slate-50 uppercase">Contador De Calorias</h1>

          <button
            className=" bg-orange-500 hidden md:flex mr-16 hover:bg-orange-600 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!restartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>

        </div>



        <div className=" absolute right-5 top-2">
          <DarkModeButton />
        </div>
      </header>

      <section className=" bg-lime-500 dark:bg-black py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>


      <section className=" bg-gray-800 py-10">
        <div className=" max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>

      <section>

        <footer className="fixed bottom-0 w-full flex justify-center items-center py-5" >

          <button
            className=" bg-red-500 hover:bg-red-600 md:hidden p-2 font-bold uppercase w-1/2 text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!restartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>

        </footer>


      </section>



    </>
  )
}

export default App
