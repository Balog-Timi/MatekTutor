import Header from "@/components/Header";
import TopicOverview from "@/components/TopicOverview";
import data from "@/data/kombinatorika-halmazok.json";

export default function GradeNinePage(){
  const modules=data.modules.map(m=>({id:m.id,title:m.title,goal:m.goal,practiceCount:m.practice.length,independentCount:m.independent.length}));
  return <><Header/><main className="shell lessonShell">
    <section className="gradeHero"><div className="eyebrow">9. ÉVFOLYAM</div><h1>Kombinatorika és halmazok</h1><p>Hat rövid modul. Nem kell egyszerre mindent megtanulni: haladj sorban, és minden modul végén ellenőrizd, megy-e már önállóan.</p></section>
    <TopicOverview modules={modules}/>
  </main></>;
}
