import { Activity } from "../types"


//Este sera un type que va a describir lo que pasara en 
//activitiReducer
export type ActivityAction =
    {
        type: 'save-activity', //El type describe que es lo que esta sucediendo
        payload: { newActivity: Activity }//Son los datos que se van a agregar al state
    } |
    {
        type: 'set-activeId', //El type describe que es lo que esta sucediendo
        payload: { id: Activity['id'] }//Son los datos que se van a agregar al state
    } |
    {
        type: 'delete-activity', //El type describe que es lo que esta sucediendo
        payload: { id: Activity['id'] }//Son los datos que se van a agregar al state
    } |
    {
        type: 'restart-app',
    }

//Este se usara para el initialState
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id'],
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}


//Estado inicial con el que comenzara el reducer
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}


//Este conecta ActivityState con el initialState
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityAction,
) => {

    if (action.type === 'save-activity') {
        //Este codigo maneja la logica para actualizar el state
        let updatedActivities: Activity[] = []
        if (state.activeId) {
            updatedActivities = [...state.activities.map(activity => activity.id === state.activeId ?
                action.payload.newActivity : activity)]

        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: '',
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activity') {
        return {
            ...state,
            //Tomamos todo lo que hay en el payload menos el que vamos a eliminar
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}
