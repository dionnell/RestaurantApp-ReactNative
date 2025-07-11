import { useReducer } from "react"
import { reducerPedido } from "./pedidoReducer"
import { PedidoContext } from "./pedidoContext"
import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO } from "../firebase/types"

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

    //cuando el usuario confirma un platillo 
    const guardarPedido = pedido => {

        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                seleccionarPlatillo,
                guardarPedido
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}