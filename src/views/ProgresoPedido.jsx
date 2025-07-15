import React, {useState, useEffect, useContext} from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { PedidoContext } from '../context/pedido/pedidoContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { globalStyles } from '../styles/global'
import { Button, List, Text } from 'react-native-paper'
import Countdown from 'react-countdown'

export const ProgresoPedido = () => {

  const navigation = useNavigation()

  const {idpedido, ordenTeminada} = useContext(PedidoContext)
  const [tiempo, setTiempo] = useState(0)
  const [completado, setCompletado] = useState(false)
  const [orden, setOrden] = useState([])

  useEffect(() => {
    const obtenerProducto = () =>{
      const querySnapshot =  doc(db, "Ordenes", idpedido) 
      onSnapshot(querySnapshot, (doc) => {
        setTiempo(doc.data().tiempoentrega)
        setCompletado(doc.data().completado)
        setOrden(doc.data().orden)
      })
    }
    obtenerProducto()
  }, [])
  
  //Muestra el countDown en la pantalla
  const renderer = ({minutes, seconds}) => {
    return(
      <Text style={styles.tiempo}>{minutes}:{seconds}</Text>
    )
  }
  
  //Terminar Orden y Redireccionar
  const ordenFinalizada = () => {
    ordenTeminada(idpedido)
    navigation.navigate('NuevaOrden')
  }

  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, {marginTop: 30}]}>
        {tiempo === 0 && (
          <>
            <Text variant='headlineSmall' style={{textAlign: 'center', color: '#000', marginBottom:20}}>Hemos Recibido tu Orden de:</Text>
            <View style={{height: 'auto', maxHeight: 450, borderTopWidth: 1, borderBottomWidth: 1, borderColor:'#e3e3e3'}}>
              <FlatList
                data={orden}
                contentContainerStyle={{backgroundColor:'#e3e3e3', Height: 20}}
                keyExtractor={ orden => (orden.id) }
                renderItem={ (item) =>
                  <View style={[globalStyles.contenedorRow]}>
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
                      description={'cantidad: ' + item.item.cantidad}
                      descriptionStyle={{color: '#7a7a7a', fontWeight: '600', fontSize: 12}}
                      descriptionNumberOfLines={3}
                    />
                  </View>
                }
              />
            </View>
            <Text variant='headlineSmall' style={{textAlign: 'center', color: '#000', marginTop: 20}}>Estamos calculando el tiempo de entrega</Text>
          </>
        )}
        {!completado && tiempo > 0 && (
          <>
            <Text variant='headlineSmall' style={{textAlign: 'center', color: '#000', marginBottom:20, fontWeight: '600'}}>Su Orden</Text>
            <View style={{height: 'auto', maxHeight: 450, borderTopWidth: 1, borderBottomWidth: 1, borderColor:'#e3e3e3'}}>
              <FlatList
                data={orden}
                contentContainerStyle={{backgroundColor:'#e3e3e3',  maxHeight: 450}}
                keyExtractor={ orden => (orden.id) }
                renderItem={ (item) =>
                  <View style={[globalStyles.contenedorRow]}>
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
                      description={'cantidad: ' + item.item.cantidad}
                      descriptionStyle={{color: '#7a7a7a', fontWeight: '600', fontSize: 12}}
                      descriptionNumberOfLines={3}
                    />
                  </View>
                }
              />
            </View>
            <Text 
              variant='headlineSmall' 
              style={{textAlign: 'center', color: '#000', marginTop: 20}}
            >estara lista en: </Text>
            <Text>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}

        {completado && (
          <>
            <Text 
              variant='headlineSmall' 
              style={{textAlign: 'center', color: '#000', marginTop: 20, textTransform:'uppercase'}}
            >Orden Lista </Text>
            <Text 
              variant='headlineSmall' 
              style={{textAlign: 'center', color: '#000', marginTop: 20}}
            >Por favor, pase a recoger su pedido </Text>

            <View style={{marginTop:30}}>
              <Button
                style={[globalStyles.boton, {marginBottom: 20}]}
                rippleColor={'#ffdb11'}
                textColor='#000'
                onPress={ordenFinalizada }
              >
                <Text
                  variant='titleMedium'
                  style={[globalStyles.botonTexto]}
                >Seguir Pidiendo</Text>
              </Button>
            </View>
            
          </>
        )}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 70,
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    color: '#000'
  },
  imagenItem: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10
  },
})