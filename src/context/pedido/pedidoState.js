import { useReducer } from "react"
import { reducerPedido } from "./pedidoReducer"
import { PedidoContext } from "./pedidoContext"
import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO_CARRITO, PEDIDO_ORDENADO } from "../firebase/types"

export function PedidoState(props) {

    //crear state inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idpedido: ''
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

    //Eliminar un articulo del carrito
    const eliminarProducto = (id) => {
        dispatch({
            type: ELIMINAR_PRODUCTO_CARRITO,
            payload: id
        })
    }

    const pedidoRealizado = (id) => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }
    return (
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idpedido: state.idpedido,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}