import { useReducer } from "react"
import { reducerPedido } from "./pedidoReducer"
import { PedidoContext } from "./pedidoContext"
import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN } from "../firebase/types"

export function PedidoState(props) {

    //crear state inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
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

    //Muestra el total a pagar en el resumen
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    } 

    return (
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}