import { CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, SELECCIONAR_PRODUCTO, ELIMINAR_PRODUCTO_CARRITO, PEDIDO_ORDENADO, ORDEN_TERMINADA } from "../firebase/types"

export function reducerPedido(state, action)  {
    switch(action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                platillo: action.payload
            }
        
        case CONFIRMAR_ORDENAR_PLATILLO:
            return {
                ...state,
                pedido: [...state.pedido, action.payload]
            }
        case MOSTRAR_RESUMEN: 
            return {
                ...state,
                total: action.payload
            }
        case ELIMINAR_PRODUCTO_CARRITO: 
            return {
                ...state,
                pedido: state.pedido.filter(articulo => articulo.id !== action.payload)
            }
        case PEDIDO_ORDENADO: 
            return {
                ...state,
                idpedido: action.payload
            }
        case ORDEN_TERMINADA: 
            return {
                ...state,
                pedido: [],
                total: 0,
                idpedido: action.payload
            }

        default:
            return state
    }

}