import React, { useContext } from 'react'
import { Button, Text } from 'react-native-paper'
import { globalStyles } from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import { PedidoContext } from '../context/pedido/pedidoContext'

export const ButtonResumen = () => {

    const navigation = useNavigation()

    //Leer el objeto de pedido
    const {pedido} = useContext(PedidoContext)

    if(pedido.length === 0) return null

  return (
    <Button 
        style={globalStyles.boton}
        onPress={() => navigation.navigate('ResumenPedido')}
    >
        <Text 
            style={globalStyles.botonTexto}
        >Ir a Pedido</Text>
    </Button>
  )
}
