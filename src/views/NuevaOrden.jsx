import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { globalStyles } from '../styles/global'
import { useNavigation } from '@react-navigation/native'

export const NuevaOrden = () => {

  const navigation = useNavigation()
  
  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenido]}>
        <Button 
          mode="contained" 
          style={globalStyles.boton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={globalStyles.botonTexto}>
            Crear Nueva Orden
          </Text>
        </Button>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  contenido: {
    justifyContent: 'center',
    flexDirection: 'column'
  }
})