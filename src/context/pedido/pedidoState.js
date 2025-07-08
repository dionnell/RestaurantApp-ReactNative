import { useReducer } from "react"
import { reducerPedido } from "./pedidoReducer"
import { PedidoContext } from "./pedidoContext"

export function PedidoState(props) {

    //crear state inicial
    const initialState = {
        pedido: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(reducerPedido, initialState)

    return (
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}