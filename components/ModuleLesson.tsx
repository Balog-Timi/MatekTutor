"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ModuleVisual from "@/components/ModuleVisual";
import { lessonEnrichment } from "@/data/lessonEnrichment";

type Guided={prompt:string;steps:string[];check:string};
type ModuleData={
  id:string; title:string; goal:string; why:string; prereq:string[];
  concepts:[string,string][]; guided:Guided[];
  practice:[string,string,string,string,string,string][];
  independent:[string,string,string][];
  common_errors:string[]; mastery:string;
};
type Saved={practiceAnswers:string[];practiceDone:boolean[];helpUsed:number[];independentAnswers:string[];independentDone:boolean[]};

function normalize(v:string){return v.toLowerCase().replace(/\s+/g,"").replace(/,/g,".").replace(/\u2212/g,"-").replace(/\u2264/g,"<=").replace(/\u2265/g,">=").replace(/[{}]/g,"");}
function acceptable(got:string, expected:string){
  const g=normalize(got), e=normalize(expected);
  if(g===e) return true;
  const variants=e.split(";").map(x=>x.trim());
  if(variants.includes(g)) return true;
  if(e.includes(",") && !e.includes("x")){
    const sa=e.split(",").filter(Boolean).sort().join("|");
    const sg=g.split(",").filter(Boolean).sort().join("|");
    if(sa===sg) return true;
  }
  return false;
}

const stepNav=[
  ["#felfedezem","Felfedezem"],["#megertem","Megértem"],["#egyutt","Együtt"],["#gyakorlas","Gyakorlok"],["#onallo","Önálló"],["#lezaras","Lezárás"]
];

