import React, { useEffect, useState } from 'react'
import api from '../api/api';
import './MojiNovcanici.css';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import { MdEdit,MdDelete  } from "react-icons/md";
import useMojiNovcanici from '../hooks/useMojiNovcanici';
import useWalletTypes from '../hooks/useWalletTypes';
import useCurrencies from '../hooks/useCurrencies';

 
const getUserFromStorage = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};



const MojiNovcanici = () => {

    const { wallets, setWallets, loading, loadError } = useMojiNovcanici();
    const walletTypes = useWalletTypes();
     const currencies = useCurrencies();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
 
    const [naziv, setNaziv] = useState("");
    const [tip, setTip] = useState("banka");
    const [valuta, setValuta] = useState("RSD");
    const [pocetnoStanje, setPocetnoStanje] = useState("");
    const [trenutnoStanje, setTrenutnoStanje] = useState("");
    const [aktivan, setAktivan] = useState(true);

    const user = getUserFromStorage();


     const [editingId, setEditingId] = useState(null);
  const resetForm = () => {
    setEditingId(null);
    setNaziv("");
    setTip("banka");
    setValuta("RSD");
    setPocetnoStanje("");
    setTrenutnoStanje("");
    setAktivan(true);
    setInfo("");
    setError("");
  };




    const handleSubmit = async (e) => {
         e.preventDefault();
        setError("");
        setInfo("");
         setSaving(true);

        if (!user?.id) {
            setSaving(false);
            setError("Nedostaje korisnik. Ponovo se prijavi na sistem.");
            return;
        }


    const payload = {
        korisnik_id: user.id,
        naziv,
        tip,
        valuta,
        pocetno_stanje: pocetnoStanje === "" ? 0 : Number(pocetnoStanje),
        trenutno_stanje: trenutnoStanje === "" ? 0 : Number(trenutnoStanje),
        aktivan: !!aktivan,
    };

    try{
        if(editingId){
            const res = await api.put(`/novcanici/${editingId}`, payload);
            const updatedWallet =  res.data;
             setWallets((prev) =>
                prev.map((w) => (w.id === editingId ? updatedWallet : w))
            );
            setInfo("Novčanik je uspešno ažuriran.");
        }else{

            const res = await api.post("/novcanici", payload); 
            const noviNovcanik = res.data;
            setWallets((prev) => [...prev, noviNovcanik]);
            setInfo("Novčanik je uspešno dodat.");
        }
        resetForm();
    }catch(err){
        console.error(err);
        setError("Ne mogu da sačuvam novčanik. Pokušaj ponovo.");
        return;
    }finally{    
        setSaving(false);
    }


  }
 const handleEdit = (w) => {
    setEditingId(w.id);
    setNaziv(w.naziv || "");
    setTip(w.tip || "banka");
    setValuta(w.valuta || "RSD");
    setPocetnoStanje(
      typeof w.pocetno_stanje === "number" ? String(w.pocetno_stanje) : ""
    );
    setTrenutnoStanje(
      typeof w.trenutno_stanje === "number" ? String(w.trenutno_stanje) : ""
    );
    setAktivan(!!w.aktivan);
    setInfo("");
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Da li sigurno želiš da obrišeš ovaj novčanik?")) return;

    setError("");
    setInfo("");
    try {
      await api.delete(`/novcanici/${id}`);
      setWallets((prev) => prev.filter((w) => w.id !== id)); 
      setInfo("Novčanik je obrisan.");
    } catch (err) {
      console.error(err);
      setError("Došlo je do greške prilikom brisanja novčanika.");
    }
  };
  return (
      <div className="wallets-page">
        <div className="wallets-inner">
            <header className="wallets-header">
            <h1>Moji novčanici</h1>
            <p>
                Organizuj svoje račune, keš, štednju i kripto na jednom mestu i
                uvek imaj pregled stanja.
            </p>
            </header>
        </div>
        <div className="wallets-layout">
            <section className="wallets-list-section">
            <h2 className="wallets-section-title">Pregled novčanika</h2>
            {loading ? (
              <div className="wallets-placeholder">Učitavanje novčanika...</div>
            ) : wallets.length === 0 ? (
              <div className="wallets-placeholder">
                Trenutno nemaš nijedan novčanik. Dodaj prvi sa desne strane. 
              </div>
            ) : (
              <div className="wallets-list">
                {wallets.map((w) => (
                  <article key={w.id} className="wallet-card">
                    <div className="wallet-card-header">
                      <div>
                        <h3>{w.naziv}</h3>
                        <div className="wallet-card-tags">
                          <span className="wallet-chip wallet-chip-type">
                            {w.tip}
                          </span>
                          <span className="wallet-chip wallet-chip-currency">
                            {w.valuta}
                          </span>
                          <span
                            className={`wallet-chip wallet-chip-status ${
                              w.aktivan ? "wallet-chip-active" : "wallet-chip-inactive"
                            }`}
                          >
                            {w.aktivan ? "Aktivan" : "Neaktivan"}
                          </span>
                        </div>
                      </div>
                      <div className="wallet-card-actions">
                        <button
                          type="button"
                          className="btn-secondary wallet-btn-sm"
                          onClick={() => handleEdit(w)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          type="button"
                          className="btn-secondary wallet-btn-sm wallet-btn-danger"
                          onClick={() => handleDelete(w.id)}
                        >
                          <MdDelete/> 
                        </button>  
                      </div>
                    </div>

                    <div className="wallet-card-body">
                      <div className="wallet-balance">
                        <span>Trenutno stanje</span>
                        <strong>
                          {w.trenutno_stanje} {w.valuta}
                        </strong>
                      </div>
                      <div className="wallet-meta-row">
                        <div className="wallet-meta-item">
                          <span>Početno stanje</span>
                          <span>
                            {w.pocetno_stanje} {w.valuta}
                          </span>
                        </div>
                        <div className="wallet-meta-item">
                          <span>Vlasnik</span>
                          <span>
                            {w.korisnik?.ime && w.korisnik?.prezime
                              ? `${w.korisnik.ime} ${w.korisnik.prezime}`
                              : `ID: ${w.korisnik_id}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
            <section className="wallets-form-section">
            <div className="wallets-form-card">
              <h2 className="wallets-section-title"> 
                {editingId ? "Izmena novčanika" : "Novi novčanik"}
              </h2>
              <p className="wallets-form-subtitle">
                Definiši tip, valutu i početno stanje. Kasnije ćeš transakcijama
                menjati trenutno stanje.
              </p>

              {info && (
                <div className="wallet-alert wallet-alert-info">{info}</div>
              )}
              {error && (
                <div className="wallet-alert wallet-alert-error">{error}</div>
              )}

              <form className="wallet-form" onSubmit={handleSubmit}>
                <TextInput
                  id="naziv"
                  label="Naziv novčanika"
                  placeholder="npr. Tekući račun, Keš, Štednja za more..."
                  value={naziv}
                  onChange={(e) => setNaziv(e.target.value)}
                  required
                />

                <div className="wallet-form-row">
                  <div className="wallet-field">
                    <label htmlFor="tip">Tip</label>
                    <select
                      id="tip"
                      value={tip}
                      onChange={(e) => setTip(e.target.value)}
                    >
                      {walletTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="wallet-field">
                    <label htmlFor="valuta">Valuta</label>
                    <select
                      id="valuta"
                      value={valuta}
                      onChange={(e) => setValuta(e.target.value)}
                    >
                      {currencies.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="wallet-form-row">
                  <TextInput
                    id="pocetno"
                    label="Početno stanje"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={pocetnoStanje}
                    onChange={(e) => setPocetnoStanje(e.target.value)}
                  />
                  <TextInput
                    id="trenutno"
                    label="Trenutno stanje"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={trenutnoStanje}
                    onChange={(e) => setTrenutnoStanje(e.target.value)}
                  />
                </div>

                <label className="wallet-toggle">
                  <input
                    type="checkbox"
                    checked={aktivan}
                    onChange={(e) => setAktivan(e.target.checked)}
                  />
                  <span>Novčanik je aktivan</span>
                </label>

                <div className="wallet-form-actions">
                  <PrimaryButton
                    type="submit"
                    loading={saving} 
                     loadingText={editingId ? "Čuvanje..." : "Kreiranje..."}
                  >
                    {editingId ? "Sačuvaj novčanik" : "Dodaj novčanik"}
                   
                  </PrimaryButton>

                  {editingId && (
                    <button
                      type="button"
                      className="btn-secondary wallet-btn-reset"
                      onClick={resetForm}
                    >
                      Otkaži izmenu
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

        </div>




  </div>


  )
}

export default MojiNovcanici