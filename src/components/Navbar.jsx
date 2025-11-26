
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuth, setIsAuth] = useState(false);

  // svaki put kad se promeni ruta, proveri da li postoji token
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsAuth(!!token);
  }, [location]);

  const handleLogout = async () => {
    try {
       
      await api.post("/logout");
    } catch (err) {
      console.error("Greška pri logout-u:", err);
      // čak i ako padne poziv, svejedno ćemo da očistimo storage
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setIsAuth(false);
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="href">
        Pocetna
      </Link>

      {isAuth ? (
        <>
          <Link to="/mojefinansije" className="href">
            Moje finansije
          </Link>
             <Link to="/mojinovcanici" className="href">
            Moji novcanici
          </Link>
          <button
            type="button"
            className="href href-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="href">
            Login
          </Link>
          <Link to="/register" className="href">
            Registracija
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
