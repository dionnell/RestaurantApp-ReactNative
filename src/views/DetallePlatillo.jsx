import React, { useContext } from 'react'
import { PedidoContext } from '../context/pedido/pedidoContext'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../styles/global'
import { Button, Card, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

export const DetallePlatillo = () => {

  //context de pedido
  const { platillo } = useContext(PedidoContext)
  
  //Hook para redireccionar
  const navigation = useNavigation()
  
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
          </Card.Content>

          <Card.Actions style={style.actions}>
            <Button 
              mode='outlined'
              onPress={() => {navigation.navigate('FormularioPlatillo')}}
            >
              Agregar al pedido
            </Button>
            <Button 
              mode='contained'
              onLongPress={() => {navigation.navigate('MenuRestaurant')}}
            >
              Volver
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
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 10,
    marginTop: 15
  }
})