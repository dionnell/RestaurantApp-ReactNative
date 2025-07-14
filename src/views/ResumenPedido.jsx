import React, { useContext, useEffect } from 'react'
import { PedidoContext } from '../context/pedido/pedidoContext'
import { useNavigation } from '@react-navigation/native'
import { Alert, FlatList, Image, StyleSheet, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Button, IconButton, Text } from 'react-native-paper'
import { db } from '../firebase/firebase'
import { addDoc, collection } from 'firebase/firestore'

export const ResumenPedido = () => {

  const navigation = useNavigation()

  //context de pedido
  const { pedido, mostrarResumen, total, eliminarProducto, pedidoRealizado } = useContext(PedidoContext)
  
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

  //Redireccionar a Progreso del pedido
  const progresoPedido = () => {
    Alert.alert(
      '¿Desea confirmar su pedido?',
      'Una vez confimado el pedido no se puede cancelar',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async() => {
            //Crear el objeto del pedido
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido, //esto es un array
              creado: Date.now()
            }

            //Escribir en firebase
            try {
              const ordenFinalizado = await addDoc(collection(db, 'Ordenes'), pedidoObj)
              pedidoRealizado(ordenFinalizado.id)
              //Navegar al Progreso
              navigation.navigate('ProgresoPedido')
            } catch (error) {
              console.log(error)
            }
            
          }
        }
      ]
    )
  }

  //eliminar un pedido del arreglo
  const confirmarEliminacion = (id) => {
    Alert.alert(
      '¿Desea Eliminar este elemento de su pedido?',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            //Eliminar del state
            eliminarProducto(id)

            //calcular
          }
        }
      ]
    )
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
                  numberOfLines={2}
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
              <View style={[globalStyles.precioItem, {alignItems: 'center', minWidth: '5%'}]}>
                <IconButton
                  icon='trash-can'
                  size={30}
                  iconColor='#ff0c0c'
                  animated={true}
                  onPress={() => confirmarEliminacion(item.item.id)}
                />
              </View>
            </View>
          )}
        />

        <Text style={[globalStyles.titulo, {color:'#000', fontSize: 20}]}>
          Total a Pagar: ${total}
        </Text>
        <View style={[globalStyles.contenedorRow, {justifyContent:'space-between'}]}>
          <View style={styles.contenedorBoton}>
            <Button
              onPress={() => navigation.navigate('MenuRestaurant')}
              style={[globalStyles.boton, {marginBottom: 20, backgroundColor:'#000'}]}
              rippleColor={'#3b3b3b'}
            >
              <Text
                variant='titleSmall'
                style={[globalStyles.botonTexto,{color:'#fff'}]}
              >Seguir Pidiendo</Text>
            </Button>
          </View>
          <View style={styles.contenedorBoton}>
            <Button
              onPress={progresoPedido}
              style={[globalStyles.boton, {marginBottom: 20}]}
              rippleColor={'#ffdb11'}
              textColor='#000'
            >
              <Text
                variant='titleSmall'
                style={globalStyles.botonTexto}
              >Pedir</Text>
            </Button>
          </View>
        </View>
        
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
  contenedorBoton: {
    flex: 1,
    minWidth: '40%',
    padding: 10,
  }
  
})