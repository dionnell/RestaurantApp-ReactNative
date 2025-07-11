import { useReducer } from "react"
import { reducerPedido } from "./pedidoReducer"
import { PedidoContext } from "./pedidoContext"
import { SELECCIONAR_PRODUCTO } from "../firebase/types"

export function PedidoState(props) {

    //crear state inicial
    const initialState = {
        pedido: [],
        platillo: null
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(reducerPedido, initialState)

    //Selecciona el producto q el usuario desea ordenar
    const seleccionarPlatillo = (platillo) => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                seleccionarPlatillo
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}