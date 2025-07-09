import React, {useContext, useEffect} from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const Menu = () => {

  //context de Firebase
  const {menu ,obtenerProductos} = useContext(FirebaseContext)

  useEffect(() => {
    obtenerProductos()
    
  }, [])

  return (
    <>
    </>
  )
}
