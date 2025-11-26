import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

const useMojeKategorije = () => {
  const [kategorije, setKategorije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadKategorije = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/kategorije/moje"); 
      setKategorije(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
      setError("Ne mogu da učitam kategorije. Pokušaj ponovo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKategorije();
  }, []);

  const kategorijePrilivi = useMemo(
    () => kategorije.filter((k) => k.tip === "priliv"),
    [kategorije]
  );

  const kategorijeOdlivi = useMemo(
    () => kategorije.filter((k) => k.tip === "odliv"),
    [kategorije]
  );

  return {
    kategorije,          // sve
    kategorijePrilivi,   // samo za PRILIV
    kategorijeOdlivi,    // samo za ODLIV
    loading,
    error,
    reload: loadKategorije,
  };
};

export default useMojeKategorije;
