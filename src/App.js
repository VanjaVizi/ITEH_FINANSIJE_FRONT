 
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pocetna from './pages/Pocetna';
import { LoginPage } from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MojeFinansije from './pages/MojeFinansije';
function App() {

  
   
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
              <Route path="/" element={<Pocetna />} />
              <Route path="/login" element={<LoginPage />} />

               <Route path="/mojefinansije" element={<MojeFinansije />} />


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
