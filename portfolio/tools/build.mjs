import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const output = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
const filmURL = "https://www.youtube.com/watch?v=UO7nAK1CInE";
const channelURL = "https://www.youtube.com/@user-yannlody";
const arrow =
  '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 27 27 5M5 5h22v22" stroke="currentColor" stroke-width="1.5"/></svg>';
const globe =
  '<svg class="globe" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="27"/><ellipse cx="32" cy="32" rx="13" ry="27"/><path d="M5 32h54M10 17c13 7 31 7 44 0M10 47c13-7 31-7 44 0"/></svg>';
const star =
  '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M40 0c0 27-13 40-40 40 27 0 40 13 40 40 0-27 13-40 40-40C53 40 40 27 40 0Z" fill="currentColor"/></svg>';
const routes = {
  home: "",
  work: "work/",
  about: "about/",
  contact: "contact/",
  film: "work/gakjil/",
  archive: "archive/",
  styleguide: "styleguide/",
};
const external = 'target="_blank" rel="noopener noreferrer"';

function context(depth = 0, prefix = "") {
  const base = prefix || (depth ? "../".repeat(depth) : "./");
  return {
    base,
    href: (page) => base + routes[page],
    asset: (name) => base + "assets/" + name,
  };
}
function pill(text, href, extra = "") {
  return `<a class="pill" href="${href}" ${extra} data-magnetic><span data-magnetic-text>${text}</span></a>`;
}
function circle(text, href, extra = "") {
  return `<a class="circle-button" href="${href}" ${extra} data-magnetic><span data-magnetic-text>${text}</span></a>`;
}
function header(c, page) {
  const links = ["work", "about", "contact"]
    .map(
      (p) =>
        `<a href="${c.href(p)}" data-transition ${page === p ? 'aria-current="page"' : ""}><span>${p[0].toUpperCase() + p.slice(1)}</span></a>`,
    )
    .join("");
  return `<a class="skip-link" href="#main">본문으로 건너뛰기</a>
  <header class="site-header"><a class="wordmark" href="${c.href("home")}" data-transition aria-label="이승연 포트폴리오 홈"><span class="copyright">©</span><span class="wordmark-window"><span>Film by 이승연</span></span></a><nav class="desktop-nav" aria-label="주 메뉴">${links}</nav><button class="mobile-menu" type="button" data-menu-open aria-controls="navigation" aria-haspopup="dialog"><span class="small-dot"></span> Menu</button></header>
  <button class="menu-toggle" data-menu-open type="button" aria-label="메뉴 열기" aria-haspopup="dialog" aria-controls="navigation"><span></span><span></span></button>
  <dialog id="navigation" class="nav-drawer" aria-label="사이트 메뉴"><div class="nav-panel"><button class="menu-close" type="button" data-menu-close aria-label="메뉴 닫기"><span></span><span></span></button><p class="eyebrow">Navigation</p><nav aria-label="전체 메뉴">${["home", "work", "about", "contact"].map((p, i) => `<a href="${c.href(p)}" data-transition style="--link-index:${i}" ${page === p ? 'aria-current="page"' : ""}>${p[0].toUpperCase() + p.slice(1)}</a>`).join("")}</nav><div class="drawer-social"><p class="eyebrow">Elsewhere</p><a href="${channelURL}" ${external}>YouTube ↗</a></div></div></dialog>`;
}
function colophon() {
  return `<div class="colophon"><div><p class="eyebrow">Version</p><p><span data-year>2026</span> © Edition</p></div><div><p class="eyebrow">Local time</p><p class="local-time" data-local-time>Seoul · KST</p></div><div class="colophon-social"><p class="eyebrow">Socials</p><a href="${channelURL}" ${external}>YouTube ↗</a></div></div>`;
}
function footer(c, compact = false) {
  if (compact)
    return `<footer class="site-footer compact-footer">${colophon()}</footer>`;
  return `<footer class="site-footer" data-footer-curve><div class="footer-curve" aria-hidden="true"></div><div class="container footer-content"><div class="footer-heading" data-reveal><h2><span class="film-orb" aria-hidden="true">${star}</span>Let’s make<br>something move.</h2><span class="footer-arrow" aria-hidden="true">${arrow}</span></div><div class="footer-line">${circle("Get in touch", c.href("contact"), "data-transition")}</div><div class="footer-links">${pill("Contact ↗", c.href("contact"), "data-transition")}${pill("YouTube ↗", channelURL, external)}</div></div>${colophon()}</footer>`;
}
function preview(c, id = "film-preview", eager = false) {
  return `<div class="film-preview"><div class="preview-media"><a class="preview-link" href="${filmURL}" ${external} aria-label="각질 전체 영상을 YouTube에서 보기 — 새 탭"><img id="${id}" data-preview src="${c.asset("youtube-thumbnail.jpg")}" data-still-src="${c.asset("youtube-thumbnail.jpg")}" data-motion-src="${c.asset("gakjil-preview.gif")}" width="1280" height="720" alt="단편영화 각질 공식 유튜브 썸네일" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}></a></div><div class="preview-caption"><span>각질 · SHORT FILM · 2026</span><button type="button" data-preview-toggle aria-controls="${id}" aria-pressed="false"><span aria-hidden="true">↻</span> <span data-preview-text>미리보기 재생</span></button></div></div>`;
}
function project(c, { home = false } = {}) {
  return `<article class="project" data-category="film"><div class="project-grid-media">${preview(c, home ? "home-film" : "work-film")}</div><a class="work-row" href="${c.href("film")}" data-transition data-cursor-preview="${c.asset("youtube-thumbnail.jpg")}" data-cursor-motion="${c.asset("gakjil-preview.gif")}" data-cursor-label="View"><h2>각질</h2><span class="work-location">대한민국</span><span class="work-category">Short film</span><span class="work-year">2026</span><span class="row-arrow" aria-hidden="true">${arrow}</span></a><div class="project-grid-meta"><span>14′ 26″</span><a href="${c.href("film")}" data-transition>작품 소개 ↗</a></div></article>`;
}
function home(c) {
  return `<section class="hero"><img class="hero-image" src="${c.asset("stills/gakjil-two-shot.jpg")}" width="720" height="311" alt="단편영화 각질의 두 인물이 마주하는 장면" fetchpriority="high"><div class="hero-shade"></div><div class="location-badge"><span>서울예술대학교<br>재학 중</span><span class="globe-disc">${globe}</span></div><div class="hero-profession"><span class="hero-arrow">${arrow}</span><p>Film &<br>Music Video</p></div><h1 class="sr-only">이승연 — Film & Music Video</h1><div class="hero-marquee" aria-hidden="true"><div class="marquee-track" data-marquee><span>이승연 — 이승연 —&nbsp;</span><span>이승연 — 이승연 —&nbsp;</span></div></div><div class="hero-bottom"><span>PORTFOLIO — 2026</span><a href="#introduction" aria-label="소개로 스크롤">Scroll to explore <span>↓</span></a><span>〈각질〉 중에서</span></div></section>
  <section class="home-intro container section-pad" id="introduction"><h2 data-reveal>영화와 음악,<br>그 사이의 장면들.</h2><div class="intro-aside"><p data-reveal>이승연의 영상 포트폴리오.<br>서울예술대학교에서 시작해<br>다음 장면으로 이어집니다.</p>${circle("About me", c.href("about"), "data-transition")}</div></section>
  <section class="home-work wide-container"><p class="eyebrow inset-heading" data-reveal>Selected work <sup>01</sup></p><div class="home-work-list" data-reveal>${project(c, { home: true })}</div><div class="more-work">${pill("All work <sup>01</sup>", c.href("work"), "data-transition")}</div></section>
  <section class="featured-film container" aria-label="각질 영상 미리보기" data-reveal>${preview(c, "featured-film")}</section>`;
}
function work(c) {
  return `<section class="page-heading container"><p class="eyebrow" data-reveal>Selected work — 01</p><h1 data-reveal>A collection of<br>moving stories.</h1></section><section class="work-section wide-container" data-work-controls><div class="work-controls"><div class="filter-buttons" role="group" aria-label="작품 종류"><button class="pill" data-filter="all" aria-pressed="true">All <sup>01</sup></button><button class="pill" data-filter="film" aria-pressed="false">Film <sup>01</sup></button><button class="pill" data-filter="music-video" aria-pressed="false">Music video <sup>00</sup></button></div><div class="view-buttons" role="group" aria-label="목록 보기 방식"><button class="icon-button" data-view="list" aria-label="목록으로 보기" aria-pressed="true"><span class="list-icon" aria-hidden="true"></span></button><button class="icon-button" data-view="grid" aria-label="이미지로 보기" aria-pressed="false"><svg class="grid-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><rect x="2" y="2" width="7" height="7"/><rect x="15" y="2" width="7" height="7"/><rect x="2" y="15" width="7" height="7"/><rect x="15" y="15" width="7" height="7"/></svg></button></div></div><p class="sr-only" data-results-status aria-live="polite">작품 1개</p><div id="work-results" data-view="list"><div class="work-table-head"><span>Film</span><span>Location</span><span>Category</span><span>Year</span></div>${project(c)}</div><div class="work-empty" data-work-empty hidden><span>Coming into frame.</span><p>공개된 뮤직비디오가 아직 없습니다.</p><button class="text-button" data-filter="all" aria-pressed="false">모든 작품 보기 ↗</button></div><div class="more-work">${pill("Archive <sup>01</sup>", c.href("archive"), "data-transition")}</div></section>`;
}
function about(c) {
  return `<section class="page-heading container"><p class="eyebrow" data-reveal>About — 이승연</p><h1 data-reveal>Every story starts<br>with a closer look.</h1><div class="about-divider"><span class="circle-globe">${globe}</span></div></section><section class="about-story wide-container"><span class="story-arrow" aria-hidden="true">${arrow}</span><div class="story-copy" data-reveal><p>이승연.<br>서울예술대학교 재학.</p><p>영화와 뮤직비디오.<br>이미지와 소리로 이어질<br>다음 장면을 향해.</p><p class="muted">Always exploring<span class="animated-dots" aria-hidden="true">...</span></p></div><figure class="about-film" data-reveal><img data-parallax src="${c.asset("stills/gakjil-close-up.jpg")}" width="720" height="311" alt="단편영화 각질의 클로즈업 장면"><figcaption>STILL FROM 〈각질〉 — 2026</figcaption></figure></section><section class="interests section-pad"><div class="wide-container"><h2 data-reveal>Looking towards…</h2><div class="interest-grid"><article data-reveal><p class="eyebrow">01</p><h3>Film</h3><p>영화 연출.<br>인물과 장면, 그리고 이야기.</p></article><article data-reveal><p class="eyebrow">02</p><h3>Music video</h3><p>뮤직비디오 연출.<br>음악에서 시작되는 이미지.</p></article><article data-reveal><p class="eyebrow">03</p><h3><span class="inline-star">${star}</span> Learning</h3><p>서울예술대학교 재학.<br>작업을 통해 넓혀가는 시선.</p></article></div></div></section><section class="education container section-pad"><figure data-reveal><img src="${c.asset("stills/gakjil-two-shot-detail.jpg")}" width="720" height="311" alt="단편영화 각질 속 두 인물의 장면" loading="lazy"><figcaption>SELECTED FILM — 〈각질〉</figcaption></figure><div data-reveal><p class="eyebrow">Education</p><h2>서울예술대학교<br><span class="muted">재학 중</span></h2><p>이곳에는 완성된 작업과<br>그 안의 장면들을 모읍니다.</p>${pill("Explore the work", c.href("work"), "data-transition")}</div></section>`;
}
function contact(c) {
  return `<section class="contact-heading container"><h1 data-reveal>Let’s start<br>a conversation.</h1><span class="contact-star" aria-hidden="true">${star}</span></section><section class="contact-layout container"><form data-contact-form><p class="contact-note">공개 연락처는 준비 중입니다.<br>문의 내용을 작성하고 복사해 보관할 수 있습니다. 이 양식은 메시지를 전송하지 않습니다.</p>${[
    ["01", "name", "이름을 알려주세요.", "이름 *", "text", true],
    ["02", "email", "어디로 답장을 드릴까요?", "이메일 주소 *", "email", true],
    [
      "03",
      "organization",
      "함께하는 팀이 있나요?",
      "팀 또는 소속 (선택)",
      "text",
      false,
    ],
    [
      "04",
      "project",
      "어떤 작업을 생각하고 있나요?",
      "영화, 뮤직비디오, 그 밖의 이야기 *",
      "text",
      true,
    ],
  ]
    .map(
      ([n, name, label, placeholder, type, required]) =>
        `<div class="form-row"><span class="form-number">${n}</span><div><label for="contact-${name}">${label}</label><input id="contact-${name}" name="${name}" type="${type}" placeholder="${placeholder}" ${required ? "required" : ""} autocomplete="${name === "name" ? "name" : name === "email" ? "email" : name === "organization" ? "organization" : "off"}"></div></div>`,
    )
    .join(
      "",
    )}<div class="form-row"><span class="form-number">05</span><div><label for="contact-message">나누고 싶은 이야기를 적어주세요.</label><textarea id="contact-message" name="message" placeholder="문의 내용 *" rows="4" required></textarea></div></div><div class="form-bottom"><button class="circle-button blue" type="submit" disabled data-magnetic><span data-magnetic-text>문의 내용<br>복사 ↗</span></button></div><p class="form-status" data-form-status role="status"></p><textarea class="draft-output" data-draft-output readonly hidden aria-label="작성한 문의 내용"></textarea><noscript><p>복사 기능은 JavaScript를 켜면 사용할 수 있습니다.</p></noscript></form><aside class="contact-aside"><span class="aside-arrow" aria-hidden="true">${arrow}</span><div><p class="eyebrow">Contact details</p><p>연락처 준비 중</p></div><div><p class="eyebrow">About</p><p>이승연<br>서울예술대학교 재학<br>Film & Music Video</p></div><div><p class="eyebrow">Socials</p><a href="${channelURL}" ${external}>YouTube ↗</a></div></aside></section>`;
}
function film(c) {
  return `<section class="page-heading film-heading container"><a class="back-link" href="${c.href("work")}" data-transition>← All work</a><h1 data-reveal>각질<span class="film-title-mark">(2026)</span></h1><div class="film-metadata"><div data-reveal><p class="eyebrow">Format</p><p>Short film</p></div><div data-reveal><p class="eyebrow">Director</p><p>이승연</p></div><div data-reveal><p class="eyebrow">Year / Runtime</p><p>2026 / 14′ 26″</p></div></div></section><section class="film-lead wide-container" data-reveal>${preview(c, "detail-film", true)}<div class="film-external">${circle("YouTube ↗", filmURL, external + ' aria-label="각질 전체 영상을 유튜브에서 보기"')}</div></section><section class="film-statement container section-pad"><p class="eyebrow">Selected moments</p><h2 data-reveal>하나의 이야기.<br>그 안에 남은 장면들.</h2><p data-reveal>단편영화 〈각질〉 · 2026<br>전체 영상은 YouTube에서 볼 수 있습니다.</p></section><section class="film-frames"><figure class="wide-frame" data-reveal><img data-parallax src="${c.asset("stills/gakjil-two-shot.jpg")}" width="720" height="311" alt="각질 — 두 인물이 마주 보는 장면" loading="lazy"><figcaption><span>01 / TWO SHOT</span><span>〈각질〉</span></figcaption></figure><div class="frame-pair wide-container"><figure data-reveal><img src="${c.asset("stills/gakjil-two-shot-intro.jpg")}" width="720" height="311" alt="각질 — 두 인물의 대화 장면" loading="lazy"><figcaption>02 / A MOMENT BETWEEN</figcaption></figure><figure data-reveal><img src="${c.asset("stills/gakjil-close-up.jpg")}" width="720" height="311" alt="각질 — 인물의 표정 클로즈업" loading="lazy"><figcaption>03 / CLOSER</figcaption></figure></div><figure class="closing-frame container" data-reveal><img src="${c.asset("stills/gakjil-close-up-dialogue.jpg")}" width="720" height="311" alt="각질 — 대화 중인 인물의 클로즈업" loading="lazy"><figcaption>04 / THE CONVERSATION CONTINUES</figcaption></figure></section><section class="next-work dark-section" data-footer-curve><div class="footer-curve" aria-hidden="true"></div><div class="container"><p class="eyebrow">Back to the collection</p><a href="${c.href("work")}" data-transition class="next-work-link"><h2>All work <sup>01</sup></h2><span class="next-arrow">${arrow}</span><span class="next-work-teaser"><img src="${c.asset("stills/gakjil-two-shot.jpg")}" width="720" height="311" alt="" loading="lazy"></span></a><p>지금까지의 장면, 그리고 앞으로의 작업.</p></div></section>`;
}
function archive(c) {
  return `<section class="page-heading container"><p class="eyebrow" data-reveal>Filmography</p><h1 data-reveal>Archive <sup>01</sup></h1></section><section class="archive-section wide-container"><div class="archive-table" aria-label="전체 작품"><div class="archive-head" ><span >Project</span><span >Category</span><span >Duration</span><span >Year</span></div><a href="${filmURL}" ${external} class="archive-row"  aria-label="각질, 단편영화, 14분 26초, 2026 — 유튜브에서 보기"><span >각질</span><span >Short film</span><span >14′ 26″</span><span >2026 ↗</span></a></div><div class="more-work">${pill("Back to work", c.href("work"), "data-transition")}</div></section>`;
}
function styleguide(c) {
  return `<section class="page-heading container"><p class="eyebrow">Design reference</p><h1>Style & motion.</h1></section><section class="container styleguide-content"><div class="swatches"><span style="background:#1c1d20;color:white">Charcoal<br>#1C1D20</span><span style="background:#455ce9;color:white">Blue<br>#455CE9</span><span style="background:#e9eaeb">Light grey<br>#E9EAEB</span><span style="background:white">White<br>#FFFFFF</span></div><h2>Type with room to breathe.</h2><p>이승연 — 영화와 음악, 그 사이의 장면들.</p><div class="guide-buttons">${pill("Outlined button", c.href("work"), "data-transition")}${circle("Round button", c.href("about"), "data-transition")}<span class="circle-globe">${globe}</span></div><p>페이지 전환, 곡선 메뉴, 마그네틱 버튼, 작품 미리보기, 스크롤 등장 효과.</p>${preview(c, "styleguide-film")}</section>`;
}
function notFound(c) {
  return `<section class="not-found"><img src="${c.asset("stills/gakjil-two-shot.jpg")}" alt="" width="720" height="311"><div class="not-found-content"><p class="eyebrow">404 — Out of frame</p><h1>장면을 찾을 수<br>없습니다.</h1>${pill("Back to home ↗", c.href("home"), "data-transition")}</div></section>`;
}

