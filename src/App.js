 
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pocetna from './pages/Pocetna';
import { LoginPage } from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MojeFinansije from './pages/MojeFinansije';
import Register from './pages/Register'; 
import MojiNovcanici from './pages/MojiNovcanici';
function App() {

  
   
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
              <Route path="/" element={<Pocetna />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />


               <Route path="/mojefinansije" element={<MojeFinansije />} />
               <Route path="/mojinovcanici" element={<MojiNovcanici />} />
 


          {/* <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          
          */}
        </Routes>
         <Footer /> 
      </BrowserRouter>




    </div>
  );
}

export default App;
