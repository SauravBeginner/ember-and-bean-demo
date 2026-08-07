import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ParallaxHero from "./components/ParallaxHero";
import { whatsappLink } from "./lib/utils";
import { MENU, getMenuItem } from "./data/menu";

const PHONE = "919876543210";

const STEPS = [
  { n: "01", t: "Sourced", d: "Green beans from 12+ single-origin farms, graded and cupped before we buy." },
  { n: "02", t: "Roasted", d: "Small 5kg batches, roasted weekly — never more than 7 days off-roast." },
  { n: "03", t: "Dialed In", d: "Every morning the first shots are timed, weighed, and tasted before service." },
  { n: "04", t: "Served", d: "Order ahead on WhatsApp — your cup lands on the bar as you walk in." },
];

const REVIEWS = [
  { q: "The pour-over here ruined every other café for me. You can taste the week it was roasted.", who: "Ananya S.", note: "Regular since 2023" },
  { q: "Ordered on WhatsApp from the metro, coffee was on the counter when I walked in. Every single time.", who: "Rahul M.", note: "Daily commuter" },
  { q: "That salted caramel latte is genuinely the best coffee I've had in this city. Not close.", who: "Priya D.", note: "Weekend visitor" },
];

// `solid` forces the opaque theme-aware bar (used on inner pages that have no dark hero behind it).
function Header({ solid = false }: { solid?: boolean }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const opaque = solid || scrolled;
  const barClass = opaque
    ? "bg-[hsl(var(--bg)/90%)] backdrop-blur-md border-b border-theme"
    : "bg-transparent border-b border-transparent";
  const textClass = opaque ? "text-fg" : "text-cream";
  const linkClass = opaque ? "hover:text-caramel transition" : "hover:text-caramel-light transition";
  const iconBtnClass = opaque ? "border-theme hover:border-caramel" : "border-cream/40 hover:border-cream";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${barClass} ${textClass}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-semibold">☕ Ember &amp; Bean</Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="/#menu" className={linkClass}>Menu</a>
          <a href="/#craft" className={linkClass}>The Craft</a>
          <a href="/#about" className={linkClass}>Our Story</a>
          <a href="/#visit" className={linkClass}>Visit</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={toggle} aria-label="Toggle theme" className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${iconBtnClass}`}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <a
            href={whatsappLink(PHONE, "Hi! I'd like to place an order at Ember & Bean.")}
            className="hidden sm:inline-flex items-center gap-2 bg-caramel text-espresso-dark font-semibold text-sm px-4 py-2 rounded-full hover:bg-caramel-light transition"
          >
            💬 Order on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return <ParallaxHero />;
}

/* Thin marquee strip — premium filler between hero and menu */
function Ticker() {
  const items = "SINGLE ORIGIN · ROASTED WEEKLY · BREWED TO ORDER · ORDER AHEAD ON WHATSAPP · ";
  return (
    <div className="bg-espresso-dark text-cream/70 overflow-hidden py-3 border-y border-caramel/20">
      <div className="whitespace-nowrap font-semibold tracking-[0.35em] text-xs animate-[ticker_28s_linear_infinite]">
        {items.repeat(4)}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function Menu() {
  return (
    <section id="menu" className="py-28 px-6 bg-surface relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-caramel/10 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs font-bold text-caramel mb-3">This Week's Menu</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold">
              Brewed fresh, <span className="text-caramel italic">every cup</span>
            </h2>
          </div>
          <a
            href={whatsappLink(PHONE, "Hi! I'd like to see the full menu.")}
            className="text-sm font-semibold text-caramel hover:text-caramel-dark transition"
          >
            Full menu on WhatsApp →
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU.map((item) => (
            <Link
              key={item.slug}
              to={`/menu/${item.slug}`}
              className="group bg-card border border-theme rounded-2xl overflow-hidden hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.tag && (
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest text-espresso-dark bg-caramel rounded-full px-3 py-1">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold group-hover:text-caramel transition">{item.name}</h3>
                  <span className="font-serif text-lg font-semibold text-caramel whitespace-nowrap">₹{item.price}</span>
                </div>
                <p className="text-sm text-fg/60 mt-1.5">{item.blurb}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-caramel mt-3 group-hover:gap-2 transition-all">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* The Craft — numbered process with a real frame from the hero film */
function Craft() {
  return (
    <section id="craft" className="py-28 px-6 bg-espresso-dark text-cream relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-caramel/10 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto relative grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs font-bold text-caramel-light mb-3">The Craft</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-10">
            Four steps between the farm <span className="text-caramel-light italic">and your first sip</span>
          </h2>
          <div className="space-y-7">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-6">
                <span className="font-serif text-caramel text-2xl font-semibold w-10 shrink-0">{s.n}</span>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-1">{s.t}</h3>
                  <p className="text-cream/65 text-sm leading-relaxed max-w-sm">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-warm border border-caramel/20">
            <img src="/images/story-splash.jpg" alt="The crown splash from our signature latte" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-cream text-espresso-dark rounded-2xl px-6 py-4 shadow-warm hidden sm:block">
            <p className="font-serif text-2xl font-semibold text-caramel-dark">7 days</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-espresso/70">max time off-roast</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 px-6 bg-card-tex border-y border-theme">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="rounded-3xl overflow-hidden shadow-warm">
            <img src="/images/story-calm.jpg" alt="A latte at rest on our bar" className="w-full object-cover" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="uppercase tracking-[0.3em] text-xs font-bold text-caramel mb-3">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
            Started in a garage. <span className="text-caramel italic">Stayed obsessive.</span>
          </h2>
          <p className="text-fg/70 leading-relaxed mb-4">
            Ember &amp; Bean began six years ago with a 1kg roaster and a folding table. The roaster got bigger.
            The obsession didn't change: every pour-over timed, every shot dialed in, every bag stamped with
            its roast date — because coffee is produce, not pantry.
          </p>
          <p className="text-fg/70 leading-relaxed mb-10">
            Today we're a neighborhood café where your order can be placed from the metro and picked up
            without breaking stride. Same folding-table standards, better chairs.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-md">
            <div><p className="font-serif text-3xl font-semibold text-caramel">6</p><p className="text-xs text-fg/60 mt-1 uppercase tracking-wide">Years Roasting</p></div>
            <div><p className="font-serif text-3xl font-semibold text-caramel">12+</p><p className="text-xs text-fg/60 mt-1 uppercase tracking-wide">Origins Sourced</p></div>
            <div><p className="font-serif text-3xl font-semibold text-caramel">4.9★</p><p className="text-xs text-fg/60 mt-1 uppercase tracking-wide">Guest Rating</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-xs font-bold text-caramel mb-3">Guests Say</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">
            Loved around <span className="text-caramel italic">the bar</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <figure key={r.who} className="bg-card border border-theme rounded-3xl p-8 flex flex-col">
              <span className="text-caramel text-lg tracking-widest mb-4">★★★★★</span>
              <blockquote className="font-serif text-lg leading-relaxed flex-1">&ldquo;{r.q}&rdquo;</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-theme">
                <p className="font-semibold text-sm">{r.who}</p>
                <p className="text-xs text-fg/55 mt-0.5">{r.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="py-28 px-6 bg-espresso-dark text-cream relative overflow-hidden">
      <img src="/images/story-settle.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-dark/80 via-espresso-dark/60 to-espresso-dark/90" />
      <div className="max-w-4xl mx-auto text-center relative">
        <p className="uppercase tracking-[0.3em] text-xs font-bold text-caramel-light mb-3">Order Ahead</p>
        <h2 className="font-serif text-4xl md:text-6xl font-semibold mb-6">Skip the line, <span className="text-caramel-light italic">not the crema.</span></h2>
        <p className="text-cream/75 max-w-lg mx-auto mb-10">
          Message us your order — it's timed to land on the bar the moment you walk in.
          Open 7:30 AM – 9:00 PM, every day.
        </p>
        <a
          href={whatsappLink(PHONE, "Hi! I'd like to place an order at Ember & Bean.")}
          className="inline-flex items-center gap-3 bg-caramel text-espresso-dark font-semibold px-9 py-4 rounded-full hover:bg-caramel-light transition text-lg shadow-warm"
        >
          💬 Order on WhatsApp
        </a>
        <p className="mt-8 text-cream/50 text-sm">42 Lakeview Road · Ballygunge · Kolkata</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-card-tex border-t border-theme">
      <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-3 gap-10">
        <div>
          <p className="font-serif text-xl font-semibold mb-3">☕ Ember &amp; Bean</p>
          <p className="text-sm text-fg/60 leading-relaxed max-w-xs">
            Small-batch roastery &amp; café. Single-origin beans, roasted weekly, brewed like it matters.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-fg/50 mb-4">Hours</p>
          <p className="text-sm text-fg/70">Mon – Sun · 7:30 AM – 9:00 PM</p>
          <p className="text-sm text-fg/70 mt-1">Roastery tours · Sat 10 AM</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-fg/50 mb-4">Find Us</p>
          <p className="text-sm text-fg/70">42 Lakeview Road, Ballygunge</p>
          <p className="text-sm text-fg/70 mt-1">Kolkata, WB 700019</p>
          <p className="text-sm text-caramel font-semibold mt-3">@emberandbean</p>
        </div>
      </div>
      <div className="border-t border-theme py-5 text-center text-xs text-fg/40">
        Demo site by Tech10x — every visual on this page is from our own product film.
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Ticker />
      <Menu />
      <Craft />
      <About />
      <Reviews />
      <Visit />
      <Footer />
    </>
  );
}

// ── Product / menu-item detail page ───────────────────────────────
function MenuItemPage() {
  const { slug } = useParams();
  const item = getMenuItem(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) {
    return (
      <>
        <Header solid />
        <div className="pt-40 pb-32 px-6 text-center min-h-screen">
          <p className="font-serif text-3xl font-semibold mb-4">Item not found</p>
          <Link to="/#menu" className="text-caramel font-semibold">← Back to the menu</Link>
        </div>
        <Footer />
      </>
    );
  }

  const others = MENU.filter((m) => m.slug !== item.slug).slice(0, 3);

  return (
    <>
      <Header solid />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <Link to="/#menu" className="inline-flex items-center gap-1 text-sm font-semibold text-caramel hover:gap-2 transition-all mb-8">
            ← Back to menu
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden shadow-warm border border-theme">
              <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover" />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="uppercase tracking-[0.25em] text-xs font-bold text-caramel">{item.category}</span>
                {item.tag && (
                  <span className="text-[10px] uppercase font-bold tracking-widest text-espresso-dark bg-caramel rounded-full px-3 py-1">
                    {item.tag}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">{item.name}</h1>
              <p className="text-lg text-fg/70 leading-relaxed mb-6">{item.description}</p>

              <ul className="space-y-2 mb-8">
                {item.notes.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-sm text-fg/75">
                    <span className="text-caramel mt-0.5">☕</span>
                    {n}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-5 mb-8">
                <span className="font-serif text-4xl font-semibold text-caramel">₹{item.price}</span>
                <span className="text-sm text-fg/50">per serving</span>
              </div>

              <a
                href={whatsappLink(PHONE, `Hi! I'd like to order a ${item.name} (₹${item.price}) from Ember & Bean.`)}
                className="inline-flex items-center gap-2 bg-caramel text-espresso-dark font-semibold px-8 py-4 rounded-full hover:bg-caramel-light transition text-lg shadow-warm"
              >
                💬 Order this on WhatsApp
              </a>
              <p className="text-xs text-fg/45 mt-4">Order ahead — it's on the bar the moment you arrive.</p>
            </div>
          </div>

          {/* Related */}
          <div className="mt-24">
            <h2 className="font-serif text-2xl font-semibold mb-8">
              You might also <span className="text-caramel italic">like</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/menu/${o.slug}`}
                  className="group bg-card border border-theme rounded-2xl overflow-hidden hover:shadow-warm hover:-translate-y-1 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex items-baseline justify-between gap-3">
                    <h3 className="font-serif font-semibold group-hover:text-caramel transition">{o.name}</h3>
                    <span className="font-serif font-semibold text-caramel">₹{o.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-surface text-fg font-sans">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu/:slug" element={<MenuItemPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
