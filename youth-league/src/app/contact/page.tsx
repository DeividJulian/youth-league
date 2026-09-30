import { club } from "@/content/club";

// SSG
export default function Contact() {
  const c = club.contact;
  return (<><h1>Contact</h1><p>{c.email}<br />{c.phone}<br />{c.address}</p><span className="badge">SSG</span></>);
}
