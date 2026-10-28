"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";

type Saved = { practiceDone?: boolean[]; helpUsed?: number[]; checkDone?: boolean[]; masterFile?: string; masterPreview?: string; reflection?: string; confidence?: string; submitted?: boolean };
const KEY = "matektutor.prototype.v1.student";

export default function TeacherPage() {
  const [s, setS] = useState<Saved>({});
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("Átnézendő");
  useEffect(() => { try { setS(JSON.parse(localStorage.getItem(KEY) || "{}")); } catch {} }, []);
  const practice = s.practiceDone?.filter(Boolean).length || 0;
  const checks = s.checkDone?.filter(Boolean).length || 0;
  const tips = s.helpUsed?.filter(x => x > 0).length || 0;
  const full = s.helpUsed?.filter(x => x >= 3).length || 0;
  return <>
    <Header />
    <main className="shell teacherShell">
      <div className="eyebrow">TANÁRI NÉZET • PROTOTÍPUS</div>
      <div className="teacherTitle"><div><h1>Elsőfokú egyenletek</h1><p>Próba osztály · 1 tanuló</p></div><span className="teacherBadge">Tanári felület</span></div>
      <section className="teacherSummary">
        <div><span>Gyakorlás</span><strong>{practice}/5</strong></div>
        <div><span>Önálló ellenőrzés</span><strong>{checks}/2</strong></div>
        <div><span>Segítséget kért</span><strong>{tips} feladatnál</strong></div>
        <div><span>Teljes megoldást látott</span><strong>{full}×</strong></div>
      </section>
      <section className="teacherCard">
        <div className="studentHead"><div className="avatar">PT</div><div><h2>Próba tanuló</h2><p>Elsőfokú egyenletek</p></div><span className={`statusPill ${s.submitted ? "submittedPill" : ""}`}>{s.submitted ? "Mesterfeladat beadva" : "Folyamatban"}</span></div>
        <div className="teacherGrid">
          <div className="infoPanel"><h3>Digitális munka</h3><dl><div><dt>Gyakorlófeladatok</dt><dd>{practice}/5</dd></div><div><dt>Önálló ellenőrzés</dt><dd>{checks}/2</dd></div><div><dt>Segítség</dt><dd>{tips} feladat</dd></div><div><dt>Teljes megoldás</dt><dd>{full} alkalom</dd></div></dl></div>
          <div className="infoPanel"><h3>Mesterfeladat</h3><dl><div><dt>Státusz</dt><dd>{s.submitted ? "Beadva" : "Nincs beadva"}</dd></div><div><dt>Fájl</dt><dd>{s.masterFile || "—"}</dd></div><div><dt>Önértékelés</dt><dd>{s.confidence || "—"}</dd></div></dl></div>
        </div>
        {s.masterPreview && <div className="submissionPreview"><strong>Feltöltött megoldás</strong><img src={s.masterPreview} alt="A tanuló feltöltött kézírásos megoldása" /></div>}
        <div className="reflectionBox"><strong>Tanulói megjegyzés</strong><p>{s.reflection || "A tanuló még nem írt megjegyzést."}</p></div>
        <div className="teacherDecision"><h3>Tanári visszajelzés</h3><div className="decisionButtons"><button className={status === "Rendben" ? "activeDecision" : ""} onClick={() => setStatus("Rendben")}>✓ Rendben</button><button className={status === "Javítsd és add be újra" ? "activeDecision" : ""} onClick={() => setStatus("Javítsd és add be újra")}>↻ Javítsd és add be újra</button></div><textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Rövid tanári megjegyzés..." /><button className="primaryButton" onClick={() => alert(`Prototípus: a visszajelzés mentése később Supabase-ba kerül.\nStátusz: ${status}\nMegjegyzés: ${feedback || "—"}`)}>Visszajelzés mentése</button></div>
      </section>
      <div className="prototypeNote"><strong>Ebben a prototípusban</strong><span>a feltöltött fájl csak név szerint jelenik meg, és az adat ugyanabban a böngészőben él. A valódi fájltárolást, bejelentkezést és osztályokat csak akkor építjük meg, ha ez a tanulói–tanári folyamat tetszik.</span></div>
    </main>
  </>;
}
