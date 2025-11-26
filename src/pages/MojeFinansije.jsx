import React, { useMemo, useState } from 'react'
import useMojeTransakcije from '../hooks/useMojeTransakcije';
import DataTable from "react-data-table-component";
import './MojeFinansije.css'
import useMojeKategorije from '../hooks/useMojeKategorije';
import useMojiNovcanici from '../hooks/useMojiNovcanici';
import AddTransakcijaModal from '../components/AddTransakcijaModal';

const formatAmount = (value) => {
  const num = Number(value) || 0;
  return num.toLocaleString("sr-RS", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
const MojeFinansije = () => {

   const { transakcije, loading, error, reload } = useMojeTransakcije();
   const { kategorijePrilivi, kategorijeOdlivi } = useMojeKategorije();
   const { wallets, setWallets } = useMojiNovcanici();


  const [isAddOpen, setIsAddOpen] = useState(false);


  const prilivi = useMemo(
      () => transakcije.filter((t) => t.tip === "priliv"),
      [transakcije]
    );

    const odlivi = useMemo(
      () => transakcije.filter((t) => t.tip === "odliv"),
      [transakcije]
    );

    const totalPrilivi = useMemo(
      () => prilivi.reduce((sum, t) => sum + Number(t.iznos || 0), 0),
      [prilivi]
    );

    const totalOdlivi = useMemo(
      () => odlivi.reduce((sum, t) => sum + Number(t.iznos || 0), 0),
      [odlivi]
    );

  const saldo = totalPrilivi - totalOdlivi;

const commonColumns = [
    {
      name: "Datum",
      selector: (row) => row.datum,
      sortable: true,
      width: "110px",
      cell: (row) => <span>{row.datum}</span>,
    },
    {
      name: "Novčanik",
      selector: (row) =>
        row.novcanik?.naziv || row.novcanik_naziv || `ID: ${row.novcanik_id}`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Kategorija",
      selector: (row) =>
        row.kategorija?.naziv ||
        row.kategorija_naziv ||
        `ID: ${row.kategorija_id}`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Iznos",
      selector: (row) => Number(row.iznos || 0),
      sortable: true,
      right: true,
      width: "120px",
      cell: (row) => <strong>{row.iznos}</strong>,
    },
    {
      name: "Opis",
      selector: (row) => row.opis || "",
      wrap: true,
      grow: 2,
    },
  ];




  return (
    
    <div className="fin-page">
          <div className="fin-inner">
            <header className="fin-header">
              <h1>Pregled mojih finansija</h1>
              <p>
                Ovde vidiš sve svoje transakcije: posebno PRILIVE i ODLIVE, kao i
                ukupan saldo.
              </p>
              <button
                type="button"
                className="btn-primary fin-add-btn"
                onClick={() => setIsAddOpen(true)}
              >
                + Nova transakcija
              </button>

            </header>

        <section className="fin-summary">
          <div className="fin-summary-card fin-summary-in">
            <span>Ukupni prilivi</span>
            <strong>{formatAmount(totalPrilivi)} RSD</strong>
          </div>
          <div className="fin-summary-card fin-summary-out">
            <span>Ukupni odlivi</span>
           <strong>{formatAmount(totalOdlivi)} RSD</strong>
          </div>
          <div className="fin-summary-card fin-summary-balance">
            <span>Saldo</span>
            <strong className={saldo >= 0 ? "fin-pos" : "fin-neg"}>
               {formatAmount(saldo)} RSD
            </strong>
             </div>
          {/*
          <button className="btn-secondary fin-reload" onClick={reload}>
            Osveži podatke
          </button> */}
        </section>
       {error && (
          <div className="fin-alert fin-alert-error">
            {error}
          </div>
        )}
      </div>

        <div className="fin-tables">
          <section className="fin-table-section fin-table-section-in">
            <div className="fin-table-header">
              <h2>Prilivi</h2>
              <span className="fin-table-count">
                {prilivi.length} transakcija
              </span>
            </div>
            <DataTable
              columns={commonColumns}
              data={prilivi}
              progressPending={loading}
              pagination
              highlightOnHover
              dense 
              noDataComponent="Nema evidentiranih priliva."
            />
          </section>

          <section className="fin-table-section fin-table-section-out">
            <div className="fin-table-header">
              <h2>Odlivi</h2>
              <span className="fin-table-count">
                {odlivi.length} transakcija
              </span>
            </div>
            <DataTable
              columns={commonColumns}
              data={odlivi}
              progressPending={loading}
              pagination
              highlightOnHover
              dense 
              noDataComponent="Nema evidentiranih odliva."
            />
          </section>
        </div>





        <AddTransakcijaModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                wallets={wallets}
                kategorijePrilivi={kategorijePrilivi}
                kategorijeOdlivi={kategorijeOdlivi}
                onSaved={async () => {
                  await reload(); // ponovo učitaj listu
                }}
              />











      </div>

  )
}

export default MojeFinansije