import { club } from "@/content/club";

// SSG: no dynamic data -> prerendered at build time.
export default function Home() {
  return (<><h1>{club.name}</h1><p>{club.history}</p><span className="badge">SSG</span></>);
}
