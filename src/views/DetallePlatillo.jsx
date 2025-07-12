import React, { useContext, useEffect, useState } from 'react'
import { PedidoContext } from '../context/pedido/pedidoContext'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../styles/global'
import { Button, Card, Icon, Text } from 'react-native-paper'
import { Alert, StyleSheet, View } from 'react-native'

export const DetallePlatillo = () => {

  //state para cantidad
  const [cantidad, setCantidad] = useState(1)
  const [ total, setTotal] = useState(0)

  //context de pedido
  const { platillo, guardarPedido } = useContext(PedidoContext)
  
  //Hook para redireccionar
  const navigation = useNavigation()

  // En cuanto el componente carga, calcular la cantidad a pagar
    useEffect(() => {
        calcularTotal();
    }, [cantidad]);

  // Calcula el total del platillo por su cantidad
  const calcularTotal = () => {
      const totalPagar = platillo.precio * cantidad;
      setTotal(totalPagar);
  }
  
  const cantidadMinus = () => {
    if(cantidad>1) {
      setCantidad(cantidad-1)
    }
  }

  //Confirmar la Orden
  const confirmarOrden = () => {
    Alert.alert(
      '¿Desea confirmar tu pedido?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            //Almacenar el pedido al pedido principal
            const id = platillo.nombre + Date.now().toString(36);
            const pedido = {
              ...platillo,
              cantidad,
              total,
              id
            }
            
            guardarPedido(pedido)

            //Navegar al resumen
            navigation.navigate('ResumenPedido')
          }
        }
      ]
    )
  }
  
  return (
    <View style={[globalStyles.contenedor,style.contenedor]}>
      <View style={globalStyles.contenido}>

        <Card
          mode='contained'
        >
          <Card.Title
            title={platillo.nombre}
            titleNumberOfLines={2}
            titleVariant='titleLarge'
            titleStyle={globalStyles.titulo}
          />
          <Card.Cover 
            source={{ uri: platillo.imagen }}
            style={style.imagen} 
          />
          <Card.Content>
            <Text 
              variant="bodyMedium"
              style={style.textoDescripcion}
            >{platillo.descripcion}</Text>
            <Text 
              variant="bodyMedium"
              style={[style.textoDescripcion, {fontSize: 18}]}
            >Precio: ${platillo.precio}</Text>

            <View style={[globalStyles.contenedorRow, {justifyContent: 'flex-start', minHeight: 40, marginLeft: '-1'}]}>
              <Text variant='titleLarge' style={[globalStyles.titulo, {fontSize: 20, textTransform:'capitalize'}]}>Cantidad</Text>

              <View style={[globalStyles.contenedorRow, {minHeight: 40, marginLeft: 10, alignItems: 'center'}]}>
                <View>
                  <Button
                    style={{height: 40, justifyContent: 'center', marginTop: 5}}
                    mode='contained'
                    onPress={() => cantidadMinus()}
                  >
                    <Icon
                      source='minus'
                      size={15}
                      color='#000'
                    />
                  </Button>
                </View>
                <View
                  style={{backgroundColor:'#ebebeb', borderRadius:15, width:30, marginHorizontal: 5, height: 40, alignItems:'center'}}
                >
                  <Text 
                    style={{fontSize: 20, color: '#000', textAlign:'center', marginTop: 5 }}
                  >{cantidad.toString()}</Text>
                </View>
                <View>
                  <Button
                    style={{height: 40, justifyContent: 'center', marginTop: 5}}
                    mode='contained'
                    onPress={() => setCantidad(cantidad+1)}
                  >
                    <Icon
                      source='plus'
                      size={15}
                      color='#000'
                    />
                  </Button>
                </View>

              </View>
            </View>

          </Card.Content>

          <Card.Actions style={style.actions}>
            <Button 
              mode='contained'
              onPress={confirmarOrden}
            >
              <Text style={{color:'#000'}}>Agregar al pedido {' '}</Text> 
              <Text style={{color:'#434343', fontWeight:'bold'}}>${total}</Text>
            </Button>
            
          </Card.Actions>
        </Card>

      </View>
    </View>
  )
}

const style = StyleSheet.create({
  contenedor: {
    marginTop: 30
  },
  imagen: {
    width: '95%',
    marginHorizontal: 'auto',
    height: 200,
    marginBottom: 15
  },
  textoDescripcion: {
    marginVertical: 15,
    fontSize: 17,
    fontWeight: '700'
  },
  actions: {
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    marginTop: 15
  }
})