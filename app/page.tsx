import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return <><Header/><main className="shell hero heroV3">
    <section className="homeHeroGrid">
      <div><div className="eyebrow">MATEKTUTOR • 9. ÉVFOLYAM</div><h1>Ne csak megoldd.<br/><span>Értsd is, miért működik.</span></h1><p className="lead">Vizuális magyarázatok, vezetett gondolkodás, fokozatos segítség és valódi önálló ellenőrzés. A tanulás végén nem pontszámot kapsz, hanem azt látod, mi megy már és mit érdemes még gyakorolni.</p><div className="heroActions"><Link className="primaryButton linkButton" href="/9-evfolyam">Kezdem a 9. évfolyamot →</Link><Link className="secondaryButton linkButton" href="/tanar">Tanári nézet</Link></div></div>
      <div className="homeVisual">
        <div className="floatingFormula f1">A ∪ B</div><div className="floatingFormula f2">x ≥ 5</div><div className="floatingFormula f3">3 × 2 = 6</div>
        <div className="homeVisualCard"><span>Most tanulható</span><strong>Kombinatorika<br/>és halmazok</strong><div className="miniVenn"><i/><i/></div><p>6 modul • vizuális szemléltetés • Mesterfeladat</p></div>
      </div>
    </section>
    <section className="homePromise"><div><b>01</b><strong>Megértem</strong><span>ábra + egyszerű magyarázat</span></div><div><b>02</b><strong>Együtt megoldjuk</strong><span>lépésről lépésre</span></div><div><b>03</b><strong>Gyakorlok</strong><span>fokozatos segítséggel</span></div><div><b>04</b><strong>Önállóan bizonyítok</strong><span>új feladaton</span></div></section>
  </main></>;
}
