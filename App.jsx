import 'react-native-gesture-handler'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

//Views
import { NuevaOrden } from './src/views/NuevaOrden';
import { Menu } from './src/views/Menu';
import { DetallePlatillo } from './src/views/DetallePlatillo';
import { FormularioPlatillo } from './src/views/FormularioPlatillo';
import { ResumenPedido } from './src/views/ResumenPedido';
import { ProgresoPedido } from './src/views/ProgresoPedido';

//context
import { FirebaseState } from './src/context/firebase/firebaseState';
import { PedidoState } from './src/context/pedido/pedidoState';
import { DefaultTheme, PaperProvider } from 'react-native-paper'

const Stack = createStackNavigator()

const App = () => {

  return (
    <>
      <FirebaseState>
        <PedidoState>
          <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00'
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            >
              <Stack.Screen 
                name='NuevaOrden'
                component={NuevaOrden}
                options={{
                  title: 'Nueva Orden'
                }}
              />
              <Stack.Screen 
                name='Menu'
                component={Menu}
                options={{
                  title: 'Nuestro Menu'
                }}
              />
              <Stack.Screen 
                name='DetallePlatillo'
                component={DetallePlatillo}
                options={{
                  title: 'Detalle Platillo'
                }}
              />
              <Stack.Screen 
                name='FormularioPlatillo'
                component={FormularioPlatillo}
                options={{
                  title: 'Ordenar Platillo'
                }}
              />
              <Stack.Screen 
                name='ResumenPedido'
                component={ResumenPedido}
                options={{
                  title: 'Resumen Pedido'
                }}
              />
              <Stack.Screen 
                name='ProgresoPedido'
                component={ProgresoPedido}
                options={{
                  title: 'Progreso del Pedido'
                }}
              />

            </Stack.Navigator>
          </NavigationContainer>
          </PaperProvider>
        </PedidoState> 
      </FirebaseState>
    </>
  );
}


export default App;