export default function ModuleLesson({moduleData,nextId}:{moduleData:ModuleData;nextId:string|null}){
  const empty:Saved={practiceAnswers:Array(moduleData.practice.length).fill(""),practiceDone:Array(moduleData.practice.length).fill(false),helpUsed:Array(moduleData.practice.length).fill(0),independentAnswers:Array(moduleData.independent.length).fill(""),independentDone:Array(moduleData.independent.length).fill(false)};
  const key=`matektutor.g9.kombhal.${moduleData.id}.v1`;
  const [saved,setSaved]=useState<Saved>(empty);
  const [help,setHelp]=useState<Record<number,number>>({});
  const [notice,setNotice]=useState("");
  const [ready,setReady]=useState(false);
  const enrich=lessonEnrichment[moduleData.id];

  useEffect(()=>{try{const raw=localStorage.getItem(key);if(raw)setSaved({...empty,...JSON.parse(raw)});}catch{}setReady(true);},[key]);
  useEffect(()=>{if(ready)localStorage.setItem(key,JSON.stringify(saved));},[saved,ready,key]);

  const pDone=saved.practiceDone.filter(Boolean).length;
  const iDone=saved.independentDone.filter(Boolean).length;
  const total=moduleData.practice.length+moduleData.independent.length;
  const pct=Math.round(((pDone+iDone)/total)*100);
  const completed=iDone===moduleData.independent.length;
  const helpCount=saved.helpUsed.filter(x=>x>0).length;
  const fullCount=saved.helpUsed.filter(x=>x>=3).length;

  function checkPractice(i:number){
    const ok=acceptable(saved.practiceAnswers[i],moduleData.practice[i][2]);
    if(ok){setSaved(s=>({...s,practiceDone:s.practiceDone.map((v,j)=>j===i?true:v)}));setNotice("Szép munka. Ez a gondolat már a helyén van.");}
    else setNotice("Még nem stimmel. Ne találgass: nézd meg, melyik lépésnél változott meg a jelentés, vagy kérj egy tippet.");
  }
  function checkIndependent(i:number){
    const ok=acceptable(saved.independentAnswers[i],moduleData.independent[i][2]);
    setSaved(s=>({...s,independentDone:s.independentDone.map((v,j)=>j===i?ok:v)}));
    setNotice(ok?"Helyes — ezt már segítség nélkül oldottad meg.":"Ez még nem jó. Itt most ne kérj segítséget: próbáld meg újra végiggondolni a szabályt.");
  }
  function requestHelp(i:number){
    const n=Math.min((help[i]||0)+1,3);setHelp(h=>({...h,[i]:n}));
    setSaved(s=>({...s,helpUsed:s.helpUsed.map((v,j)=>j===i?Math.max(v,n):v)}));
  }
  function reset(){localStorage.removeItem(key);setSaved(empty);setHelp({});setNotice("A modul próbaadatait töröltük.");}

  return <>
    <section className={`lessonHeader lessonHeaderV3 accent-${enrich?.accent||"blue"}`}>
      <div className="lessonTitleArea">
        <div className="eyebrow">9. ÉVFOLYAM • KOMBINATORIKA ÉS HALMAZOK</div>
        <div className="lessonTitleLine"><span className="lessonSymbol">{enrich?.symbol}</span><div><span className="modulePill">{moduleData.id}</span><h1>{moduleData.title}</h1></div></div>
        <p className="lessonGoal">{moduleData.goal}</p>
      </div>
      <div className="progressOrb"><strong>{pct}%</strong><span>haladás</span></div>
    </section>

    <nav className="lessonJourney" aria-label="Lecke lépései">{stepNav.map(([href,label],i)=><a href={href} key={href}><span>{i+1}</span>{label}</a>)}</nav>
    <div className="progressTrack vividTrack"><span style={{width:`${pct}%`}}/></div>
    {notice&&<div className="notice noticeV3" onClick={()=>setNotice("")}>{notice}<span>×</span></div>}

    <section id="felfedezem" className="lessonBlock discoveryBlock">
      <div className="blockTitle"><div className="stepBadge">1</div><div><span>FELFEDEZEM</span><h2>Először értsük meg, mi történik</h2></div></div>
      <div className="discoveryGrid">
        <div>
          <p className="hookText">{enrich?.hook||moduleData.why}</p>
          <div className="teacherWhisper"><span>Tanári kapaszkodó</span><p>{enrich?.teacherTip}</p></div>
          <div className="prereqLine"><strong>Jó, ha már megy:</strong> {moduleData.prereq.join(" • ")}</div>
        </div>
        <ModuleVisual moduleId={moduleData.id}/>
      </div>
    </section>

    <section id="megertem" className="lessonBlock conceptBlockV3">
      <div className="blockTitle"><div className="stepBadge">2</div><div><span>MEGÉRTEM</span><h2>Rakjuk össze a fogalmat</h2></div></div>
      <p className="conceptLead">{enrich?.conceptLead}</p>
      <div className="conceptGridV3">{moduleData.concepts.map(([t,b],i)=><article className="conceptCardV3" key={t}><div className="conceptIndex">{String(i+1).padStart(2,"0")}</div><h3>{t}</h3><p>{b}</p></article>)}</div>
      <div className="rememberStrip"><span>Jegyezd meg</span><strong>{enrich?.remember}</strong></div>
    </section>

    <section id="egyutt" className="lessonBlock guidedSectionV3">
      <div className="blockTitle"><div className="stepBadge">3</div><div><span>EGYÜTT MEGOLDJUK</span><h2>Ne csak nézd — kövesd a gondolatmenetet</h2></div></div>
      {moduleData.guided.map((g,i)=><article className="guidedCardV3" key={g.prompt}><div className="guidedNumber">{i+1}</div><div className="guidedBody"><span className="guidedLabel">Vezetett példa</span><h3>{g.prompt}</h3><div className="thinkingSteps">{g.steps.map((x,j)=><div className="thinkingStep" key={x}><span>{j+1}</span><p>{x}</p></div>)}</div><div className="teacherVoice teacherVoiceV3"><strong>Állj meg egy pillanatra:</strong> {g.check}</div></div></article>)}
    </section>

    <section id="gyakorlas" className="lessonBlock practiceSectionV3">
      <div className="blockTitle"><div className="stepBadge">4</div><div><span>GYAKORLOK</span><h2>Most te építed fel a megoldást</h2></div></div>
      <p className="sectionIntro">Nem baj, ha elakadsz. A segítség nem a válasz helyett gondolkodik, hanem egyre közelebb visz hozzá.</p>
      <div className="taskList taskListV3">
        {moduleData.practice.map((t,i)=>{const level=help[i]||0;return <article className={`taskCard taskCardV3 ${saved.practiceDone[i]?"done":""}`} key={t[0]}>
          <div className="taskTop"><span>{t[0]}</span>{saved.practiceDone[i]?<b>✓ kész</b>:<b>{i+1}/{moduleData.practice.length}</b>}</div>
          <div className="textQuestion">{t[1]}</div>
          <div className="answerRow"><input className="wideAnswer" value={saved.practiceAnswers[i]} onChange={e=>setSaved(s=>({...s,practiceAnswers:s.practiceAnswers.map((v,j)=>j===i?e.target.value:v)}))} placeholder="Írd ide a válaszod"/><button className="primaryButton" onClick={()=>checkPractice(i)}>Ellenőrzöm</button></div>
          <div className="helpRail"><button className="helpButton helpButtonV3" onClick={()=>requestHelp(i)} disabled={level>=3}>{level===0?"💡 Kérek egy tippet":level===1?"→ Mutasd a következő lépést":level===2?"✓ Mutasd a teljes megoldást":"A teljes megoldást már látod"}</button></div>
          {level>=1&&<div className="helpPanel helpTip"><span>1. Tipp</span><p>{t[3]}</p></div>}
          {level>=2&&<div className="helpPanel helpStep"><span>2. Következő lépés</span><p>{t[4]}</p></div>}
          {level>=3&&<div className="helpPanel solution helpSolution"><span>3. Teljes megoldás</span><p>{t[5]}</p><div className="nextTry">Most ne ezt írd vissza. A következő feladatnál próbáld meg ugyanezt a gondolatot önállóan.</div></div>}
        </article>})}
      </div>
    </section>

    <section id="onallo" className="lessonBlock independentBlock independentBlockV3">
      <div className="blockTitle"><div className="stepBadge">5</div><div><span>MEGMUTATOM, HOGY MEGY</span><h2>Két új feladat, kapaszkodó nélkül</h2></div></div>
      <p className="sectionIntro">Itt nem az a kérdés, emlékszel-e az előző válaszra, hanem hogy felismered-e ugyanazt a matematikai ötletet új helyzetben.</p>
      <div className="taskList compactTasks">{moduleData.independent.map((t,i)=><article className={`taskCard taskCardV3 independentCard ${saved.independentDone[i]?"done":""}`} key={t[0]}><div className="taskTop"><span>{t[0]}</span>{saved.independentDone[i]&&<b>✓ önállóan helyes</b>}</div><div className="textQuestion">{t[1]}</div><div className="answerRow"><input className="wideAnswer" value={saved.independentAnswers[i]} onChange={e=>setSaved(s=>({...s,independentAnswers:s.independentAnswers.map((v,j)=>j===i?e.target.value:v)}))} placeholder="Válasz"/><button className="primaryButton" onClick={()=>checkIndependent(i)}>Ellenőrzöm</button></div></article>)}</div>
    </section>

    <section id="lezaras" className="lessonBlock finishBlock finishBlockV3">
      <div className="finishIcon">{completed?"✓":"↗"}</div>
      <div className="stepLabel">6. LEZÁRÁS</div>
      <h2>{completed?"Ezt már önállóan is tudod használni.":"Már közel vagy — még egy kis gyakorlás kell."}</h2>
      <p>{completed?"Mindkét új ellenőrző feladat sikerült segítség nélkül. Ez erősebb jel, mint az, hogy a gyakorlás közben egyszer már láttad a megoldást.":moduleData.mastery}</p>
      <div className="moduleSummary"><span>Gyakorlás <b>{pDone}/{moduleData.practice.length}</b></span><span>Segítséget kértél <b>{helpCount} feladatnál</b></span><span>Teljes megoldás <b>{fullCount}×</b></span><span>Önálló <b>{iDone}/{moduleData.independent.length}</b></span></div>
      <div className="finishActions"><Link className="secondaryButton linkButton" href="/9-evfolyam">Vissza a témakörhöz</Link>{completed&&nextId&&<Link className="primaryButton linkButton" href={`/9-evfolyam/kombinatorika-halmazok/${nextId.toLowerCase()}`}>Következő modul →</Link>}{completed&&!nextId&&<Link className="primaryButton linkButton" href="/9-evfolyam/kombinatorika-halmazok/mesterfeladat">Mesterfeladat →</Link>}<button className="secondaryButton" onClick={reset}>Modul újrakezdése</button></div>
    </section>
  </>;
}
