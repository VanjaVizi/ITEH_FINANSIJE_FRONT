import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./LoginPage.css";
import TextInput from "../components/TextInput";
import FileInput from "../components/FileInput";
import PrimaryButton from "../components/PrimaryButton";

const Register = () => {
  const navigate = useNavigate();

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [slika, setSlika] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSlika(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("ime", ime);
      formData.append("prezime", prezime);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);

      if (slika) {
        formData.append("slika", slika);
      }

      const res = await api.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { message } = res.data;

      setInfo(
        message || "Registracija uspešna. Proverite email i verifikujte nalog."
      );
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error(err);
      setLoading(false);

      if (err.response) {
        if (err.response.status === 422) {
          const errors = err.response.data?.errors || {};
          const firstKey = Object.keys(errors)[0];
          const firstMsg = firstKey ? errors[firstKey][0] : null;
          setError(
            firstMsg || "Validacija nije prošla. Proverite uneta polja."
          );
        } else {
          setError("Došlo je do greške. Pokušajte ponovo.");
        }
      } else {
        setError("Server nije dostupan. Proverite konekciju.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Registracija na FinTrack</h1>
        <p className="auth-subtitle">
          Napravite nalog i počnite da pratite svoje prihode, troškove i
          novčanike na jednom mestu.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <TextInput
            id="ime"
            label="Ime"
            placeholder="Unesite ime"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
          />

          <TextInput
            id="prezime"
            label="Prezime"
            placeholder="Unesite prezime"
            value={prezime}
            onChange={(e) => setPrezime(e.target.value)}
            required
          />

          <TextInput
            id="email"
            label="Email adresa"
            type="email"
            placeholder="ime.prezime@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <TextInput
            id="password"
            label="Lozinka"
            type="password"
            placeholder="Unesite lozinku (min 6 karaktera)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
              showPasswordToggle={true}
            required
          />

          <TextInput
            id="password_confirmation"
            label="Potvrda lozinke"
            type="password"
            placeholder="Ponovo unesite lozinku"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="new-password"
              showPasswordToggle={true}
            required
          />

          <FileInput
            id="slika"
            label="Profilna slika (opciono)"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            hint="Dozvoljeni formati: JPG, JPEG, PNG. Maksimalno 2MB."
          />

          {error && <div className="auth-alert auth-alert-error">{error}</div>}
          {info && <div className="auth-alert auth-alert-info">{info}</div>}

          <PrimaryButton
            type="submit"
            loading={loading}
            loadingText="Registracija..."
          >
            Registruj se
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
