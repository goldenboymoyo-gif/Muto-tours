"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { brand } from "@/data/brand";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

export default function Navigation({ heroReady, soundOn, onToggleSound }) {
  const barRef = useRef(null);
  const menuRef = useRef(null);
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!heroReady || !barRef.current) return;
    const t = setTimeout(() => {
      barRef.current.classList.add("visible");
    }, 1300);
    return () => clearTimeout(t);
  }, [heroReady]);

  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current;
      if (!bar) return;
      bar.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio("/audio/nature.mp3");
      a.loop = true;
      a.volume = 0.5;
      audioRef.current = a;
    }
    const a = audioRef.current;
    if (soundOn) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [soundOn]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const bars = menu.querySelectorAll(".navigation-menu-bar");
    const content = menu.querySelector(".navigation-menu-content");

    if (open) {
      menu.style.pointerEvents = "auto";
      gsap.to(bars, {
        height: "105vh",
        duration: 1.5,
        stagger: { amount: 0.75 },
        ease: "power4.inOut",
      });
      gsap.to(content, { opacity: 1, duration: 0.5, delay: 0.4 });
    } else {
      gsap.to(content, { opacity: 0, duration: 0.25 });
      gsap.to(bars, {
        height: 0,
        duration: 1.5,
        stagger: { amount: 0.5 },
        ease: "power4.inOut",
        onComplete: () => {
          menu.style.pointerEvents = "none";
        },
      });
    }
  }, [open]);

  const items = [
    { label: "Home", target: "top" },
    { label: "Explore", target: "explore" },
    { label: "Reviews", target: "reviews" },
    { label: "About", href: "/about" },
    { label: "Destinations", href: "/destinations" },
    { label: "Activities", href: "/experiences" },
    { label: "Itineraries", href: "/itineraries" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavigate = (item) => {
    setOpen(false);
    if (item.href) return;
    item.target === "top" ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollToId(item.target);
  };

  return (
    <>
      <div ref={barRef} className="navigation-bar">
        <div className="navigation-left-button">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className={`menu example5 ${open ? "menu-open" : ""}`}
          >
            <span />
          </button>
        </div>
        <div className="navigation-bar-left">
          <button
            type="button"
            aria-label="Toggle sound"
            className="navigation-logobox"
            onClick={onToggleSound}
          >
            {soundOn && (
              <img className="navigation-logobox-icon" src="/images/vol.svg" alt="" />
            )}
            {!soundOn && (
              <img className="navigation-logobox-icon" src="/images/volx.svg" alt="" />
            )}
          </button>
          <button
            type="button"
            className="navigation-contact-button"
            onClick={() => scrollToId("contact")}
          >
            <img
              className="navigation-contact-button-image"
              src="/images/muto-logo.png"
              alt={brand.name}
            />
            <h1 className="navigation-title">Enquire</h1>
          </button>
          <span className="navigation-title" style={{ marginLeft: "1vw", opacity: 0.8 }}>
            {brand.name}
          </span>
        </div>
      </div>

      <div ref={menuRef} className="navigation-menu">
        <div className="navigation-menu-bar-wrapper">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="navigation-menu-bar" />
          ))}
        </div>
        <div className="navigation-menu-content">
          {items.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="menu-button"
                onClick={() => setOpen(false)}
              >
                <div className="menu-text">
                  <span>
                    {item.label}
                    <span className="menu-text-copy">{item.label}</span>
                  </span>
                </div>
              </Link>
            ) : (
              <div
                key={item.label}
                className="menu-button"
                onClick={() => handleNavigate(item)}
              >
                <div className="menu-text">
                  <span>
                    {item.label}
                    <span className="menu-text-copy">{item.label}</span>
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
