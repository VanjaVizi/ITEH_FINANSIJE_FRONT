import { useEffect, useState } from "react";
import api from "../api/api";



const useMojiNovcanici = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
 const loadWallets = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await api.get("/novcanici/moji");
     
      setWallets(res.data.data || []);
    } catch (err) {
      console.error(err);
      setLoadError("Ne mogu da učitam novčanike. Pokušaj ponovo.");
    } finally {
      setLoading(false);
    }
  };
 
     useEffect(() => {
        loadWallets();
    }, []);


    return { wallets, setWallets,loading,loadError, loadWallets };

};

export default useMojiNovcanici;