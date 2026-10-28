import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">MatekTutor</Link>
      <nav className="topnav" aria-label="Fő navigáció">
        <Link href="/tanulas/elsofoku-egyenletek">Diák nézet</Link>
        <Link href="/tanar">Tanári nézet</Link>
      </nav>
    </header>
  );
}
