import Header from "@/components/Header";
import TopicOverview from "@/components/TopicOverview";
import data from "@/data/kombinatorika-halmazok.json";

export default function GradeNinePage(){
  const modules=data.modules.map(m=>({id:m.id,title:m.title,goal:m.goal,practiceCount:m.practice.length,independentCount:m.independent.length}));
  return <><Header/><main className="shell lessonShell">
    <section className="gradeHero gradeHeroV3"><div><div className="eyebrow">9. ÉVFOLYAM • 1. TÉMAKÖR</div><h1>Kombinatorika és halmazok</h1><p>Hat egymásra épülő rövid modul. Minden leckében előbb láthatóvá tesszük a matematikai ötletet, utána együtt kipróbáljuk, végül új feladaton ellenőrzöd, hogy már önállóan is megy-e.</p></div><div className="topicBadge"><span>6</span><small>tanulási modul</small></div></section>
    <div className="topicLegend"><span><i className="legendVisual"/>vizuális magyarázat</span><span><i className="legendPractice"/>7 gyakorló feladat</span><span><i className="legendIndependent"/>2 önálló ellenőrzés</span></div>
    <TopicOverview modules={modules}/>
  </main></>;
}
