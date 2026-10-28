# MatekTutor – új prototípus v1

Ez nem a korábbi Alpha továbbfejlesztése, hanem egy tiszta koncepcióprototípus.

## Mit tartalmaz?
- egyszerű kezdőlap
- egy teljes tanulói modul: Elsőfokú egyenletek
- vezetett magyarázat
- 5 gyakorlófeladat háromszintű segítséggel
- 2 önálló ellenőrző feladat
- Mesterfeladat feltöltési felülettel és önreflexióval
- tanári nézet a tanulói munka összefoglalására
- gyors tanári visszajelzés prototípusa

## Fontos
A prototípus localStorage-t használ. A feltöltött fájl nem kerül valódi tárhelyre. Kis méretű képfájlnál a böngésző localStorage-jában előnézetet is tárolunk, így a tanári nézetben a kézírásos megoldás megtekinthető; PDF-nél és nagy képnél csak a fájlnév jelenik meg. A következő technikai lépés csak akkor legyen Supabase/bejelentkezés/fájltárolás, ha a felhasználói folyamat pedagógiailag megfelelő.

## Indítás
```bash
npm install
npm run dev
```

## Vercel
A projekt közvetlenül telepíthető Next.js projektként.
