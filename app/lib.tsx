import { useState, Suspense } from "react";
import { Await } from "@remix-run/react";

async function backend_resources() {
  const data = await fetch("https://news_with_ai.sparkling-sun-23d2.workers.dev/resources")
  return await data.json() as [{path: string, name: string}]
}

export function Header({date}: {date: string}) {
  const need_next = today() != date
  const is_date = /^\d{8}$/.test(date)
  const b = beforeday(date)
  const n = nextday(date)
  const resources = backend_resources()
  return (
    <header>
      <img src="/rabbit.png" style={{display: "block", margin: "-64px auto 0"}} width="256" height="256"/>
      <h1 className="title has-text-centered">news of {date}</h1>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul style={{justifyContent: "center"}}>
          { is_date ? <li><a href={"/" + b}>{b}</a></li> : null }
          { is_date && need_next ? <li><a href={"/" + n}>{n}</a></li> : null }
        </ul>
      </nav>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul style={{justifyContent: "center"}}>
          <li><a href="/">Yahoo News</a></li>
          <Suspense fallback={<li>配達中です。。。</li>}>
            <Await resolve={resources} errorElement={<li>バックエンド死んでるかも。</li>}>
              {(resources) => resources.map((item, i) => (
                <li key={item.path}><a href={"/" + item.path}>{item.name}</a></li> 
              ))}
            </Await>
          </Suspense>
        </ul>
      </nav>
      <p></p>
    </header>
  )
}

function News({item}: {item: {title: string, link: string, detail: string, category: string}}) {
  let [detail_visible, set_detail_visible] = useState(false);
  return (
    <article className="message" id={item.title}>
      <div className="message-body">
        <div className="fixed-grid has-8-cols" onClick={() => set_detail_visible(!detail_visible)}>
          <div className="grid">
            <div className="cell is-col-span-7">
              <a href={"#" + item.title}>#</a>
              <h2 style={{display: 'inline'}}>　{item.title}</h2>
            </div>
            {
              detail_visible
              ? <h2 className="cell has-text-right">v</h2>
              : <h2 className="cell has-text-right">&lt;</h2>
            }
          </div>
        </div>
        {
          detail_visible
          ? (
            <div>
              {/* <p>category: {item.category}</p> */}
              <p>{"> " + item.detail}</p>
              <a href={item.link} target="_blank">{"> " + item.link}</a>
            </div>
          )
          : null
        }
      </div>
    </article>
  )
}

export function Newsss({source}: {source: string}) {
  const newsss_p = get_newsss(source)
  return (
    <Suspense fallback={<div>走り回っています。。。</div>}>
      <Await resolve={newsss_p} errorElement={<div>なんかダメだったみたいです。</div>}>
        {(newsss) =>
          newsss.map((item, i) => (
            <News item={item} key={item.title}/>
          ))
        }
      </Await>
    </Suspense>
  )
}

export function today() {
  // 日本時間を取得: https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97#%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%82%92%E4%BD%BF%E3%81%86
  const dt = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  const y = dt.getFullYear();
  const m = ('00' + (dt.getMonth() + 1)).slice(-2);
  const d = ('00' + dt.getDate()).slice(-2);
  return y + m + d;
}

export function nextday(p: string) {
    const dt = new Date(parseInt(p.slice(0, 4)), parseInt(p.slice(4, 6)) - 1, parseInt(p.slice(6, 8)));
    dt.setDate(dt.getDate() + 1);
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth() + 1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return y + m + d
}

export function beforeday(p: string) {
    const dt = new Date(parseInt(p.slice(0, 4)), parseInt(p.slice(4, 6)) - 1, parseInt(p.slice(6, 8)));
    dt.setDate(dt.getDate() - 1);
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth() + 1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return y + m + d
}

async function get_newsss(url: string) {
  const res = await fetch(url);
  const json = await res.json() as [{title: string, link: string, detail: string, category: string}];
  return json;
}

