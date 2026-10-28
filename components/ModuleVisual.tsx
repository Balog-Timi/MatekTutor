"use client";

import { useState, type ReactNode } from "react";

type Props={moduleId:string};

export default function ModuleVisual({moduleId}:Props){
  if(moduleId==="K01") return <K01Visual/>;
  if(moduleId==="K02") return <K02Visual/>;
  if(moduleId==="K03") return <K03Visual/>;
  if(moduleId==="K04") return <K04Visual/>;
  if(moduleId==="K05") return <K05Visual/>;
  if(moduleId==="K06") return <K06Visual/>;
  return null;
}

function VisualFrame({kicker,title,children,caption}:{kicker:string;title:string;children:ReactNode;caption:string}){
  return <div className="visualFrame">
    <div className="visualHeader"><div><span>{kicker}</span><h3>{title}</h3></div><div className="visualSpark">✦</div></div>
    <div className="visualCanvas">{children}</div>
    <p className="visualCaption">{caption}</p>
  </div>;
}

function K01Visual(){
  const [mode,setMode]=useState<"least"|"most">("least");
  const least=mode==="least";
  return <VisualFrame kicker="SZÓ → JELENTÉS" title="A kis szavak változtatják meg a teljes állítást" caption={least?"A 5 is benne van: ezért ≥ és nem >.":"A 5 is benne van: ezért ≤ és nem <."}>
    <div className="toggleRow"><button className={least?"active":""} onClick={()=>setMode("least")}>legalább 5</button><button className={!least?"active":""} onClick={()=>setMode("most")}>legfeljebb 5</button></div>
    <div className="bigMath">x {least?"≥":"≤"} 5</div>
    <div className="numberLine" aria-label="számegyenes">
      <div className="numberLineTrack"/><div className={`numberLineShade ${least?"shadeRight":"shadeLeft"}`}/>
      {[1,2,3,4,5,6,7,8,9].map(n=><div key={n} className={`tick t${n}`}><i className={n===5?"closedDot":""}/><span>{n}</span></div>)}
    </div>
    <div className="microCompare"><span className="okChip">✓ {least?"5, 6, 20":"5, 4, −3"}</span><span className="noChip">× {least?"4, 0, −2":"6, 20, 100"}</span></div>
  </VisualFrame>;
}

function K02Visual(){
  const [shirt,setShirt]=useState(0);
  const colors=["Korall","Kék","Zöld"];
  return <VisualFrame kicker="RENDSZEREZETT SZÁMLÁLÁS" title="Ne találgass: lásd a választások szerkezetét" caption="3 póló × 2 nadrág = 6 különböző összeállítás. Minden első választáshoz ugyanannyi folytatás tartozik.">
    <div className="outfitPickers">
      {colors.map((c,i)=><button key={c} className={shirt===i?"active":""} onClick={()=>setShirt(i)}>{c} póló</button>)}
    </div>
    <div className="treeDiagram">
      <div className="treeRoot">Póló</div>
      <div className="treeBranches">{colors.map((c,i)=><div key={c} className={`treeBranch ${shirt===i?"selected":""}`}><div className="branchLabel">{c}</div><div className="subBranches"><span>Világos nadrág</span><span>Sötét nadrág</span></div></div>)}</div>
    </div>
    <div className="countEquation"><b>3</b><span>póló</span><em>×</em><b>2</b><span>nadrág</span><em>=</em><strong>6</strong><span>lehetőség</span></div>
  </VisualFrame>;
}

function K03Visual(){
  const [show,setShow]=useState<"element"|"subset">("element");
  return <VisualFrame kicker="ELEM VAGY HALMAZ?" title="Az ∈ és a ⊆ két külön kérdést tesz fel" caption={show==="element"?"Az 5 egyetlen elem. Azt kérdezzük: benne van-e A-ban?":"A {1,5} maga is egy halmaz. Azt kérdezzük: minden eleme benne van-e A-ban?"}>
    <div className="toggleRow"><button className={show==="element"?"active":""} onClick={()=>setShow("element")}>5 ∈ A</button><button className={show==="subset"?"active":""} onClick={()=>setShow("subset")}>{"{1,5} ⊆ A"}</button></div>
    <div className="setStage">
      <div className="setCircle"><span className="setName">A</span>{[1,3,5,7].map(n=><i key={n} className={`setItem item${n}`}>{n}</i>)}</div>
      <div className="setStatement">{show==="element"?<><b>5</b><strong>∈</strong><span>A</span></>:<><b>{"{1,5}"}</b><strong>⊆</strong><span>A</span></>}</div>
    </div>
  </VisualFrame>;
}

