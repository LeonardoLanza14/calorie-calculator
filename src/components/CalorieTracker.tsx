import { useMemo } from "react";
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
    activities: Activity[];
}


export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {



    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ?
        total + activity.calories : total, 0), [activities])

    const caloriesConsum = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ?
        total + activity.calories : total, 0), [activities])

    const totalCalories = useMemo(() => caloriesConsum - caloriesBurned, [activities])

    return (
        <>
            <h2 className=" text-4xl font-black  text-center text-white uppercase ">Resumen de calorias</h2>


            <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay
                    calories={caloriesConsum}
                    text={"Consumidas"}
                />

                <CalorieDisplay
                    calories={caloriesBurned}
                    text={"quemadas"}
                />

                <CalorieDisplay
                    calories={totalCalories}
                    text={"Diferencia"}
                />
            </div>


        </>
    )
}
