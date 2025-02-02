import { useParams } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/cloudflare";
import { today, Header, Newsss } from "../lib"

export const meta: MetaFunction = () => {
  const params = useParams();
  const date = params['*'] as string
  return [
    { title: "news of " + date },
  ];
};

export default function Index() {
    const params = useParams();
    const date = params['*'] as string
  return (
    <div>
      <Header date={date}/>
      <Newsss date={date}/>
    </div>
  );
}

