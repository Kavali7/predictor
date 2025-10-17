import { useMemo, useState } from 'react';
import { personalNumber, coupleNumber, compatScore } from './app-content/src/numerology';
import { getIndividualReport, getCoupleReport } from './app-content/src/contentLoader';

export default function App() {
  const a = personalNumber('1990-07-15', 'Alice', 'Durand');
  const b = personalNumber('1992-03-02', 'Bob', 'Martin');
  const c = coupleNumber(a, b);
  const score = compatScore(a, b, c);
  const repA = getIndividualReport(a);
  const repB = getIndividualReport(b);
  const repC = getCoupleReport(c);

  const [p1, setP1] = useState({ first: 'Alice', last: 'Durand', date: '1990-07-15' });
  const [p2, setP2] = useState({ first: 'Bob',   last: 'Martin', date: '1992-03-02' });

  const computed = useMemo(() => {
    try {
      const n1 = personalNumber(p1.date, p1.first, p1.last);
      const n2 = personalNumber(p2.date, p2.first, p2.last);
      const nc = coupleNumber(n1, n2);
      const sc = compatScore(n1, n2, nc);
      return { n1, n2, nc, sc, r1: getIndividualReport(n1), r2: getIndividualReport(n2), rc: getCoupleReport(nc) };
    } catch { return null; }
  }, [p1, p2]);

  return (
    <main>
      <h1>Numérologie — Site Web</h1>

      <section className="card" style={{ marginBottom: 16 }}>
        <h2>Exemple (snippet)</h2>
        <p>Chiffre Alice (a) : {a}</p>
        <p>Chiffre Bob (b) : {b}</p>
        <p>Chiffre couple (c) : {c}</p>
        <p>Score /100 : {score}</p>
        <hr />
        <h3>Rapport Alice — {repA.title}</h3>
        <p>{repA.summary}</p>
        <h3>Rapport Bob — {repB.title}</h3>
        <p>{repB.summary}</p>
        <h3>Rapport Couple — {repC.archetype}</h3>
        <p>{repC.dynamic}</p>
      </section>

      <section className="card">
        <h2>Calculateur rapide</h2>
        <div className="grid grid-2">
          <fieldset className="card" style={{padding:12}}>
            <legend><b>Partenaire 1</b></legend>
            <label>Prénom<br/><input value={p1.first} onChange={e => setP1({ ...p1, first: e.target.value })} /></label><br/><br/>
            <label>Nom<br/><input value={p1.last} onChange={e => setP1({ ...p1, last: e.target.value })} /></label><br/><br/>
            <label>Date (YYYY-MM-DD)<br/><input value={p1.date} onChange={e => setP1({ ...p1, date: e.target.value })} /></label>
          </fieldset>
          <fieldset className="card" style={{padding:12}}>
            <legend><b>Partenaire 2</b></legend>
            <label>Prénom<br/><input value={p2.first} onChange={e => setP2({ ...p2, first: e.target.value })} /></label><br/><br/>
            <label>Nom<br/><input value={p2.last} onChange={e => setP2({ ...p2, last: e.target.value })} /></label><br/><br/>
            <label>Date (YYYY-MM-DD)<br/><input value={p2.date} onChange={e => setP2({ ...p2, date: e.target.value })} /></label>
          </fieldset>
        </div>
        <hr />
        {computed ? (
          <div>
            <p>Chiffre P1: {computed.n1} — <b>{computed.r1.title}</b></p>
            <p>Chiffre P2: {computed.n2} — <b>{computed.r2.title}</b></p>
            <p>Chiffre couple: {computed.nc} — <b>{computed.rc.archetype}</b></p>
            <p>Score /100: {computed.sc}</p>
            <p className="tooltip">{computed.rc.dynamic}</p>
          </div>
        ) : <p>Vérifie le format des dates.</p>}
      </section>

      <footer>
        <hr/>
        <small className="muted">Pratique de bien‑être / spirituelle — ne remplace pas un avis médical ou psychologique.</small>
      </footer>
    </main>
  );
}
