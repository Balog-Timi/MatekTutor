"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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
  // set answers: order-insensitive when comma-separated
  if(e.includes(",") && !e.includes("x")){
    const sa=e.split(",").filter(Boolean).sort().join("|");
    const sg=g.split(",").filter(Boolean).sort().join("|");
    if(sa===sg) return true;
  }
  return false;
}

export default function ModuleLesson({moduleData,nextId}:{moduleData:ModuleData;nextId:string|null}){
  const empty:Saved={practiceAnswers:Array(moduleData.practice.length).fill(""),practiceDone:Array(moduleData.practice.length).fill(false),helpUsed:Array(moduleData.practice.length).fill(0),independentAnswers:Array(moduleData.independent.length).fill(""),independentDone:Array(moduleData.independent.length).fill(false)};
  const key=`matektutor.g9.kombhal.${moduleData.id}.v1`;
  const [saved,setSaved]=useState<Saved>(empty);
  const [help,setHelp]=useState<Record<number,number>>({});
  const [notice,setNotice]=useState("");
  const [ready,setReady]=useState(false);
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
    if(ok){setSaved(s=>({...s,practiceDone:s.practiceDone.map((v,j)=>j===i?true:v)}));setNotice("Jó. Mehetsz tovább.");}
    else setNotice("Ez még nem egyezik a várt eredménnyel. Nézd meg még egyszer, vagy kérj segítséget.");
  }
  function checkIndependent(i:number){
    const ok=acceptable(saved.independentAnswers[i],moduleData.independent[i][2]);
    setSaved(s=>({...s,independentDone:s.independentDone.map((v,j)=>j===i?ok:v)}));
    setNotice(ok?"Helyes. Ezt segítség nélkül oldottad meg.":"Még nem jó. Ennél a résznél próbáld újra segítség nélkül.");
  }
  function requestHelp(i:number){
    const n=Math.min((help[i]||0)+1,3);setHelp(h=>({...h,[i]:n}));
    setSaved(s=>({...s,helpUsed:s.helpUsed.map((v,j)=>j===i?Math.max(v,n):v)}));
  }
  function reset(){localStorage.removeItem(key);setSaved(empty);setHelp({});setNotice("A modul próbaadatait töröltük.");}
  return <>
    <section className="lessonHeader"><div><div className="eyebrow">9. ÉVFOLYAM • KOMBINATORIKA ÉS HALMAZOK • {moduleData.id}</div><h1>{moduleData.title}</h1><p>{moduleData.goal}</p></div><div className="progressBox"><strong>{pct}%</strong><span>modulhaladás</span></div></section>
    <div className="progressTrack"><span style={{width:`${pct}%`}}/></div>
    {notice&&<div className="notice" onClick={()=>setNotice("")}>{notice}<span>×</span></div>}
    <section className="lessonBlock introBlock"><div className="stepLabel">1. Miért érdekes?</div><h2>Induljunk a jelentésből</h2><p>{moduleData.why}</p><div className="prereqLine"><strong>Jó, ha már megy:</strong> {moduleData.prereq.join(" • ")}</div></section>
    <section className="lessonBlock accentBlock"><div className="stepLabel">2. Megértem</div>{moduleData.concepts.map(([t,b])=><div className="conceptCard" key={t}><h3>{t}</h3><p>{b}</p></div>)}</section>
    <section className="lessonBlock"><div className="stepLabel">3. Együtt megoldjuk</div>{moduleData.guided.map((g,i)=><div className="guidedCard" key={g.prompt}><span>Vezetett példa {i+1}</span><h3>{g.prompt}</h3><ol>{g.steps.map(x=><li key={x}>{x}</li>)}</ol><div className="teacherVoice"><strong>Ellenőrző gondolat:</strong> {g.check}</div></div>)}</section>
    <section className="lessonBlock"><div className="stepLabel">4. Gyakorlok</div><h2>Most te jössz</h2><p>Ha elakadsz, a segítség mindig ugyanabban a három lépésben nyílik ki.</p><div className="taskList">
      {moduleData.practice.map((t,i)=>{const level=help[i]||0;return <article className={`taskCard ${saved.practiceDone[i]?"done":""}`} key={t[0]}><div className="taskTop"><span>{t[0]}</span>{saved.practiceDone[i]&&<b>✓ kész</b>}</div><div className="textQuestion">{t[1]}</div><div className="answerRow"><input className="wideAnswer" value={saved.practiceAnswers[i]} onChange={e=>setSaved(s=>({...s,practiceAnswers:s.practiceAnswers.map((v,j)=>j===i?e.target.value:v)}))} placeholder="Írd ide a válaszod"/><button className="primaryButton" onClick={()=>checkPractice(i)}>Ellenőrzöm</button></div><button className="helpButton" onClick={()=>requestHelp(i)}>{level===0?"Kérek egy tippet":level===1?"Mutasd a következő lépést":level===2?"Mutasd a teljes megoldást":"Teljes megoldás megjelenítve"}</button>{level>=1&&<div className="helpPanel"><strong>Tipp</strong><p>{t[3]}</p></div>}{level>=2&&<div className="helpPanel"><strong>Következő lépés</strong><p>{t[4]}</p></div>}{level>=3&&<div className="helpPanel solution"><strong>Teljes megoldás</strong><p>{t[5]}</p><p><b>Most menj tovább egy új feladatra.</b></p></div>}</article>})}
    </div></section>
    <section className="lessonBlock independentBlock"><div className="stepLabel">5. Megmutatom, hogy megy</div><h2>Két új feladat segítség nélkül</h2><p>Itt első próbálkozásra nincs tipp. Ez mutatja meg, mennyire tudod önállóan használni a tanultakat.</p><div className="taskList compactTasks">{moduleData.independent.map((t,i)=><article className={`taskCard ${saved.independentDone[i]?"done":""}`} key={t[0]}><div className="taskTop"><span>{t[0]}</span>{saved.independentDone[i]&&<b>✓ helyes</b>}</div><div className="textQuestion">{t[1]}</div><div className="answerRow"><input className="wideAnswer" value={saved.independentAnswers[i]} onChange={e=>setSaved(s=>({...s,independentAnswers:s.independentAnswers.map((v,j)=>j===i?e.target.value:v)}))} placeholder="Válasz"/><button className="primaryButton" onClick={()=>checkIndependent(i)}>Ellenőrzöm</button></div></article>)}</div></section>
    <section className="lessonBlock finishBlock"><div className="stepLabel">6. Lezárás</div><h2>{completed?"Ez a modul önállóan is megy.":"Még egy kicsit gyakorolj."}</h2><p>{completed?"Mindkét önálló ellenőrző feladat sikerült.":moduleData.mastery}</p><div className="moduleSummary"><span>Gyakorlás <b>{pDone}/{moduleData.practice.length}</b></span><span>Segítséget kértél <b>{helpCount} feladatnál</b></span><span>Teljes megoldás <b>{fullCount}×</b></span><span>Önálló <b>{iDone}/{moduleData.independent.length}</b></span></div><div className="finishActions"><Link className="secondaryButton linkButton" href="/9-evfolyam">Vissza a témakörhöz</Link>{completed&&nextId&&<Link className="primaryButton linkButton" href={`/9-evfolyam/kombinatorika-halmazok/${nextId.toLowerCase()}`}>Következő modul →</Link>}{completed&&!nextId&&<Link className="primaryButton linkButton" href="/9-evfolyam/kombinatorika-halmazok/mesterfeladat">Mesterfeladat →</Link>}<button className="secondaryButton" onClick={reset}>Modul újrakezdése</button></div></section>
  </>;
}
