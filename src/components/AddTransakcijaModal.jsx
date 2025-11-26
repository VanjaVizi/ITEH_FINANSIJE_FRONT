
import React, { useMemo, useState } from "react";
import api from "../api/api";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";

const getUserFromStorage = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const AddTransakcijaModal = ({
  isOpen,
  onClose,
  wallets = [],
  kategorijePrilivi = [],
  kategorijeOdlivi = [],
  onSaved, // npr. () => reload()
}) => {
  const user = getUserFromStorage();

  const [tip, setTip] = useState("priliv");
  const [novcanikId, setNovcanikId] = useState("");
  const [kategorijaId, setKategorijaId] = useState("");
  const [iznos, setIznos] = useState("");
  const [datum, setDatum] = useState(
    new Date().toISOString().slice(0, 10) // yyyy-mm-dd
  );
  const [opis, setOpis] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const kategorijeZaPrikaz = useMemo(
    () => (tip === "priliv" ? kategorijePrilivi : kategorijeOdlivi),
    [tip, kategorijePrilivi, kategorijeOdlivi]
  );

  // Kad se promeni tip ili se otvori modal, ako nemamo selektovanu kategoriju, izaberi prvu
  React.useEffect(() => {
    if (!isOpen) return;

    if (wallets.length > 0 && !novcanikId) {
      setNovcanikId(String(wallets[0].id));
    }

    if (kategorijeZaPrikaz.length > 0 && !kategorijaId) {
      setKategorijaId(String(kategorijeZaPrikaz[0].id));
    }
  }, [isOpen, wallets, kategorijeZaPrikaz, novcanikId, kategorijaId]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (saving) return;
    setError("");
    setInfo("");
    setTip("priliv");
    setNovcanikId("");
    setKategorijaId("");
    setIznos("");
    setDatum(new Date().toISOString().slice(0, 10));
    setOpis("");
    onClose && onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!user?.id) {
      setError("Nedostaje korisnik. Ponovo se prijavi na sistem.");
      return;
    }
    if (!novcanikId) {
      setError("Izaberi novčanik.");
      return;
    }
    if (!kategorijaId) {
      setError("Izaberi kategoriju.");
      return;
    }
    if (!iznos || Number(iznos) <= 0) {
      setError("Unesi iznos veći od 0.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        korisnik_id: user.id,
        novcanik_id: Number(novcanikId),
        kategorija_id: Number(kategorijaId),
        tip, // "priliv" ili "odliv"
        iznos: Number(iznos),
        datum,
        opis,
      };

      const res = await api.post("/transakcije", payload);
      const nova = res.data;

      setInfo("Transakcija je uspešno dodata.");

      if (onSaved) {
        await onSaved(nova);
      }

      // zatvori modal posle kratkog delay-a ili odmah
      handleClose();
    } catch (err) {
      console.error(err);
      setError("Ne mogu da sačuvam transakciju. Pokušaj ponovo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fin-modal-backdrop" onClick={handleClose}>
      <div
        className="fin-modal"
        onClick={(e) => e.stopPropagation()} // da klik unutra ne zatvori
      >
        <header className="fin-modal-header">
          <h2>Nova transakcija</h2>
          <button
            type="button"
            className="fin-modal-close"
            onClick={handleClose}
          >
            ×
          </button>
        </header>

        <form className="fin-modal-form" onSubmit={handleSubmit}>
          {/* tip: priliv / odliv */}
          <div className="fin-modal-row fin-modal-row-inline">
            <div className="fin-modal-field">
              <span className="fin-modal-label">Tip</span>
              <div className="fin-modal-chip-group">
                <button
                  type="button"
                  className={`fin-chip ${tip === "priliv" ? "fin-chip-active-in" : ""}`}
                  onClick={() => setTip("priliv")}
                >
                  Priliv
                </button>
                <button
                  type="button"
                  className={`fin-chip ${tip === "odliv" ? "fin-chip-active-out" : ""}`}
                  onClick={() => setTip("odliv")}
                >
                  Odliv
                </button>
              </div>
            </div>
          </div>

          {/* novčanik + kategorija */}
          <div className="fin-modal-row fin-modal-row-inline">
            <div className="fin-modal-field">
              <label htmlFor="novcanik" className="fin-modal-label">
                Novčanik
              </label>
              <select
                id="novcanik"
                value={novcanikId}
                onChange={(e) => setNovcanikId(e.target.value)}
              >
                <option value="">-- izaberi --</option>
                {wallets.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.naziv}
                  </option>
                ))}
              </select>
            </div>

            <div className="fin-modal-field">
              <label htmlFor="kategorija" className="fin-modal-label">
                Kategorija
              </label>
              <select
                id="kategorija"
                value={kategorijaId}
                onChange={(e) => setKategorijaId(e.target.value)}
              >
                <option value="">-- izaberi --</option>
                {kategorijeZaPrikaz.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.naziv}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* iznos + datum */}
          <div className="fin-modal-row fin-modal-row-inline">
            <TextInput
              id="iznos"
              label="Iznos"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={iznos}
              onChange={(e) => setIznos(e.target.value)}
              required
            />
            <div className="fin-modal-field">
              <label htmlFor="datum" className="fin-modal-label">
                Datum
              </label>
              <input
                id="datum"
                type="date"
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
              />
            </div>
          </div>

          {/* opis */}
          <div className="fin-modal-row">
            <div className="fin-modal-field">
              <label htmlFor="opis" className="fin-modal-label">
                Opis (opciono)
              </label>
              <textarea
                id="opis"
                rows={3}
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                placeholder="npr. stipendija, plata, troškovi prevoza..."
              />
            </div>
          </div>

          {info && <div className="fin-alert fin-alert-info">{info}</div>}
          {error && <div className="fin-alert fin-alert-error">{error}</div>}

          <div className="fin-modal-actions">
            <PrimaryButton
              type="submit"
              loading={saving}
              loadingText="Čuvanje..."
            >
              Sačuvaj transakciju
            </PrimaryButton>
            <button
              type="button"
              className="btn-secondary fin-modal-cancel"
              onClick={handleClose}
              disabled={saving}
            >
              Otkaži
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransakcijaModal;
