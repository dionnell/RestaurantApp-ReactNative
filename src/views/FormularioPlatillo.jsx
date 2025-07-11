import React, { useState } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Button, Icon, Text, TextInput } from 'react-native-paper'

export const FormularioPlatillo = () => {

  const [cantidad, setCantidad] = useState(1)

  const cantidadMinus = () => {
    if(cantidad>1) {
      setCantidad(cantidad-1)
    }
  }

  return (
    <View style={globalStyles.contenedor}>
      <View style={globalStyles.contenido}>
        <View>
          <Text variant='titleLarge' style={[globalStyles.titulo, {color:'#000'}]}>Cantidad</Text>

          <View style={globalStyles.contenedorRow}>
            <View>
              <Button
                style={{height: 40, justifyContent: 'center', marginTop: 5}}
                mode='contained'
                onPress={() => cantidadMinus()}
              >
                <Icon
                  source='minus'
                  size={20}
                  color='#000'
                />
              </Button>
            </View>
            <View
              style={{backgroundColor:'#ebebeb', borderRadius:15, borderColor:'#979797', borderWidth: 1}}
            >
              <TextInput 
                mode='outlined'
                disabled={true}
                textAlign='center'
                textColor='#000'
                contentStyle={{backgroundColor:'#ebebeb', paddingHorizontal: 25}}
                style={{fontSize: 20 }}
                value={cantidad.toString()}
              />
            </View>
            <View>
              <Button
                style={{height: 40, justifyContent: 'center', marginTop: 5}}
                mode='contained'
                onPress={() => setCantidad(cantidad+1)}
              >
                <Icon
                  source='plus'
                  size={20}
                  color='#000'
                />
              </Button>
            </View>

          </View>
        </View>
      </View>
    </View>
  )
}
