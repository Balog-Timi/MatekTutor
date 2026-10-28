"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";

type Practice = { q: string; a: string; tip: string; step: string; full: string[] };

type Saved = {
  practiceAnswers: string[];
  practiceDone: boolean[];
  helpUsed: number[];
  checkAnswers: string[];
  checkDone: boolean[];
  masterFile?: string;
  masterPreview?: string;
  reflection?: string;
  confidence?: string;
  submitted?: boolean;
};

const KEY = "matektutor.prototype.v1.student";

const practice: Practice[] = [
  { q: "x + 8 = 15", a: "7", tip: "Milyen művelettel tudod eltüntetni a +8-at?", step: "Vonj ki 8-at mindkét oldalból: x + 8 − 8 = 15 − 8.", full: ["x + 8 = 15", "x = 15 − 8", "x = 7"] },
  { q: "x − 6 = 10", a: "16", tip: "Milyen művelettel tudod megszüntetni a −6-ot?", step: "Adj 6-ot mindkét oldalhoz: x − 6 + 6 = 10 + 6.", full: ["x − 6 = 10", "x = 10 + 6", "x = 16"] },
  { q: "3x = 21", a: "7", tip: "Mit jelent a 3x? Melyik művelet szünteti meg a 3-mal való szorzást?", step: "Oszd el mindkét oldalt 3-mal: 3x / 3 = 21 / 3.", full: ["3x = 21", "x = 21 : 3", "x = 7"] },
  { q: "4x + 5 = 25", a: "5", tip: "Először ne a 4-gyel foglalkozz. Mi van még az x-es tag mellett?", step: "Először vonj ki 5-öt mindkét oldalból: 4x = 20.", full: ["4x + 5 = 25", "4x = 20", "x = 5"] },
  { q: "6x − 7 = 23", a: "5", tip: "Először a −7-et érdemes megszüntetni.", step: "Adj 7-et mindkét oldalhoz: 6x = 30. Innen már csak egy művelet hiányzik.", full: ["6x − 7 = 23", "6x = 30", "x = 5"] }
];

const checks = [
  { q: "7x + 4 = 39", a: "5" },
  { q: "5x − 9 = 26", a: "7" }
];

const empty: Saved = {
  practiceAnswers: Array(5).fill(""),
  practiceDone: Array(5).fill(false),
  helpUsed: Array(5).fill(0),
  checkAnswers: Array(2).fill(""),
  checkDone: Array(2).fill(false),
  reflection: "",
  confidence: ""
};

