import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import CanalHome from './canales/CanalHome'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HomeScreen/>}></Route>
        <Route path='/canal/:canalId' element={<CanalHome/>}></Route>
        <Route></Route>
      </Routes>
    </>
  )
}

export default App
