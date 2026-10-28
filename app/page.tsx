import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="shell hero">
        <div className="eyebrow">ÚJ MATEKTUTOR • KONCEPCIÓPROTOTÍPUS</div>
        <h1>Értsd meg. Gyakorold. Tudd használni.</h1>
        <p className="lead">Most csak egyetlen témát próbálunk ki teljesen: az elsőfokú egyenleteket. A cél az, hogy a tanulási út első pillantásra érthető legyen.</p>
        <div className="choiceGrid">
          <Link className="choiceCard primaryCard" href="/tanulas/elsofoku-egyenletek">
            <span className="choiceIcon">∑</span>
            <h2>Tanulni szeretnék</h2>
            <p>Magyarázat, közös példák, gyakorlás és Mesterfeladat.</p>
            <strong>Elsőfokú egyenletek →</strong>
          </Link>
          <Link className="choiceCard" href="/tanar">
            <span className="choiceIcon">✓</span>
            <h2>Tanári nézet</h2>
            <p>Nézd meg, mit látna a tanár a tanuló munkájából.</p>
            <strong>Tanári felület →</strong>
          </Link>
        </div>
        <div className="prototypeNote">
          <strong>Mit tesztelünk most?</strong>
          <span>Nem a teljes rendszert. Csak azt, hogy ez az egy modul már átlátható, tanítható és természetes-e.</span>
        </div>
      </main>
    </>
  );
}
