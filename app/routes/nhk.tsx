import type { MetaFunction } from "@remix-run/cloudflare";
import { today, Header, Newsss } from "../lib"

export const meta: MetaFunction = () => {
  return [
    { title: "news of " + today() },
  ];
};

export default function Index() {
  const date = today()
  return (
    <div>
      <Header date={date}/>
      <Newsss source="https://news_with_ai.sparkling-sun-23d2.workers.dev/"/>
    </div>
  );
}