import { useReducer } from "react"
import { db } from "../../firebase/firebase"
import { FirebaseContext } from "./firebaseContext"
import { reducerFirebase } from "./firebaseReducer"


export function FirebaseState(props) {

    //crear state inicial
    const initialState = {
        menu: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(reducerFirebase, initialState)

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                db
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}