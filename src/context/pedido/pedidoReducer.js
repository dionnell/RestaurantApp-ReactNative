import { SELECCIONAR_PRODUCTO } from "../firebase/types"

export function reducerPedido(state, action)  {
    switch(action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                platillo: action.payload
            }

        default:
            return state
    }

}