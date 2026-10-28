"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ModuleSummary = { id:string; title:string; goal:string; practiceCount:number; independentCount:number };
type Saved = { practiceDone?: boolean[]; independentDone?: boolean[] };

const meta:Record<string,{symbol:string;accent:string;short:string}>={
  K01:{symbol:"≥",accent:"coral",short:"A kis szavak pontos matematikai jelentése"},
  K02:{symbol:"×",accent:"violet",short:"Lehetőségek rendszerezése faábrával"},
  K03:{symbol:"∈",accent:"teal",short:"Elem, halmaz és részhalmaz megkülönböztetése"},
  K04:{symbol:"∪",accent:"blue",short:"Unió, metszet és különbség Venn-diagramon"},
  K05:{symbol:"∩",accent:"amber",short:"Dupla számolás elkerülése logikai szitával"},
  K06:{symbol:"[ ]",accent:"rose",short:"Egyenlőtlenség és intervallum összekapcsolása"}
};

export default function TopicOverview({ modules }:{modules:ModuleSummary[]}) {
  const [state,setState]=useState<Record<string,Saved>>({});
  useEffect(()=>{
    const next:Record<string,Saved>={};
    for(const m of modules){try{ next[m.id]=JSON.parse(localStorage.getItem(`matektutor.g9.kombhal.${m.id}.v1`)||"{}"); }catch{ next[m.id]={}; }}
    setState(next);
  },[modules]);
  const completed=useMemo(()=>modules.filter(m=>{const s=state[m.id]||{};return (s.independentDone?.filter(Boolean).length||0)===m.independentCount;}).length,[modules,state]);
  const pct=Math.round((completed/modules.length)*100);
  return <>
    <section className="topicProgress topicProgressV3"><div><div><span>Témaköri haladás</span><small>Minden modul végén új, segítség nélküli feladatokkal ellenőrzünk.</small></div><strong>{completed}/{modules.length} modul</strong></div><div className="progressTrack topicTrack vividTrack"><span style={{width:`${pct}%`}} /></div></section>
    <div className="moduleGrid moduleGridV3">
      {modules.map((m,i)=>{
        const s=state[m.id]||{}; const p=s.practiceDone?.filter(Boolean).length||0; const t=s.independentDone?.filter(Boolean).length||0; const done=t===m.independentCount; const started=p>0||t>0; const mm=meta[m.id];
        return <Link className={`moduleCard moduleCardV3 accent-${mm.accent} ${done?"moduleDone":""}`} key={m.id} href={`/9-evfolyam/kombinatorika-halmazok/${m.id.toLowerCase()}`}>
          <div className="moduleCardVisual"><span className="moduleBigSymbol">{mm.symbol}</span><span className="moduleIndex">{String(i+1).padStart(2,"0")}</span></div>
          <div className="moduleTop"><span>{m.id}</span><b>{done?"✓ Kész":started?"Folyamatban":"Új"}</b></div>
          <h2>{m.title}</h2><p className="moduleShort">{mm.short}</p>
          <div className="moduleMeta"><span><b>{p}</b>/{m.practiceCount} gyakorlás</span><span><b>{t}</b>/{m.independentCount} önálló</span></div>
          <strong className="moduleCta">{done?"Újra átnézem →":"Belépek a modulba →"}</strong>
        </Link>;
      })}
    </div>
    <Link className={`masterCard masterCardV3 ${completed===modules.length?"masterReady":""}`} href="/9-evfolyam/kombinatorika-halmazok/mesterfeladat">
      <div className="masterSymbol">★</div><div><div className="eyebrow">TÉMAKÖRI ZÁRÁS</div><h2>Mesterfeladat</h2><p>Egy valós helyzetben együtt használod a halmazokat, a logikai szitát és az intervallumokat. A teljes levezetést papíron is elkészítheted.</p></div><strong>{completed===modules.length?"Kezdheted →":"Megnézem →"}</strong>
    </Link>
  </>;
}
