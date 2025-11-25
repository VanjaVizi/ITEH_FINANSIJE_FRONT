import React from 'react'
import './Pocetna.css'
import FeatureCard from '../components/FeatureCard'
import { FaUserShield, FaWallet, FaTags, FaExchangeAlt, FaListAlt, FaChartPie } from 'react-icons/fa'
const Pocetna = () => {

 const FEATURES = [
  {
    id: 'auth',
    title: 'Nalog i sigurnost',
    Icon: <FaUserShield/>,
    items: [
      'Otvaranje naloga za par sekundi',
      'Prijava sa email adresom i lozinkom',
      'Potvrda mejla radi sigurnosti naloga',
      'Opcija za zaboravljenu lozinku',
    ],
  },
  {
    id: 'wallets',
    title: 'Tvoji novčanici',
    Icon: <FaWallet/>,
    items: [
      'Dodaj različite novčanike: banka, keš, štednja, kripto…',
      'Vidi koliko novca imaš na kom mestu',
      'Prati ukupno i po novčaniku',
      'Odvoji lične, poslovne ili studentske troškove',
    ],
  },
  {
    id: 'categories',
    title: 'Kategorije troškova i prihoda',
    Icon: <FaTags/>,
    items: [
      'Napravi kategorije kao što su: stan, hrana, prevoz, plata…',
      'Brzo vidi gde najviše trošiš',
      'Razdvoji obavezne i “hobby” troškove',
      'Učini svoje finansije preglednim i smislenim',
    ],
  },
  {
    id: 'transactions',
    title: 'Evidencija svih transakcija',
    Icon: <FaListAlt/>,
    items: [
      'Upiši svaki prihod i svaki trošak',
      'Filtriraj po novčaniku, kategoriji, datumu ili iznosu',
      'Gledaj istoriju svojih troškova po danima',
      'Izvezi listu u CSV i sačuvaj je ili obradi dalje',
    ],
  },
  {
    id: 'transfers',
    title: 'Transferi između novčanika',
    Icon: <FaExchangeAlt/>,
    items: [
      'Prebaci novac sa računa u banci u keš ili obrnuto',
      'Upiši eventualnu proviziju banke',
      'Dodaj opis da znaš zašto si prebacivao novac',
      'Čuvaj trag svih internih transfera',
    ],
  },
  {
    id: 'overview',
    title: 'Jasan pregled i analiza',
    Icon: <FaChartPie/>,
    items: [
      'Uvek znaš koliko ti je ostalo novca',
      'Vidi koliko trošiš mesečno i na šta',
      'Podaci su spremni za grafikone i detaljnu analizu',
      'Idealno polazište za ozbiljno planiranje budžeta',
    ],
  },
]
 
  return (
    <div className="pocetna">
      <header className="pocetna-hero">
        <div className="pocetna-hero-content">
          <h1 className="pocetna-title">FinTrack – imaš potpunu kontrolu nad svojim troškovima</h1>
          <p className="pocetna-subtitle">
            Jedno mesto za sve tvoje novčanike, troškove i prihode. 
            Prati koliko trošiš, gde ti odlazi novac i koliko ti ostaje na raspolaganju – jasno i pregledno.
          </p>

          <div className="pocetna-hero-actions">
            <button className="btn-primary">Kreiraj nalog</button>
            <button className="btn-secondary">Prijavi se</button>
          </div>

          <div className="pocetna-hero-meta">
            <span>✔ Lične finansije na jednom mestu</span>
            <span>✔ Pregled po danima, kategorijama i novčanicima</span>
          </div>
        </div>

        <div className="pocetna-hero-card">
          <div className="pocetna-balance-label">Ukupno stanje</div>
          <div className="pocetna-balance-value">125.430 RSD</div>
          <div className="pocetna-balance-pillovi">
            <div className="pill pill-priliv">
              + 82.900 RSD
              <span>Prihodi ovog meseca</span>
            </div>
            <div className="pill pill-odliv">
              - 57.470 RSD
              <span>Troškovi ovog meseca</span>
            </div>
          </div>
          <div className="pocetna-mini-legend">
            <span className="dot dot-priliv" /> Prihodi
            <span className="dot dot-odliv" /> Troškovi
          </div>
        </div>
      </header>


        <section className="pocetna-section">
        <h2>Šta možeš da radiš u aplikaciji?</h2>
        <p className="pocetna-section-subtitle">
          FinTrack ti pomaže da svakodnevne troškove i prihode organizuješ tako da uvek znaš koliko i na šta trošiš.
        </p>

        <div className="pocetna-grid">
           {FEATURES.map(feature => (
            <FeatureCard
             key={feature.id}
              title={feature.title}
              Icon={feature.Icon}
              items={feature.items}
            />
          ))} 
        </div>
      </section>
      <section className="pocetna-section tech-section">
        <h2>Ispod haube</h2>

        <p className="pocetna-section-subtitle">
          Aplikacija je napravljena korišćenjem savremenih veb tehnologija, tako da možeš da joj pristupaš brzo i bezbedno.
        </p>

        <div className="badges">
          <span className="badge">Siguran pristup nalogu</span>
          <span className="badge">Rad u realnom vremenu</span>
          <span className="badge">Čuvanje podataka u bazi</span>
          <span className="badge">Optimizovano za proširenja</span>
        </div>
      </section>

      {/* CTA sekcija */}
      <section className="pocetna-section pocetna-cta">
        <div className="pocetna-cta-box">
          <h2>Počni da pratiš svoje troškove već danas</h2>
          <p>
            Dovoljno je da napraviš nalog, dodaš jedan ili više novčanika i počneš da upisuješ svoje prihode i troškove. 
            Posle nekoliko dana imaćeš jasnu sliku o tome gde ti odlazi novac i gde možeš da uštediš.
          </p>
          <div className="pocetna-hero-actions">
            <button className="btn-primary">Kreiraj besplatan nalog</button>
            <button className="btn-secondary">Već imam nalog</button>
          </div>
        </div>
      </section>








    </div>
  )
}

export default Pocetna