function K04Visual(){
  const [mode,setMode]=useState<"union"|"intersection"|"diff">("union");
  return <VisualFrame kicker="VENN-DIAGRAM" title="VAGY, ÉS, CSAK — három különböző terület" caption={mode==="union"?"A ∪ B: minden, ami legalább az egyik halmazban benne van.":mode==="intersection"?"A ∩ B: csak a közös rész.":"A \\ B: A-ból csak az marad, ami B-ben nincs benne."}>
    <div className="toggleRow"><button className={mode==="union"?"active":""} onClick={()=>setMode("union")}>A ∪ B</button><button className={mode==="intersection"?"active":""} onClick={()=>setMode("intersection")}>A ∩ B</button><button className={mode==="diff"?"active":""} onClick={()=>setMode("diff")}>A \\ B</button></div>
    <svg className="vennSvg" viewBox="0 0 520 270" role="img" aria-label="Venn-diagram">
      <defs><clipPath id="clipB"><circle cx="315" cy="135" r="92"/></clipPath></defs>
      <circle cx="215" cy="135" r="92" className="vennOutline"/><circle cx="315" cy="135" r="92" className="vennOutline"/>
      {mode==="union"&&<><circle cx="215" cy="135" r="92" className="vennFill"/><circle cx="315" cy="135" r="92" className="vennFill"/></>}
      {mode==="intersection"&&<circle cx="215" cy="135" r="92" className="vennFillStrong" clipPath="url(#clipB)"/>}
      {mode==="diff"&&<><circle cx="215" cy="135" r="92" className="vennFillStrong"/><circle cx="315" cy="135" r="92" className="vennKnockout"/></>}
      <text x="158" y="52" className="vennLabel">A</text><text x="365" y="52" className="vennLabel">B</text>
      <text x="175" y="140" className="vennNumber">1, 2</text><text x="252" y="140" className="vennNumber">3, 4</text><text x="355" y="140" className="vennNumber">5</text>
    </svg>
  </VisualFrame>;
}

function K05Visual(){
  const [step,setStep]=useState(0);
  const texts=["Először tedd a közös részt középre.","Ezután vond ki a közös részt mindkét teljes csoportból.","Végül add össze a három belső tartományt — így senkit sem számolsz kétszer."];
  return <VisualFrame kicker="LOGIKAI SZITA" title="A közös részt csak egyszer szabad megszámolni" caption={texts[step]}>
    <div className="stepDots">{[0,1,2].map(i=><button key={i} onClick={()=>setStep(i)} className={step===i?"active":""}>{i+1}</button>)}</div>
    <svg className="vennSvg countVenn" viewBox="0 0 560 300">
      <circle cx="225" cy="145" r="100" className="vennFillSoft"/><circle cx="335" cy="145" r="100" className="vennFillSoft second"/>
      <circle cx="225" cy="145" r="100" className="vennOutline"/><circle cx="335" cy="145" r="100" className="vennOutline"/>
      <text x="150" y="145" className="countNum">12</text><text x="269" y="145" className="countNum emphasis">6</text><text x="385" y="145" className="countNum">8</text><text x="272" y="270" className="outsideNum">4 egyik sem</text>
      <text x="150" y="54" className="vennLabel">Foci</text><text x="365" y="54" className="vennLabel">Kosár</text>
    </svg>
    <div className="formulaRibbon"><span>|A ∪ B|</span><b>=</b><span>|A|</span><b>+</b><span>|B|</span><b>−</b><span>|A ∩ B|</span></div>
  </VisualFrame>;
}

function K06Visual(){
  const [mode,setMode]=useState<0|1>(0);
  return <VisualFrame kicker="INTERVALLUM" title="A végpontnál dől el, hogy a szám benne van-e" caption={mode===0?"[2;7[ azt jelenti: 2 benne van, 7 már nincs benne.":"]−∞;3] azt jelenti: minden 3-nál kisebb vagy egyenlő szám."}>
    <div className="toggleRow"><button className={mode===0?"active":""} onClick={()=>setMode(0)}>[2;7[</button><button className={mode===1?"active":""} onClick={()=>setMode(1)}>]−∞;3]</button></div>
    <div className="intervalStage">
      <div className="intervalLine"/><div className={`intervalShade ${mode===0?"finite":"leftInfinite"}`}/>
      {[-2,-1,0,1,2,3,4,5,6,7,8].map((n,i)=><div key={n} className="intervalTick" style={{left:`${5+i*9}%`}}><i/><span>{n}</span></div>)}
      {mode===0?<><div className="endpoint closed" style={{left:"41%"}}/><div className="endpoint open" style={{left:"86%"}}/></>:<div className="endpoint closed" style={{left:"50%"}}/>}
    </div>
    <div className="intervalTranslation">{mode===0?<><b>2 ≤ x &lt; 7</b><span>bal végpont bent • jobb végpont kint</span></>:<><b>x ≤ 3</b><span>a végtelen soha nem „benne lévő végpont”</span></>}</div>
  </VisualFrame>;
}
