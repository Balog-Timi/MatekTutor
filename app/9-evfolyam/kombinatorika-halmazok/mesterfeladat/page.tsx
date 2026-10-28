"use client";
import {useEffect,useState, type ChangeEvent} from "react";
import Header from "@/components/Header";
import data from "@/data/kombinatorika-halmazok.json";

const KEY="matektutor.g9.kombhal.master.v1";
type Saved={fileName?:string;preview?:string;confidence?:string;reflection?:string;submitted?:boolean};
export default function MasterPage(){
 const [s,setS]=useState<Saved>({}); const [ready,setReady]=useState(false); const m=data.masterTask;
 useEffect(()=>{try{setS(JSON.parse(localStorage.getItem(KEY)||"{}"));}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready)localStorage.setItem(KEY,JSON.stringify(s));},[s,ready]);
 function file(e:ChangeEvent<HTMLInputElement>){const f=e.target.files?.[0];if(!f)return;setS(x=>({...x,fileName:f.name}));if(f.type.startsWith("image/")&&f.size<1800000){const r=new FileReader();r.onload=()=>setS(x=>({...x,preview:String(r.result)}));r.readAsDataURL(f);}else setS(x=>({...x,preview:undefined}));}
 const can=!!s.fileName&&!!s.confidence;
 return <><Header/><main className="shell lessonShell"><section className="lessonHeader"><div><div className="eyebrow">9. ÉVFOLYAM • TÉMAKÖRI ZÁRÁS</div><h1>{m.title}</h1><p>Mutasd meg, hogy a témakör fogalmait egy új helyzetben is össze tudod kapcsolni.</p></div></section>
 <section className="lessonBlock masterBlock"><div className="stepLabel">A feladat</div>{m.student_text.map(x=><p key={x}>{x}</p>)}<ol className="masterSteps">{m.parts.map(x=><li key={x}>{x.replace(/^\d+\.\s*/,"")}</li>)}</ol></section>
 <section className="lessonBlock"><div className="stepLabel">Beadás</div><h2>Töltsd fel a papíron kidolgozott megoldást</h2><div className="uploadBox"><label className="uploadButton">Fájl kiválasztása<input type="file" accept="image/*,.pdf" onChange={file}/></label><span>{s.fileName||"Még nincs kiválasztott fájl"}</span></div>{s.preview&&<div className="submissionPreview"><strong>Előnézet</strong><img src={s.preview} alt="Feltöltött megoldás előnézete"/></div>}<label className="fieldLabel">Mennyire ment önállóan?<select value={s.confidence||""} onChange={e=>setS(x=>({...x,confidence:e.target.value}))}><option value="">Válassz…</option><option>teljesen önállóan</option><option>kisebb segítséggel</option><option>nehezen</option><option>nem tudtam befejezni</option></select></label><label className="fieldLabel">Melyik lépés volt a legnehezebb?<textarea value={s.reflection||""} onChange={e=>setS(x=>({...x,reflection:e.target.value}))}/></label><button className="submitButton" disabled={!can} onClick={()=>setS(x=>({...x,submitted:true}))}>Mesterfeladat beadása</button>{s.submitted&&<div className="submitted">✓ Beadva – tanári visszajelzésre vár</div>}</section></main></>;
}
