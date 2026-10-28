import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ModuleLesson from "@/components/ModuleLesson";
import data from "@/data/kombinatorika-halmazok.json";

export function generateStaticParams(){return data.modules.map(m=>({moduleId:m.id.toLowerCase()}));}
export default async function ModulePage({params}:{params:Promise<{moduleId:string}>}){
  const {moduleId}=await params;
  const idx=data.modules.findIndex(m=>m.id.toLowerCase()===moduleId.toLowerCase());
  if(idx<0) notFound();
  const m=data.modules[idx];
  const nextId=idx<data.modules.length-1?data.modules[idx+1].id:null;
  return <><Header/><main className="shell lessonShell"><ModuleLesson moduleData={m as any} nextId={nextId}/></main></>;
}
