import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "../lib/utils";

const PHONE = "919876543210";

const DESKTOP_FRAMES = 192;
const MOBILE_FRAMES = 192;
const frameSrc = (dir: "desktop" | "mobile", n: number) =>
  `/frames/${dir}/frame-${String(n).padStart(3, "0")}.jpg`;

function useFrameScrub(trackRef: React.RefObject<HTMLDivElement | null>, totalFrames: number) {
  const [frame, setFrame] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const scrolledIntoTrack = -rect.top;
      const p = scrollableDistance > 0 ? scrolledIntoTrack / scrollableDistance : 0;
      const clamped = Math.min(1, Math.max(0, p));
      setProgress(clamped);
      setFrame(Math.min(totalFrames, Math.max(1, Math.round(clamped * (totalFrames - 1)) + 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackRef, totalFrames]);

  return { frame, progress };
}

// Preload every frame up front so scrubbing never pops/flickers
function usePreload(dir: "desktop" | "mobile", total: number) {
  useEffect(() => {
    for (let i = 1; i <= total; i++) {
      const img = new Image();
      img.src = frameSrc(dir, i);
    }
  }, [dir, total]);
}

export default function ParallaxHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { frame: desktopFrame, progress } = useFrameScrub(trackRef, DESKTOP_FRAMES);
  const { frame: mobileFrame } = useFrameScrub(trackRef, MOBILE_FRAMES);
  usePreload("desktop", DESKTOP_FRAMES);
  usePreload("mobile", MOBILE_FRAMES);

  return (
    // Tall scroll track: its extra height is the scroll distance the frame sequence plays over
    <div ref={trackRef} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ===== Desktop: ONE continuous full-bleed image, cup biased right, text overlaid on the left ===== */}
        <div className="hidden md:block absolute inset-0">
          <img
            src={frameSrc("desktop", desktopFrame)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "78% center" }}
          />
          {/* Directional gradient: dark/opaque on the left for text legibility, clear on the right so the cup shows fully */}
          <div className="absolute inset-0 bg-gradient-to-r from-espresso-dark/95 via-espresso-dark/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/40 via-transparent to-transparent" />

          <div className="relative z-10 h-full flex items-center">
            <div className="w-[50%] pl-16 pr-6 text-cream">
              <p className="uppercase tracking-[0.3em] text-sm text-caramel-light font-semibold mb-4">
                Small-Batch Roastery &amp; Café
              </p>
              <h1 className="font-serif text-5xl lg:text-6xl font-semibold leading-tight mb-5">
                Every cup, worth the crown it makes.
              </h1>
              <p className="text-cream/80 max-w-md mb-8 text-lg">
                Single-origin beans, roasted weekly, brewed to order. Order ahead on WhatsApp and skip the line.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#menu" className="bg-caramel text-espresso-dark font-semibold px-6 py-3 rounded-full hover:bg-caramel-light transition">
                  View the Menu
                </a>
                <a
                  href={whatsappLink(PHONE, "Hi! I'd like to place an order at Ember & Bean.")}
                  className="border border-cream/40 text-cream font-semibold px-6 py-3 rounded-full hover:bg-cream/10 transition"
                >
                  💬 Order Ahead
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Mobile: full-bleed image, text overlaid at bottom (unchanged) ===== */}
        <div className="block md:hidden absolute inset-0">
          <img
            src={frameSrc("mobile", mobileFrame)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/90 via-espresso-dark/35 to-espresso-dark/10" />
          <div className="relative z-10 h-full flex items-end pb-20">
            <div className="px-6 text-cream">
              <p className="uppercase tracking-[0.25em] text-[10px] text-caramel-light font-semibold mb-3">
                Small-Batch Roastery &amp; Café
              </p>
              <h1 className="font-serif text-3xl font-semibold leading-tight mb-4">
                Every cup, worth the crown it makes.
              </h1>
              <p className="text-cream/85 mb-6 text-sm max-w-xs">
                Single-origin beans, roasted weekly, brewed to order. Order ahead on WhatsApp and skip the line.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#menu" className="bg-caramel text-espresso-dark font-semibold px-6 py-3 rounded-full hover:bg-caramel-light transition">
                  View the Menu
                </a>
                <a
                  href={whatsappLink(PHONE, "Hi! I'd like to place an order at Ember & Bean.")}
                  className="border border-cream/40 text-cream font-semibold px-6 py-3 rounded-full hover:bg-cream/10 transition"
                >
                  💬 Order Ahead
                </a>
              </div>
            </div>
          </div>
        </div>

        {progress < 0.96 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70 text-xs tracking-[0.3em] uppercase animate-bounce z-20">
            Scroll ↓
          </div>
        )}
      </div>
    </div>
  );
}
