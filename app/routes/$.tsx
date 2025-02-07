import { useParams } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/cloudflare";
import { today, Header, Newsss } from "../lib"

export const meta: MetaFunction = () => {
  const params = useParams();
  const date = params['*'] as string
  return [
    { title: "Yahoo: " + date },
  ];
};

export default function Index() {
    const params = useParams();
    const date = params['*'] as string
  return (
    <div>
      <Header date={date}/>
      <Newsss source={"https://news_with_ai.sparkling-sun-23d2.workers.dev/" + date}/>
    </div>
  );
}

