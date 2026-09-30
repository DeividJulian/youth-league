import { club } from "@/content/club";

// SSG
export default function Rules() {
  return (<><h1>League rules</h1><ul>{club.rules.map((r) => <li key={r}>{r}</li>)}</ul><span className="badge">SSG</span></>);
}
