import React, { useContext, useEffect } from 'react'
import { PedidoContext } from '../context/pedido/pedidoContext'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Text } from 'react-native-paper'

export const ResumenPedido = () => {

  //context de pedido
  const { pedido, mostrarResumen, total } = useContext(PedidoContext)
  
  useEffect(() => {
    calcularTotal()
  }, [pedido])

  const calcularTotal = () => {
    let nuevoTotal = 0
    nuevoTotal = pedido.reduce( (nuevoTotal, articulo) => 
      nuevoTotal + articulo.total, 0
    )
    
    mostrarResumen(nuevoTotal)
  }
  
   
  return (
    <View style={globalStyles.contenedor}>
      <View style={globalStyles.contenido}>
        <Text style={[globalStyles.titulo, {color:'#000', marginTop: 30}]} variant='titleLarge'>
          Resumen Pedido
        </Text>
        <FlatList
          data={pedido}
          contentContainerStyle={{backgroundColor:'#e3e3e3'}}
          keyExtractor={ pedido => (pedido.id) }
          renderItem={ (item) => (
            <View style={globalStyles.contenedorRow}>
              <View style={[globalStyles.imagenItem]} >
                <Image 
                  source={{uri: item.item.imagen}}
                  style={styles.imagenItem} 
                />
              </View>
              <View style={[globalStyles.precioItem, {alignItems: 'flex-start', minWidth: '40%'}]}>
                <Text 
                  variant="titleMedium" 
                  style={styles.precio}
                >{item.item.nombre}</Text>
                <Text 
                  variant="titleSmall" 
                  style={[styles.precio, {fontWeight: 600}]}
                >Cantidad: {item.item.cantidad}</Text>
                <Text 
                  variant="titleSmall" 
                  style={[styles.precio, {fontWeight: 600}]}
                >Precio Unid: $ {item.item.precio}</Text>
                <Text 
                  variant="titleSmall" 
                  style={[styles.precio, {fontWeight: 600}]}
                >Precio Total: $ {item.item.total}</Text>
              </View>
            </View>
          )}
        />

        <Text style={[globalStyles.titulo, {color:'#000', fontSize: 20}]}>
          Total a Pagar: ${total}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagenItem: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10
  },
  precio: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold'
  },
  
})