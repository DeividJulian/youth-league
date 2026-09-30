import { club } from "@/content/club";

// SSG
export default function History() {
  return (<><h1>Our history</h1><p>{club.history}</p><span className="badge">SSG</span></>);
}
