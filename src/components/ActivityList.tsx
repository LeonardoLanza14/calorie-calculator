import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { FaAppleAlt, FaRunning } from "react-icons/fa";
import { HiOutlinePencilAlt, HiOutlineXCircle } from "react-icons/hi";
import { ActivityAction } from "../reducers/activityReducer";

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityAction>

}


const ActivityList = ({ activities, dispatch }: ActivityListProps) => {

    //Forma dificil de poner la categoria:
    const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => (cat.id === category ? cat.name : ''))
        , [activities])

    return (
        <>

            <h2 className=" text-4xl font-bold text-slate-800 dark:text-white uppercase text-center">Comida y Actividades</h2>


            {activities.length === 0 ? <p className=" text-center dark:text-white font-medium my-5">No hay actividades aún...</p> :



                activities.map(activity => (
                    <div key={activity.id} className="px-5 py-10 bg-white rounded-xl dark:bg-transparent border shadow-md mt-5 flex justify-between ">
                        <div className=" space-y-2 relative">
                            <p className={` absolute -top-8 -left-8 px-10 py-2 text-gray-200 rounded-lg uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>

                                {/*Forma facil de poner el nombre de la categoria */}
                                {/*activity.category === 1 ?(
                                <span className="text-2x dark:text-whitel font-bold pt-5">Comida</span>
                            ):(
                                <span className="text-2xl dark:text-white font-bold pt-5">Ejercicio</span>
                            )*/}

                                {/*Forma Dificil */}
                                <span className=" flex justify-between items-center text-center">
                                    {categoryName(+activity.category)}
                                    {activity.category === 1 ? (
                                        <FaAppleAlt className=" ml-2" />

                                    ) : (
                                        <FaRunning className=" ml-2" />
                                    )}
                                </span>
                            </p>

                            <p className=" text-2xl dark:text-white font-bold pt-5">
                                {activity.name}
                            </p>

                            <p className=" font-black text-4xl text-lime-500">
                                {activity.calories} {''}
                                <span>
                                    Calorias
                                </span>
                            </p>
                        </div>

                        <div className=" flex gap-5 items-center">


                            <button
                                onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                            >
                                <HiOutlinePencilAlt
                                    className=" h-8 w-8 text-gray-800 dark:text-white"
                                />

                            </button>

                            <button
                                onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                            >
                                <HiOutlineXCircle
                                    className=" h-8 w-8 text-red-600 dark:text-red-500"
                                />

                            </button>


                        </div>
                    </div>
                ))}

        </>
    )
}

export default ActivityList