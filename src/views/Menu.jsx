import React, {useContext, useEffect} from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { PedidoContext } from '../context/pedido/pedidoContext'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { List, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export const MenuRestaurant = () => {

  //context de Firebase
  const {menu ,obtenerProductos} = useContext(FirebaseContext)

  //context de pedido
  const { seleccionarPlatillo } = useContext(PedidoContext)

  //Hook para redireccionar
  const navigation = useNavigation()

  useEffect(() => {
    obtenerProductos()
  }, [])

  const mostrarHeading = (categoria, i) => {

    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria

      if(categoriaAnterior !== categoria) {
        return(
          <View>
            <Text 
              variant="headlineSmall"
              style={styles.separador}
            >
              {categoria}</Text>
          </View>
        )
      }
    } else {
      return(
        <View>
          <Text 
            variant="headlineSmall"
            style={styles.separador}
          >
            {categoria}</Text>
        </View>
      )
    }
    
  }

  return (
    <View style={globalStyles.contenedor}>
      <View style={{backgroundColor: '#FFF'}}>
        <FlatList
          data={menu}
          contentContainerStyle={{backgroundColor:'#e3e3e3'}}
          keyExtractor={ menu => (menu.id) }
          renderItem={ (item) => (
            <View>
              {mostrarHeading(item.item.categoria, item.index)}
              <Pressable 
                style={globalStyles.contenedorRow}
                onLongPress={() => {
                  seleccionarPlatillo(item.item)
                  navigation.navigate('DetallePlatillo')
                }}
              >
                <View style={[globalStyles.imagenItem]} >
                  <Image 
                    source={{uri: item.item.imagen}}
                    style={styles.imagenItem} 
                  />
                </View>
                <List.Item
                  style={globalStyles.platilloItem}
                  title={item.item.nombre}
                  titleStyle={{color: '#000', fontWeight: '700', fontSize: 16}}
                  titleNumberOfLines={2}
                  description={item.item.descripcion}
                  descriptionStyle={{color: '#7a7a7a', fontWeight: '600', fontSize: 12}}
                  descriptionNumberOfLines={3}
                />
                <View style={globalStyles.precioItem}>
                  <Text 
                    variant="titleMedium" 
                    style={styles.precio}
                  >$ {item.item.precio}</Text>
                </View>
              </Pressable>
            </View>
          )}
        />    
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagenItem: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10
  },
  precio: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold'
  },
  separador: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#ffda00',
    textTransform: 'uppercase',
    fontSize: 16
  }
})
