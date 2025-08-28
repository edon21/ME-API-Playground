import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PortfolioForm from './Pages/PortfolioForm'
import ProfileTable from './Pages/ProfileTable'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PortfolioForm />} />
        <Route path='/profileTable' element={<ProfileTable />} /> 
      </Routes>
    </div>
  )
}

export default App
