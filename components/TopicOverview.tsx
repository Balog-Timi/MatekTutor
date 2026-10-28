"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ModuleSummary = { id:string; title:string; goal:string; practiceCount:number; independentCount:number };
type Saved = { practiceDone?: boolean[]; independentDone?: boolean[] };

export default function TopicOverview({ modules }:{modules:ModuleSummary[]}) {
  const [state,setState]=useState<Record<string,Saved>>({});
  useEffect(()=>{
    const next:Record<string,Saved>={};
    for(const m of modules){
      try{ next[m.id]=JSON.parse(localStorage.getItem(`matektutor.g9.kombhal.${m.id}.v1`)||"{}"); }catch{ next[m.id]={}; }
    }
    setState(next);
  },[modules]);
  const completed=useMemo(()=>modules.filter(m=>{
    const s=state[m.id]||{};
    return (s.independentDone?.filter(Boolean).length||0)===m.independentCount;
  }).length,[modules,state]);
  const pct=Math.round((completed/modules.length)*100);
  return <>
    <section className="topicProgress"><div><span>Témaköri haladás</span><strong>{completed}/{modules.length} modul</strong></div><div className="progressTrack topicTrack"><span style={{width:`${pct}%`}} /></div></section>
    <div className="moduleGrid">
      {modules.map((m,i)=>{
        const s=state[m.id]||{};
        const p=s.practiceDone?.filter(Boolean).length||0;
        const t=s.independentDone?.filter(Boolean).length||0;
        const done=t===m.independentCount;
        const started=p>0||t>0;
        return <Link className={`moduleCard ${done?"moduleDone":""}`} key={m.id} href={`/9-evfolyam/kombinatorika-halmazok/${m.id.toLowerCase()}`}>
          <div className="moduleTop"><span>{String(i+1).padStart(2,"0")}</span><b>{done?"✓ Kész":started?"Folyamatban":"Még nem kezdted"}</b></div>
          <div className="moduleCode">{m.id}</div>
          <h2>{m.title}</h2>
          <p>{m.goal}</p>
          <div className="moduleMeta"><span>Gyakorlás {p}/{m.practiceCount}</span><span>Önálló {t}/{m.independentCount}</span></div>
          <strong className="moduleCta">{done?"Újra átnézem →":"Tanulás →"}</strong>
        </Link>;
      })}
    </div>
    <Link className={`masterCard ${completed===modules.length?"masterReady":""}`} href="/9-evfolyam/kombinatorika-halmazok/mesterfeladat">
      <div><div className="eyebrow">TÉMAKÖRI ZÁRÁS</div><h2>Mesterfeladat</h2><p>Kapcsold össze a halmazokat, a logikai szitát és az intervallumokat egy valós helyzetben.</p></div>
      <strong>{completed===modules.length?"Kezdheted →":"Megnézem →"}</strong>
    </Link>
  </>;
}
