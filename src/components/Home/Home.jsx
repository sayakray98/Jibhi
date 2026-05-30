import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import banner1 from "../../assets/images/banner1.webp";
import banner2 from "../../assets/images/banner2.webp";
import banner3 from "../../assets/images/banner3.webp";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Home.css";
import PickDestination from "./PickDestination";
import FeaturedCollections from "./FeaturedCollections";
import PropertyCarousel from "./PropertyCarousel";
import Categories from "./Categories";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import AboutSection from "./AboutSection";

/* ─── Location data ─── */
const LOCATIONS = [
  { name: "Luxury Collection", type: "City" },
  { name: "Mumbai", type: "City" },
  { name: "Pune", type: "City" },
  { name: "New Delhi", type: "City" },
  { name: "Jaipur", type: "City" },
  { name: "Goa", type: "City" },
  { name: "Shimla", type: "City" },
  { name: "Manali", type: "City" },
  { name: "Nainital", type: "City" },
  { name: "Udaipur", type: "City" },
  { name: "Coorg", type: "City" },
  { name: "Ooty", type: "City" },
  { name: "Mussoorie", type: "City" },
  { name: "Lonavala", type: "City" },
  { name: "Kasauli", type: "City" },
];

/* ─── Calendar helpers ─── */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function fmtDate(d) {
  if (!d) return null;
  return MONTHS[d.getMonth()].slice(0, 3) + " " + d.getDate() + ", " + d.getFullYear();
}
function dEq(a, b) {
  return a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}
function dBetween(d, a, b) { return d > a && d < b; }

