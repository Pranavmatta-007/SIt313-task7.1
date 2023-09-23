import './App.css';
import { Routes, Route } from 'react-router-dom';
import FormFTN from './components/form';
import LoginF from './components/Login';
import Sign from './components/Signup';
import { Signed } from './components/SIgned';
import { db } from './firebase';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<FormFTN/>}></Route>
        <Route path='/Login' element={<LoginF db ={db}/>}></Route>
        <Route path='/Login/Sign-up' element={<Sign/>}></Route>
        <Route path='/Login/Signed-in' element={<Signed/>}></Route>
      </Routes>

    </>
  );
}

export default App;