const pages = [
  ["home", "index.html", 0, "이승연 — Film & Music Video", home],
  ["work", "work/index.html", 1, "Work — 이승연", work],
  ["about", "about/index.html", 1, "About — 이승연", about],
  ["contact", "contact/index.html", 1, "Contact — 이승연", contact],
  ["film", "work/gakjil/index.html", 2, "각질 — 이승연", film],
  ["archive", "archive/index.html", 1, "Archive — 이승연", archive],
  [
    "styleguide",
    "styleguide/index.html",
    1,
    "Style & Motion — 이승연",
    styleguide,
  ],
  ["not-found", "404.html", 0, "404 — 이승연", notFound],
];
for (const [page, path, depth, title, body] of pages) {
  const c = context(depth, page === "not-found" ? "/lsy_pp/" : "");
  // Absolute project paths keep the 404 usable at any requested depth.
  const compact = ["contact", "film", "not-found"].includes(page);
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="이승연의 영화·뮤직비디오 포트폴리오. 서울예술대학교 재학. 단편영화 각질과 그 안의 장면들."><meta name="theme-color" content="#1c1d20"><meta property="og:title" content="${title}"><meta property="og:description" content="영화와 음악, 그 사이의 장면들."><meta property="og:image" content="https://whiskend.github.io/lsy_pp/assets/youtube-thumbnail.jpg"><link rel="icon" type="image/svg+xml" href="${c.asset("favicon.svg")}"><script>document.documentElement.classList.add('js');</script><link rel="stylesheet" href="${c.base}styles/site.css"><script src="${c.base}scripts/site.js" defer></script></head><body data-page="${page}" data-title="${page === "film" ? "각질" : page === "home" ? "Home" : page[0].toUpperCase() + page.slice(1)}">${header(c, page)}<main id="main">${body(c)}</main>${footer(c, compact)}<div id="page-curtain" class="page-curtain" aria-hidden="true"><span data-curtain-title>이승연</span></div><div class="project-cursor" data-project-cursor aria-hidden="true"><img alt=""><span data-cursor-label>View</span></div></body></html>`;
  const target = resolve(output, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html.replaceAll("><", ">\n<") + "\n");
  console.log("Built " + path);
}