/* ─── Single month grid ─── */
function CalendarMonth({
  year, month,
  rangeStart, rangeEnd, hoverDay,
  onPickDay, onHover,
  showPrev, showNext, onNav,
}) {
  const firstDow = (() => {
    let d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
  })();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const effective = rangeEnd || (rangeStart && hoverDay ? hoverDay : null);
  const lo = rangeStart && effective
    ? (rangeStart <= effective ? rangeStart : effective) : rangeStart;
  const hi = rangeStart && effective
    ? (rangeStart <= effective ? effective : rangeStart) : null;

  return (
    <div className="cal-month">
      <div className="cal-nav">
        {showPrev
          ? <button className="cal-nav-btn" onClick={() => onNav(-1)}>&#8249;</button>
          : <div style={{ width: 32 }} />}
        <span className="cal-nav-title">{MONTHS[month]} {year}</span>
        {showNext
          ? <button className="cal-nav-btn" onClick={() => onNav(1)}>&#8250;</button>
          : <div style={{ width: 32 }} />}
      </div>
      <div className="cal-grid">
        {DAYS.map((d, i) => (
          <div key={d} className={`cal-dow${i >= 5 ? " weekend" : ""}`}>{d}</div>
        ))}
        {Array.from({ length: firstDow }).map((_, i) => (
          <div key={"e" + i} className="cal-day empty" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const d = new Date(year, month, day);
          const isPast = d < today;
          let cls = "cal-day";
          if (dEq(d, today)) cls += " today";
          if (isPast) cls += " disabled";
          if (!isPast) {
            if (lo && hi) {
              if (dEq(d, lo)) cls += " range-start";
              else if (dEq(d, hi)) cls += " range-end";
              else if (dBetween(d, lo, hi)) cls += " in-range";
            } else if (rangeStart && dEq(d, rangeStart)) {
              cls += " selected";
            }
          }
          return (
            <div
              key={day}
              className={cls}
              onClick={() => !isPast && onPickDay(new Date(year, month, day))}
              onMouseEnter={() => !isPast && onHover(new Date(year, month, day))}
              onMouseLeave={() => onHover(null)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Guest counter row ─── */
function GuestRow({ label, sub, value, onDec, onInc, min = 0 }) {
  return (
    <div className="guest-row">
      <div className="guest-info">
        <span className="guest-label">{label}</span>
        {sub && <span className="guest-sub">{sub}</span>}
      </div>
      <div className="guest-controls">
        <button className="guest-btn" onClick={onDec} disabled={value <= min}>−</button>
        <span className="guest-count">{String(value).padStart(2, "0")}</span>
        <button className="guest-btn" onClick={onInc}>+</button>
      </div>
    </div>
  );
}

/* ─── Location SVG icons ─── */
function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#9a8c7c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function IconLocate() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#1a7a5e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />
    </svg>
  );
}

/* ─── Main Home component ─── */
export default function Home() {
  const today = new Date();

  /* location */
  const [locOpen, setLocOpen] = useState(false);
  const [locSearch, setLocSearch] = useState("");
  const [location, setLocation] = useState("Jaipur, Rajasthan");
  const locInputRef = useRef(null);

  /* calendar */
  const [baseYear, setBaseYear] = useState(today.getFullYear());
  const [baseMonth, setBaseMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverDay, setHoverDay] = useState(null);
  const [calOpen, setCalOpen] = useState(false);

  /* guests */
  const [guestOpen, setGuestOpen] = useState(false);
  const [adults, setAdults] = useState(6);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [pets, setPets] = useState(0);
  const [tmpAdults, setTmpAdults] = useState(6);
  const [tmpChildren, setTmpChildren] = useState(0);
  const [tmpInfants, setTmpInfants] = useState(0);
  const [tmpRooms, setTmpRooms] = useState(1);
  const [tmpPets, setTmpPets] = useState(0);

  const barRef = useRef(null);

  const rightMonth = baseMonth === 11 ? 0 : baseMonth + 1;
  const rightYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  const totalGuests = adults + children + infants;
  const guestLabel = `${totalGuests} Guest${totalGuests !== 1 ? "s" : ""} , ${rooms}+ Room${rooms !== 1 ? "s" : ""}`;

  const filteredLocations = LOCATIONS.filter((l) =>
    l.name.toLowerCase().includes(locSearch.toLowerCase())
  );

  function openLoc() {
    setCalOpen(false);
    setGuestOpen(false);
    setLocSearch("");
    setLocOpen(true);
    setTimeout(() => locInputRef.current?.focus(), 50);
  }

  function pickLocation(name) {
    setLocation(name);
    setLocOpen(false);
    setLocSearch("");
  }

  function handleNav(dir) {
    let m = baseMonth + dir, y = baseYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setBaseMonth(m);
    setBaseYear(y);
  }

  function handlePickDay(clicked) {
    if (!rangeStart || rangeEnd) {
      setRangeStart(clicked); setRangeEnd(null);
    } else {
      if (dEq(clicked, rangeStart)) { setRangeStart(null); setRangeEnd(null); }
      else if (clicked < rangeStart) { setRangeEnd(rangeStart); setRangeStart(clicked); }
      else { setRangeEnd(clicked); }
    }
  }

  function openGuests() {
    setCalOpen(false);
    setLocOpen(false);
    setTmpAdults(adults); setTmpChildren(children);
    setTmpInfants(infants); setTmpRooms(rooms); setTmpPets(pets);
    setGuestOpen((o) => !o);
  }

  function applyGuests() {
    setAdults(tmpAdults); setChildren(tmpChildren);
    setInfants(tmpInfants); setRooms(tmpRooms); setPets(tmpPets);
    setGuestOpen(false);
  }

  function clearGuests() {
    setTmpAdults(1); setTmpChildren(0);
    setTmpInfants(0); setTmpRooms(1); setTmpPets(0);
  }

  useEffect(() => {
    function handleOutside(e) {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setCalOpen(false);
        setGuestOpen(false);
        setLocOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const slides = [
    { id: 1, title: "Luxury Boutique Resorts", image: banner1 },
    { id: 2, title: "Luxury Boutique Resorts", image: banner2 },
    { id: 3, title: "Luxury Boutique Resorts", image: banner3 },
  ];

  return (
    <>
      {/* ── Hero Swiper ── */}
      <div className="home">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="homeSwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="slide" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="overlay">
                  <h1>{slide.title}</h1>
                  <p>{slide.desc}</p>
                  <button>Explore More</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Booking Bar ── */}
      <section className="booking">
        <div className="booking-bar-wrapper" ref={barRef}>
        

        
          <div className="booking-bar">

            {/* ── Location field ── */}
            <div className="bb-field-wrap">
              <label className="bb-label" htmlFor="bb-location">Location / Villas / Landmark</label>
              <div className={`bb-input-box${locOpen ? " bb-input-box--focus" : ""}`} onClick={openLoc}>
                {locOpen ? (
                  <input
                    ref={locInputRef}
                    id="bb-location"
                    className="bb-input"
                    value={locSearch}
                    onChange={(e) => setLocSearch(e.target.value)}
                    placeholder={location}
                    onClick={(e) => e.stopPropagation()}
                    autoComplete="off"
                  />
                ) : (
                  <span className={`bb-input-display${location === "Where to?" ? " bb-input-display--placeholder" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    {location}
                  </span>
                )}
              </div>
            </div>

            {/* ── Check-in ── */}
            <div className="bb-field-wrap">
              <label className="bb-label" htmlFor="bb-checkin">Check-in</label>
              <div
                className={`bb-input-box${calOpen ? " bb-input-box--focus" : ""}`}
                onClick={() => { setLocOpen(false); setGuestOpen(false); setCalOpen((o) => !o); }}
              >
                <span className={`bb-input-display${!rangeStart ? " bb-input-display--placeholder" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {rangeStart ? fmtDate(rangeStart) : "Select Date"}
                </span>
              </div>
            </div>

            {/* ── Check-out ── */}
            <div className="bb-field-wrap">
              <label className="bb-label" htmlFor="bb-checkout">Check-out</label>
              <div
                className={`bb-input-box${calOpen ? " bb-input-box--focus" : ""}`}
                onClick={() => { setLocOpen(false); setGuestOpen(false); setCalOpen((o) => !o); }}
              >
                <span className={`bb-input-display${!rangeEnd ? " bb-input-display--placeholder" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {rangeEnd ? fmtDate(rangeEnd) : "Select Date"}
                </span>
              </div>
            </div>

            {/* ── Guests ── */}
            <div className="bb-field-wrap">
              <label className="bb-label" htmlFor="bb-guests">Guests</label>
              <div
                className={`bb-input-box${guestOpen ? " bb-input-box--focus" : ""}`}
                onClick={openGuests}
              >
                <span className="bb-input-display">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  {guestLabel}
                </span>
              </div>
            </div>

            <button className="bb-search">SEARCH</button>
          </div>

          {/* ── Location dropdown ── */}
          {locOpen && (
            <div className="loc-popup">
              {/* Near Me */}
              <div className="loc-nearme" onClick={() => pickLocation("Near Me")}>
                <span className="loc-nearme-icon"><IconLocate /></span>
                <div className="loc-nearme-text">
                  <span className="loc-nearme-title">Use Current Location</span>
                  <span className="loc-nearme-sub">Near Me</span>
                </div>
              </div>

              <div className="loc-separator" />

              {/* List */}
              <div className="loc-list">
                {filteredLocations.length === 0 && (
                  <div className="loc-empty">No results found</div>
                )}
                {filteredLocations.map((l) => (
                  <div
                    key={l.name}
                    className={`loc-item${location === l.name ? " selected" : ""}`}
                    onClick={() => pickLocation(l.name)}
                  >
                    <span className="loc-pin"><IconPin /></span>
                    <span className="loc-name">{l.name}</span>
                    <span className="loc-type">{l.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Calendar popup ── */}
          {calOpen && (
            <div className="cal-popup">
              <div className="cal-months">
                <CalendarMonth
                  year={baseYear} month={baseMonth}
                  rangeStart={rangeStart} rangeEnd={rangeEnd}
                  hoverDay={!rangeEnd ? hoverDay : null}
                  onPickDay={handlePickDay} onHover={setHoverDay}
                  showPrev={true} showNext={false} onNav={handleNav}
                />
                <CalendarMonth
                  year={rightYear} month={rightMonth}
                  rangeStart={rangeStart} rangeEnd={rangeEnd}
                  hoverDay={!rangeEnd ? hoverDay : null}
                  onPickDay={handlePickDay} onHover={setHoverDay}
                  showPrev={false} showNext={true} onNav={handleNav}
                />
              </div>
              <div className="cal-footer">
                <button className="cal-clear"
                  onClick={() => { setRangeStart(null); setRangeEnd(null); }}>
                  Clear
                </button>
                <button className="cal-apply" onClick={() => setCalOpen(false)}>
                  Apply
                </button>
              </div>
            </div>
          )}

          {/* ── Guests popup ── */}
          {guestOpen && (
            <div className="guest-popup">
              <GuestRow label="Adults" sub="Age 13 years and more"
                value={tmpAdults} min={1}
                onDec={() => setTmpAdults((v) => Math.max(1, v - 1))}
                onInc={() => setTmpAdults((v) => v + 1)} />
              <div className="guest-separator" />
              <GuestRow label="Children" sub="Age 3-12 years"
                value={tmpChildren}
                onDec={() => setTmpChildren((v) => Math.max(0, v - 1))}
                onInc={() => setTmpChildren((v) => v + 1)} />
              <div className="guest-separator" />
              <GuestRow label="Infants" sub="Age 0-2 years"
                value={tmpInfants}
                onDec={() => setTmpInfants((v) => Math.max(0, v - 1))}
                onInc={() => setTmpInfants((v) => v + 1)} />
              <div className="guest-separator" />
              <GuestRow label="Rooms" sub={null}
                value={tmpRooms} min={1}
                onDec={() => setTmpRooms((v) => Math.max(1, v - 1))}
                onInc={() => setTmpRooms((v) => v + 1)} />
              <div className="guest-separator" />
              <GuestRow label="Pets" sub={null}
                value={tmpPets}
                onDec={() => setTmpPets((v) => Math.max(0, v - 1))}
                onInc={() => setTmpPets((v) => v + 1)} />
              <div className="guest-footer">
                <button className="guest-clear-btn" onClick={clearGuests}>CLEAR</button>
                <button className="guest-apply-btn" onClick={applyGuests}>APPLY &amp; SEARCH</button>
              </div>
            </div>
          )}
        </div>
       
        <div className="booking-wrapper-below">
          <div className="container booking-below">
          <div className="row">
            <div className="col-lg-8">
              <div className="texts text-start">
                <h6>Finding your ideal vacation spot should be easy, we're here to help!</h6>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="texts text-end">
                <a href=""><i class="lni lni-telephone-1"></i> <h6>Request Callback</h6></a>
              </div>
            </div>
          </div>
        </div>
         </div>
       </section>

      {/* ── Home Sections ── */}
      <AboutSection />
      <PickDestination />
      <FeaturedCollections />
      <PropertyCarousel />
      <Categories />
      <Testimonials />
      <Newsletter />
    </>
  );
}