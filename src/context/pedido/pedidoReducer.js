import { CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, SELECCIONAR_PRODUCTO } from "../firebase/types"

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

        default:
            return state
    }

}