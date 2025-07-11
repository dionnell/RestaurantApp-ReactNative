import { CONFIRMAR_ORDENAR_PLATILLO, SELECCIONAR_PRODUCTO } from "../firebase/types"

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

        default:
            return state
    }

}