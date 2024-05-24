import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityAction, ActivityState } from "../reducers/activityReducer"

import { v4 as uuidv4 } from 'uuid'

type FormProps = {
    dispatch: Dispatch<ActivityAction>,
    state: ActivityState
}

const initialStateForm: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}

const Form = ({ dispatch, state }: FormProps) => {

    const [activity, setActivity] = useState<Activity>(initialStateForm)

    useEffect(() => {
        if(state.activeId){

            const seletActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(seletActivity)

        }
    }, [state.activeId])


    // Poder cambiar el valor del select y los inputs del form con datos correctos
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() //Esto previene la accion por defecto

        dispatch({ type: "save-activity", payload: { newActivity: activity } })

        //Reiniciar el formulario
        setActivity({
            ...initialStateForm, //esto se hace para que se reinicie el formulario, pero con un id nuevo
            id: uuidv4(),   //Esto genera un nuevo id, si reiniciamos el formulario sin esto el id sera el mismo siempre
        })
    }


    return (
        <>
            <div
                className="w-full mx-auto relative overflow-hidden z-10 dark:border-white border bg-white dark:bg-transparent p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-orange-500 before:rounded-xl before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-lime-500 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
            >
                <h2 className="text-2xl text-sky-900 dark:text-white font-bold mb-6">Update Your Profile</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-bold  text-gray-600 
                            dark:text-white"
                            htmlFor="category"
                        >
                            Categoria:
                        </label>
                        <select
                            className="mt-1 p-2 w-full font-bold text-gray-700 border rounded-md"
                            name="category"
                            id="category"
                            value={activity.category}
                            onChange={handleChange}
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-sm font-bold text-gray-600 dark:text-white"
                            htmlFor="name"
                        >Actividad</label>
                        <input
                            className="mt-1 p-2 w-full border font-bold text-gray-700 rounded-md"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Comida o ejercicio"
                            value={activity.name}
                            onChange={handleChange}

                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-sm font-bold text-gray-600 dark:text-white"
                            htmlFor="calories"
                        >Calorias:</label>
                        <input
                            className="mt-1 p-2 w-full border font-bold text-gray-700 rounded-md"
                            name="calories"
                            id="calories"
                            type="number"
                            placeholder="Cantidad de calorias"
                            value={activity.calories}
                            onChange={handleChange}


                        />
                    </div>

                    <div className="flex justify-end">
                        <input
                            disabled={!isValidActivity()}
                            className=" disabled:opacity-20 bg-gray-700 dark:bg-white dark:text-black uppercase text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                            type="submit"
                            value={activity.category === 1 ? 'Guardar Cominda' : 'Guardar Ejercicio'}
                        />


                    </div>
                </form>
            </div>

        </>
    )
}

export default Form