export const lessonEnrichment:Record<string,{hook:string;teacherTip:string;conceptLead:string;remember:string;accent:string;symbol:string}>={
  K01:{
    hook:"A matekban néha egyetlen szó dönti el, hogy egy válasz jó vagy rossz. A „legalább” és a „több mint” például nem ugyanaz.",
    teacherTip:"Mindig próbáld ki a határértéket. Ha a mondatban szereplő szám maga is megengedett, akkor ≥ vagy ≤ jelre lesz szükség.",
    conceptLead:"Ne a jeleket próbáld bemagolni. Előbb mondd ki hétköznapi nyelven, mely számok férnek bele — utána válaszd ki a jelet.",
    remember:"A határérték próbája sok hibát azonnal leleplez.",accent:"coral",symbol:"≥"
  },
  K02:{
    hook:"Amikor sok lehetőség van, az emberi szem hamar kihagy vagy kétszer számol valamit. A cél nem a gyors számolás, hanem a jó rendszerezés.",
    teacherTip:"Tedd fel a kérdést: egymás UTÁN hozok döntéseket, vagy egymást KIZÁRÓ esetek közül választok? Ez dönti el, hogy inkább szorzás vagy összeadás kell.",
    conceptLead:"A faábra azért jó, mert minden teljes út egy teljes lehetőség. Ha az utak száma látható, a képlet is érthetővé válik.",
    remember:"Egymás utáni választásoknál gyakran szorzunk; egymást kizáró eseteknél gyakran összeadunk.",accent:"violet",symbol:"×"
  },
  K03:{
    hook:"A halmaz nem egyszerűen egy lista: azt mondja meg, kik vagy mik tartoznak egy közös csoportba.",
    teacherTip:"Az ∈ jel két oldalán nem ugyanaz a típus áll: balra egy elem, jobbra egy halmaz. A ⊆ jelnél viszont mindkét oldalon halmaz van.",
    conceptLead:"Minden feladatnál először kérdezd meg: egyetlen elemről beszélünk, vagy egy egész kisebb halmazról?",
    remember:"5 ∈ A, de {1,5} ⊆ A — az egyik tagság, a másik részhalmaz-kapcsolat.",accent:"teal",symbol:"∈"
  },
  K04:{
    hook:"Két csoport átfedhet. A kérdés mindig az: mindenkit keresünk, a közösakat, vagy csak az egyik oldal embereit?",
    teacherTip:"Fordítsd le a műveletet egy magyar szóra: ∪ = VAGY, ∩ = ÉS, A\\B = A-BÓL CSAK AZ, AKI B-BEN NINCS.",
    conceptLead:"A Venn-diagramon ne a jelet nézd először, hanem színezd ki azt a területet, amelyről a mondat beszél.",
    remember:"Unió: legalább az egyik. Metszet: mindkettő. Különbség: csak az elsőből.",accent:"blue",symbol:"∪"
  },
  K05:{
    hook:"Ha valaki két csoportba is tartozik, könnyű kétszer megszámolni. A logikai szita pontosan ezt a dupla számolást javítja ki.",
    teacherTip:"Mindig a közös résszel kezdd. Ha az a helyén van, a „csak A”, „csak B” és „egyik sem” már egyszerű kivonás.",
    conceptLead:"A formula nem varázslat: |A|+|B| kétszer számolja a közös embereket, ezért egy közös részt vissza kell vonnunk.",
    remember:"Összeadjuk a két csoportot, majd egyszer levonjuk a közös részt.",accent:"amber",symbol:"∩"
  },
  K06:{
    hook:"Az intervallum egy teljes számtartomány rövid leírása. A zárójelek azt mondják meg, hogy a határpontok bent vannak-e.",
    teacherTip:"Ellenőrizd külön a két végpontot: megengedett? Ha igen, zárt; ha nem, nyílt. A ±∞ oldala mindig nyílt.",
    conceptLead:"Kapcsold össze a három megjelenést: mondat ↔ egyenlőtlenség ↔ számegyenes/intervallum. Ha egyikből a másikba át tudod fordítani, tényleg érted.",
    remember:"Zárt végpont = benne van. Nyílt végpont = nincs benne.",accent:"rose",symbol:"[ ]"
  }
};