export default function LessonPage() {
  const [saved, setSaved] = useState<Saved>(empty);
  const [help, setHelp] = useState<Record<number, number>>({});
  const [notice, setNotice] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved({ ...empty, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(saved));
  }, [saved, ready]);

  const completedPractice = saved.practiceDone.filter(Boolean).length;
  const completedChecks = saved.checkDone.filter(Boolean).length;
  const overall = useMemo(() => {
    const completed = completedPractice + completedChecks + (saved.submitted ? 1 : 0);
    return Math.round((completed / 8) * 100);
  }, [completedPractice, completedChecks, saved.submitted]);

  function setPracticeAnswer(i: number, value: string) {
    setSaved(s => ({ ...s, practiceAnswers: s.practiceAnswers.map((v, idx) => idx === i ? value : v) }));
  }
  function checkPractice(i: number) {
    const ok = saved.practiceAnswers[i].trim().replace(",", ".") === practice[i].a;
    if (ok) {
      setSaved(s => ({ ...s, practiceDone: s.practiceDone.map((v, idx) => idx === i ? true : v) }));
      setNotice("Jó megoldás. Mehetsz tovább.");
    } else setNotice("Ez még nem jó. Gondold át újra, vagy kérj segítséget.");
  }
  function requestHelp(i: number) {
    const next = Math.min((help[i] || 0) + 1, 3);
    setHelp(h => ({ ...h, [i]: next }));
    setSaved(s => ({ ...s, helpUsed: s.helpUsed.map((v, idx) => idx === i ? Math.max(v, next) : v) }));
  }
  function checkIndependent(i: number) {
    const ok = saved.checkAnswers[i].trim().replace(",", ".") === checks[i].a;
    setSaved(s => ({ ...s, checkDone: s.checkDone.map((v, idx) => idx === i ? ok : v) }));
    setNotice(ok ? "Helyes. Ezt önállóan oldottad meg." : "Még nem jó. Ennél az ellenőrző feladatnál most próbáld újra segítség nélkül.");
  }
  function reset() {
    localStorage.removeItem(KEY);
    setSaved(empty);
    setHelp({});
    setNotice("A próbaadatokat töröltük.");
  }

  return (
    <>
      <Header />
      <main className="shell lessonShell">
        <section className="lessonHeader">
          <div>
            <div className="eyebrow">ALGEBRA ÉS EGYENLETEK</div>
            <h1>Elsőfokú egyenletek</h1>
            <p>Megértem → Együtt megoldjuk → Gyakorlok → Megmutatom, hogy megy → Mesterfeladat</p>
          </div>
          <div className="progressBox"><strong>{overall}%</strong><span>modulhaladás</span></div>
        </section>
        <div className="progressTrack"><span style={{ width: `${overall}%` }} /></div>

        {notice && <div className="notice" onClick={() => setNotice("")}>{notice}<span>×</span></div>}

        <section className="lessonBlock accentBlock">
          <div className="stepLabel">1. Megértem</div>
          <h2>Az egyenlet olyan, mint egy egyensúlyban lévő mérleg.</h2>
          <p>Ha az egyik oldalon változtatunk valamit, ugyanazt kell tennünk a másik oldalon is.</p>
          <div className="mathStack">
            <div>x + 5 = 12</div>
            <div className="mathHint">mindkét oldalból kivonunk 5-öt</div>
            <div>x + 5 − 5 = 12 − 5</div>
            <div className="mathResult">x = 7</div>
          </div>
          <div className="teacherVoice"><strong>Fontos:</strong> nem „átvisszük” az 5-öt. Mindkét oldalon ugyanazt a műveletet végezzük.</div>
        </section>

        <section className="lessonBlock">
          <div className="stepLabel">2. Együtt megoldjuk</div>
          <h2>2x + 3 = 11</h2>
          <p className="question">Mit lenne érdemes először eltüntetni?</p>
          <div className="miniChoices">
            <button onClick={() => setNotice("Igen. Először a +3-at tüntetjük el: mindkét oldalból kivonunk 3-at.")}>a +3-at</button>
            <button onClick={() => setNotice("A 2-höz is eljutunk, de előbb érdemes a +3-at megszüntetni.")}>a 2-t</button>
            <button onClick={() => setNotice("Az x-et nem eltüntetni akarjuk, hanem egyedül hagyni.")}>az x-et</button>
            <button onClick={() => setNotice("Semmi gond. Nézd meg, mi van hozzáadva a 2x-hez: +3.")}>nem tudom</button>
          </div>
          <div className="workedExample"><span>2x + 3 = 11</span><span>2x = 8</span><span>x = 4</span></div>
        </section>

        <section className="lessonBlock">
          <div className="stepLabel">3. Gyakorlok</div>
          <h2>Most te jössz</h2>
          <p>Öt rövid feladat. Segítséget bármikor kérhetsz.</p>
          <div className="taskList">
            {practice.map((t, i) => {
              const level = help[i] || 0;
              return <article className={`taskCard ${saved.practiceDone[i] ? "done" : ""}`} key={t.q}>
                <div className="taskTop"><span>{i + 1}. feladat</span>{saved.practiceDone[i] && <b>✓ kész</b>}</div>
                <div className="mathQuestion">{t.q}</div>
                <div className="answerRow"><label>x = <input value={saved.practiceAnswers[i]} onChange={e => setPracticeAnswer(i, e.target.value)} /></label><button className="primaryButton" onClick={() => checkPractice(i)}>Ellenőrzöm</button></div>
                <button className="helpButton" onClick={() => requestHelp(i)}>{level === 0 ? "Kérek egy kis segítséget" : level === 1 ? "Mutasd a következő lépést" : level === 2 ? "Mutasd a teljes megoldást" : "Teljes megoldás megjelenítve"}</button>
                {level >= 1 && <div className="helpPanel"><strong>Tipp</strong><p>{t.tip}</p></div>}
                {level >= 2 && <div className="helpPanel"><strong>Következő lépés</strong><p>{t.step}</p></div>}
                {level >= 3 && <div className="helpPanel solution"><strong>Teljes megoldás</strong>{t.full.map(x => <div key={x}>{x}</div>)}<p>Most a következő hasonló feladaton próbáld meg önállóan.</p></div>}
              </article>;
            })}
          </div>
        </section>

        <section className="lessonBlock independentBlock">
          <div className="stepLabel">4. Megmutatom, hogy megy</div>
          <h2>Két feladat segítség nélkül</h2>
          <p>Nem kell tökéletesnek lennie. A cél az, hogy lásd, mire vagy már képes egyedül.</p>
          <div className="taskList compactTasks">
            {checks.map((t, i) => <article className={`taskCard ${saved.checkDone[i] ? "done" : ""}`} key={t.q}>
              <div className="taskTop"><span>Önálló {i + 1}.</span>{saved.checkDone[i] && <b>✓ helyes</b>}</div>
              <div className="mathQuestion">{t.q}</div>
              <div className="answerRow"><label>x = <input value={saved.checkAnswers[i]} onChange={e => setSaved(s => ({ ...s, checkAnswers: s.checkAnswers.map((v, idx) => idx === i ? e.target.value : v) }))} /></label><button className="primaryButton" onClick={() => checkIndependent(i)}>Ellenőrzöm</button></div>
            </article>)}
          </div>
        </section>

        <section className="lessonBlock masterBlock">
          <div className="stepLabel">5. Mesterfeladat</div>
          <h2>Mutasd meg, hogy ezt már egy új helyzetben is tudod használni.</h2>
          <div className="masterProblem">Egy diákszínház belépője <strong>1200 Ft</strong>, és minden megvásárolt üdítő további <strong>450 Ft</strong>. Anna összesen <strong>3000 Ft</strong>-ot fizetett. <strong>Hány üdítőt vásárolt?</strong></div>
          <ol className="masterSteps"><li>Írd fel az egyenletet.</li><li>Oldd meg.</li><li>Ellenőrizd.</li><li>Dolgozd ki papíron, majd töltsd fel.</li></ol>
          <div className="uploadBox">
            <label className="uploadButton">Megoldás kiválasztása<input type="file" accept="image/*,.pdf" onChange={e => {
              const file=e.target.files?.[0];
              if(!file){ setSaved(s=>({...s,masterFile:"",masterPreview:""})); return; }
              if(file.type.startsWith("image/") && file.size <= 1200000){
                const reader=new FileReader();
                reader.onload=()=>setSaved(s=>({...s,masterFile:file.name,masterPreview:String(reader.result||"")}));
                reader.readAsDataURL(file);
              }else{
                setSaved(s=>({...s,masterFile:file.name,masterPreview:""}));
              }
            }} /></label>
            <span>{saved.masterFile || "Még nincs kiválasztott fájl"}</span>
          </div>
          <label className="fieldLabel">Mennyire ment önállóan?
            <select value={saved.confidence || ""} onChange={e => setSaved(s => ({ ...s, confidence: e.target.value }))}><option value="">Válassz</option><option>Teljesen önállóan</option><option>Kisebb segítséggel</option><option>Nehezen</option><option>Nem tudtam befejezni</option></select>
          </label>
          <label className="fieldLabel">Volt olyan rész, amelyben bizonytalan voltál?
            <textarea value={saved.reflection || ""} onChange={e => setSaved(s => ({ ...s, reflection: e.target.value }))} placeholder="Például: az egyenlet felírása volt nehéz..." />
          </label>
          <button className="submitButton" disabled={!saved.masterFile || !saved.confidence} onClick={() => { setSaved(s => ({ ...s, submitted: true })); setNotice("A Mesterfeladat beadva. A tanár a tanári nézetben látja az összefoglalót."); }}>Mesterfeladat beadása</button>
          {saved.submitted && <div className="submitted">✓ Beadva – tanári visszajelzésre vár</div>}
        </section>

        <section className="lessonBlock finishBlock">
          <h2>Ennyi a modul.</h2>
          <p>Nincs több rejtett szint vagy technikai kód. Innen a tanuló vagy tovább gyakorol, vagy várja a tanári visszajelzést.</p>
          <div className="finishActions"><a className="primaryButton linkButton" href="/tanar">Tanári nézet megnyitása</a><button className="secondaryButton" onClick={reset}>Próbaadatok törlése</button></div>
        </section>
      </main>
    </>
  );
}
