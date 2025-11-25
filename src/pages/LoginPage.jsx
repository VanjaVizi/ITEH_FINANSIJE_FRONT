import React, { useState } from 'react'
import './LoginPage.css'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
export const LoginPage = () => {

    const navigate = useNavigate();

  const [email, setEmail] = useState("ylabadie@example.net");
  const [password, setPassword] = useState("password");


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");



      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setInfo("");
        try{
            const res= await api.post('/login', { email, password })
            const { token, user, message } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));


            setInfo(message || "Uspešno ste prijavljeni."); 
            setLoading(false); 
            setTimeout(() => {
                navigate("/mojefinansije");
            }, 800); 

        }catch(err){
             setLoading(false);  
            console.log(err);
            if(err.response.status===401){
                setError("Neispravna email adresa ili lozinka.");
            }else if (err.response.status === 422) {
            setError("Molimo popunite ispravno sva polja.");
            } else {
            setError("Došlo je do greške. Pokušajte ponovo.");
            }
 
        }

   
      }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Prijava na FinTrack</h1>
        <p className="auth-subtitle">
          Uloguj se i nastavi da pratiš svoje troškove, prihode i novčanike.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email adresa</label>
            <input
              id="email"
              type="email"
              placeholder="ime.prezime@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Lozinka</label>
            <input
              id="password"
              type="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div> 
            {info && <div className="auth-alert auth-alert-info">{info}</div>}
             {error && <div className="auth-alert auth-alert-error">{error}</div>}
          <button
            type="submit"
            className="btn-primary auth-submit"
            disabled={loading}
          >
           {loading ? "Prijavljivanje..." : "Prijavi se"}
          </button>

          <div className="auth-extra">
            <span>Zaboravili ste lozinku?</span>
            <span className="auth-extra-link">
              Obratite se opciji za reset lozinke.
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
