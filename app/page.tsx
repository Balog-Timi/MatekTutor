import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="shell hero">
        <div className="eyebrow">MATEKTUTOR • 9. ÉVFOLYAM</div>
        <h1>Értsd meg. Gyakorold. Tudd használni.</h1>
        <p className="lead">A 9. évfolyam első teljes témaköre már tanulható: Kombinatorika és halmazok. Rövid magyarázatok, vezetett példák, gyakorlás, önálló ellenőrzés és témaköri Mesterfeladat.</p>
        <div className="choiceGrid">
          <Link className="choiceCard primaryCard" href="/9-evfolyam">
            <span className="choiceIcon">9</span>
            <h2>9. évfolyam</h2>
            <p>Kezdd el a Kombinatorika és halmazok témakört, és haladj modulról modulra.</p>
            <strong>Témakör megnyitása →</strong>
          </Link>
          <Link className="choiceCard" href="/tanar">
            <span className="choiceIcon">✓</span>
            <h2>Tanári nézet</h2>
            <p>Lásd egy helyen a modulhaladást, a segítségkéréseket és a Mesterfeladatot.</p>
            <strong>Tanári felület →</strong>
          </Link>
        </div>
        <div className="prototypeNote"><strong>Most ezt teszteljük</strong><span>Nem a teljes 9. évfolyamot egyszerre. Először ezt az egy teljes témakört akarjuk pedagógiailag nagyon jóra megcsinálni.</span></div>
      </main>
    </>
  );
}
