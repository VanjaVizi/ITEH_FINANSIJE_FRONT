import { useEffect, useState } from "react";
import api from "../api/api";

const useMojeTransakcije = () => {
  const [transakcije, setTransakcije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransakcije = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/transakcije/moje");
 
      setTransakcije(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
      setError("Ne mogu da učitam transakcije. Pokušaj ponovo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransakcije();
  }, []);

  return { transakcije, loading, error, reload: loadTransakcije };
};

export default useMojeTransakcije;
