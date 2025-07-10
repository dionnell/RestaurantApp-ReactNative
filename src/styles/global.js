import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    contenedorRow: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: 5,
        minHeight: 90
    },
    contenido: {
        marginHorizontal: '2.5%',
        flex: 1
    },
    boton: {
        backgroundColor: '#FFDA00',
        borderRadius: 15
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000'
    },
    imagenItem: {
        flex: 1,
        minWidth: '20%',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    platilloItem: {
        flex: 1,
        minWidth: '30%',
        backgroundColor: '#f0f0f0',
    },
    precioItem: {
        flex: 1,
        minWidth: '15%',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }
})