import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">MatekTutor</Link>
      <nav className="topnav" aria-label="Fő navigáció">
        <Link href="/9-evfolyam">9. évfolyam</Link>
        <Link href="/tanar">Tanári nézet</Link>
      </nav>
    </header>
  );
}
