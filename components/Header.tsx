import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar topbarV3">
      <Link className="brand brandV3" href="/"><span className="brandMark">M∑</span><span><b>MatekTutor</b><small>érthető matematika</small></span></Link>
      <nav className="topnav" aria-label="Fő navigáció">
        <Link href="/9-evfolyam">9. évfolyam</Link>
        <Link href="/tanar">Tanári nézet</Link>
      </nav>
    </header>
  );
}
