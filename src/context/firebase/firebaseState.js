import { useReducer } from "react"
import { db } from "../../firebase/firebase"
import { FirebaseContext } from "./firebaseContext"
import { reducerFirebase } from "./firebaseReducer"
import { OBTENER_PRODUCTOS } from './types/index'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"


export function FirebaseState(props) {

    //crear state inicial
    const initialState = {
        menu: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(reducerFirebase, initialState)

    //funcion q se ejecuta para traer los productos
    const obtenerProductos = () => {
        //Consultar BD
        const querySnapshot =  query(collection(db, "productos"), where('existencia', '==', true), orderBy("categoria"))
        onSnapshot(querySnapshot, manejarSnapshot)

        function manejarSnapshot(snapshot) {
            let platillos = snapshot.docs.map(doc => {
                return {
                  id: doc.id,
                  ...doc.data()
                }
            })

            //Tenemos resultados
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: platillos
            })
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                db,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}