import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Update from './Update'
import NewData from './NewData'


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/new' element={<NewData />}/>
        <Route path='/update/:id' element={<Update />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App