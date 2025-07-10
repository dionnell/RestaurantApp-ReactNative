import React, {useContext, useEffect} from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { List, Text } from 'react-native-paper'


export const MenuRestaurant = () => {

  //context de Firebase
  const {menu ,obtenerProductos} = useContext(FirebaseContext)

  useEffect(() => {
    obtenerProductos()
  }, [])

  return (
    <View style={globalStyles.contenedor}>
      <View style={{backgroundColor: '#FFF'}}>
        <FlatList
          data={menu}
          keyExtractor={ menu => (menu.id) }
          renderItem={ (item) => (
            <View style={globalStyles.contenedorRow}>
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
  }
})
