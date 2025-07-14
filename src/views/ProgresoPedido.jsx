import React, {useState, useEffect, useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { PedidoContext } from '../context/pedido/pedidoContext'

export const ProgresoPedido = () => {

  const {idpedido} = useContext(PedidoContext)
  return (
    <>
    </>
  )
}
