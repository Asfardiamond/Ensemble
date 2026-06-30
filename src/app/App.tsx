import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Menu, X, ArrowRight, ChevronDown, Globe, Smartphone,
  Palette, Server, Cloud, GitBranch, HardDrive, HeadphonesIcon,
  Building2, Brain, Zap, RefreshCw, CheckCircle, Star,
  Plus, Minus, Mail, Phone, MapPin, Linkedin, Github,
  Instagram, Facebook, Twitter, Code2, Shield, Layers,
  ExternalLink, Play, Sun, Moon, ChevronRight, Users, Rocket, Clock
} from "lucide-react";

// --- Logo ---

function EnsembleLogo({ dark = false, size = 40 }: { dark?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 200 219" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M122 112V22H117V112L39 157L42 162L120 117L198 162L201 157L122 112Z" fill={dark ? "#E2F6FF" : "white"} />
        <mask id="m1" maskUnits="userSpaceOnUse" x="38" y="22" width="163" height="185">
          <path d="M42 162L120 117L198 162L120 207L42 162Z" fill="#C4C4C4" />
          <path d="M39 157L117 112L117 22L39 67L39 157Z" fill="#C4C4C4" />
          <path d="M122 22L122 112L200 157L200 67L122 22Z" fill="#C4C4C4" />
        </mask>
        <g mask="url(#m1)">
          <ellipse cx="117" cy="120" rx="117" ry="114" fill="url(#grad1)" />
        </g>
        <defs>
          <radialGradient id="grad1" cx="0" cy="0" r="1"
            gradientTransform="matrix(50 55 -55 48 118 117)"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="#17B8F5" />
          </radialGradient>
        </defs>
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "1.25rem",
            color: dark ? "#F1F5F9" : "#202124",
            letterSpacing: "-0.02em",
          }}
        >
          Ensemble
        </span>
        <span
          className="tracking-widest uppercase"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.5rem",
            color: "#17B8F5",
            fontWeight: 600,
            letterSpacing: "0.18em",
          }}
        >
          IT Solutions
        </span>
      </div>
    </div>
  );
}

// --- Animated Counter ---

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- Section Wrapper ---

function Section({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

// --- Navbar ---

const NAV_LINKS = ["Services", "Solutions", "Portfolio", "Pricing", "About", "Contact"];

function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const base = scrolled
    ? dark
      ? "bg-[#080E1A]/90 border-[#1E3A50] shadow-lg shadow-black/20"
      : "bg-white/90 border-[#E5E7EB] shadow-lg shadow-black/5"
    : "bg-transparent border-transparent";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${base}`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="cursor-pointer hover:opacity-80 transition-opacity">
          <EnsembleLogo dark={dark} />
        </a>

        <ul className="hidden lg:flex items-center gap-8" style={{ display: "none" }}>
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: dark ? "#94A3B8" : "#64748B",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#17B8F5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = dark ? "#94A3B8" : "#64748B")}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full transition-colors duration-200"
            style={{ color: dark ? "#94A3B8" : "#64748B" }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "linear-gradient(135deg, #17B8F5 0%, #2F8EB8 100%)",
              boxShadow: "0 4px 14px rgba(23, 184, 245, 0.35)",
            }}
          >
            Get Started <ArrowRight size={14} />
          </a>
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: dark ? "#F1F5F9" : "#202124", display: "none" }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden px-6 py-4 border-t"
          style={{
            background: dark ? "#0D1626" : "#FFFFFF",
            borderColor: dark ? "#1E3A50" : "#E5E7EB",
            display: "none",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium border-b"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: dark ? "#CBD5E1" : "#374151",
                borderColor: dark ? "#1E3A50" : "#F3F4F6",
              }}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #17B8F5 0%, #2F8EB8 100%)" }}
          >
            Get Started <ArrowRight size={14} />
          </a>
        </div>
      )}
    </header>
  );
}

// --- Hero ---

function HeroIllustration({ dark }: { dark: boolean }) {
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-square select-none flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(${dark ? "#17B8F5" : "#2F8EB8"} 1px, transparent 1px),
          linear-gradient(90deg, ${dark ? "#17B8F5" : "#2F8EB8"} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        borderRadius: "50%",
        maskImage: "radial-gradient(circle at center, white 50%, transparent 80%)",
      }} />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(23,184,245,0.25) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Central cube */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="120" height="120" viewBox="0 0 200 219" fill="none">
          <path d="M122 112V22H117V112L39 157L42 162L120 117L198 162L201 157L122 112Z" fill={dark ? "#E2F6FF" : "white"} opacity="0.9" />
          <mask id="hm1" maskUnits="userSpaceOnUse" x="38" y="22" width="163" height="185">
            <path d="M42 162L120 117L198 162L120 207L42 162Z" fill="#C4C4C4" />
            <path d="M39 157L117 112L117 22L39 67L39 157Z" fill="#C4C4C4" />
            <path d="M122 22L122 112L200 157L200 67L122 22Z" fill="#C4C4C4" />
          </mask>
          <g mask="url(#hm1)">
            <ellipse cx="117" cy="120" rx="117" ry="114" fill="url(#hgrad)" />
          </g>
          <defs>
            <radialGradient id="hgrad" cx="0" cy="0" r="1"
              gradientTransform="matrix(50 55 -55 48 118 117)"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.3" />
              <stop offset="1" stopColor="#17B8F5" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating cards */}
      {[
        { icon: <Globe size={18} />, label: "Web Dev", x: "5%", y: "18%", delay: 0 },
        { icon: <Smartphone size={18} />, label: "Mobile", x: "72%", y: "12%", delay: 0.5 },
        { icon: <Cloud size={18} />, label: "Cloud", x: "78%", y: "62%", delay: 1 },
        { icon: <Brain size={18} />, label: "AI / ML", x: "4%", y: "66%", delay: 1.5 },
        { icon: <Shield size={18} />, label: "Security", x: "38%", y: "82%", delay: 0.8 },
        { icon: <Code2 size={18} />, label: "APIs", x: "34%", y: "4%", delay: 1.2 },
      ].map((card) => (
        <motion.div
          key={card.label}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.5 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: card.delay }}
          className="absolute flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
          style={{
            left: card.x,
            top: card.y,
            fontFamily: "'DM Sans', sans-serif",
            background: dark
              ? "rgba(17,24,39,0.9)"
              : "rgba(255,255,255,0.95)",
            border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
            boxShadow: "0 8px 24px rgba(23,184,245,0.15)",
            color: "#17B8F5",
            backdropFilter: "blur(8px)",
          }}
        >
          {card.icon}
          <span style={{ color: dark ? "#CBD5E1" : "#374151" }}>{card.label}</span>
        </motion.div>
      ))}

      {/* Orbit rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border opacity-10"
        style={{ borderColor: "#17B8F5", borderStyle: "dashed" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border opacity-15"
        style={{ borderColor: "#17B8F5" }}
      />
    </div>
  );
}

function HeroSection({ dark }: { dark: boolean }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: dark
          ? "linear-gradient(135deg, #080E1A 0%, #0D1A2E 50%, #080E1A 100%)"
          : "linear-gradient(135deg, #F0F9FF 0%, #F8FAFC 50%, #EFF9FE 100%)",
        paddingTop: "80px",
      }}
    >
      {/* Mesh bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #17B8F5 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2F8EB8 0%, transparent 70%)", filter: "blur(50px)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: dark ? "rgba(23,184,245,0.12)" : "rgba(23,184,245,0.1)",
                color: "#17B8F5",
                border: "1px solid rgba(23,184,245,0.25)",
              }}
            >
              <Zap size={12} /> We simplify the world
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 leading-[1.08]"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              color: dark ? "#F1F5F9" : "#0F172A",
              letterSpacing: "-0.03em",
            }}
          >
            Transforming Ideas Into{" "}
            <span style={{ color: "#17B8F5" }}>Powerful Digital</span> Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg leading-relaxed mb-8 max-w-xl"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: dark ? "#94A3B8" : "#64748B",
            }}
          >
            Ensemble builds scalable websites, mobile apps, enterprise software, cloud infrastructure,
            and AI-powered solutions that help businesses grow and compete in the digital era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "linear-gradient(135deg, #17B8F5 0%, #2F8EB8 100%)",
                boxShadow: "0 8px 24px rgba(23,184,245,0.4)",
              }}
            >
              Get Started <ArrowRight size={15} />
            </a>
            <a
              href="#portfolio"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: dark ? "#CBD5E1" : "#374151",
                border: `1.5px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
                background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
              }}
            >
              <Play size={15} /> View Portfolio
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-8 mt-12"
          >
            {[
              { value: "100+", label: "Projects" },
              { value: "95%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
              { value: "10+", label: "Tech Stacks" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Satoshi', sans-serif", color: "#17B8F5" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#64748B" : "#94A3B8" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <HeroIllustration dark={dark} />
        </motion.div>
      </div>
    </section>
  );
}

// --- Trusted By ---

const CLIENTS = [
  "TechForward", "MediCare Digital", "FinEdge Corp", "EduSphere",
  "RetailMax", "BuildSmart", "CloudVault", "GreenLeaf Tech",
  "NovaBanking", "PharmaLink", "ShopNest", "LogiTrack",
];

function TrustedBy({ dark }: { dark: boolean }) {
  return (
    <div
      className="border-y py-12"
      style={{
        borderColor: dark ? "#1E3A50" : "#E5E7EB",
        background: dark ? "#0D1626" : "#FFFFFF",
      }}
    >
      <p
        className="text-center text-xs font-semibold tracking-widest uppercase mb-8"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: dark ? "#475569" : "#94A3B8",
        }}
      >
        Trusted by innovative companies
      </p>
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 w-max"
        >
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <span
              key={i}
              className="text-sm font-semibold px-6 py-2 rounded-full whitespace-nowrap"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                color: dark ? "#475569" : "#94A3B8",
                border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
              }}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// --- Services ---

const SERVICES = [
  { icon: Globe, title: "Website Development", desc: "Blazing-fast, SEO-optimised websites built with modern frameworks that scale with your ambitions." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native iOS, Android, and cross-platform apps with delightful UX and rock-solid performance." },
  { icon: Palette, title: "UI/UX Design", desc: "Research-driven design systems, wireframes, and pixel-perfect interfaces that users love." },
  { icon: Server, title: "Backend Development", desc: "Robust APIs, microservices, and server-side logic built for security and scale." },
  { icon: Cloud, title: "Cloud Solutions", desc: "AWS, Azure, and GCP architecture, migration, and optimisation to reduce costs and latency." },
  { icon: GitBranch, title: "DevOps & CI/CD", desc: "Automated pipelines, containerisation, Kubernetes orchestration, and infrastructure as code." },
  { icon: HardDrive, title: "Web Hosting & Domains", desc: "Managed hosting, SSL certificates, domain registration, and 99.9% uptime SLA." },
  { icon: HeadphonesIcon, title: "IT Support", desc: "24/7 monitoring, incident response, helpdesk, and proactive maintenance contracts." },
  { icon: Building2, title: "Enterprise Software", desc: "ERP, CRM, HRM, and custom enterprise platforms tailored to your business processes." },
  { icon: Brain, title: "AI Integration", desc: "LLM-powered features, ML model deployment, NLP pipelines, and intelligent automation." },
  { icon: Zap, title: "Automation Solutions", desc: "Workflow automation, RPA, and smart integrations that eliminate manual bottlenecks." },
  { icon: RefreshCw, title: "Digital Transformation", desc: "End-to-end strategy, roadmap, and execution to modernise your entire technology stack." },
];

function ServicesSection({ dark }: { dark: boolean }) {
  return (
    <Section id="services" className="py-24 px-6" style={{ background: dark ? "#080E1A" : "#F8FAFC" } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
            What We Do
          </span>
          <h2
            className="mb-4"
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}
          >
            Full-Spectrum Digital Services
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#64748B" : "#64748B" }}>
            From idea to launch and beyond — every service you need under one roof, delivered by specialists who care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(23,184,245,0.15)" }}
              className="p-6 rounded-2xl cursor-default transition-colors duration-300"
              style={{
                background: dark ? "#111827" : "#FFFFFF",
                border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(23,184,245,0.1)" }}
              >
                <Icon size={20} style={{ color: "#17B8F5" }} />
              </div>
              <h3
                className="font-semibold mb-2 text-sm"
                style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B", fontSize: "0.95rem" }}
              >
                {title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#64748B" : "#64748B" }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// --- Why Choose ---

const STATS = [
  { value: 100, suffix: "+", label: "Projects Delivered", icon: Rocket },
  { value: 95, suffix: "%", label: "Client Satisfaction", icon: Star },
  { value: 50, suffix: "+", label: "Team Members", icon: Users },
  { value: 24, suffix: "/7", label: "Support Available", icon: Clock },
];

const REASONS = [
  "Innovation-first engineering culture",
  "WCAG-compliant, accessible by default",
  "Agile sprints with weekly demos",
  "Transparent pricing, no hidden costs",
  "Security-first architecture practices",
  "Dedicated project manager for every client",
  "Post-launch maintenance & monitoring",
  "Multi-cloud expertise across AWS, Azure, GCP",
];

function WhyChooseSection({ dark }: { dark: boolean }) {
  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{
        background: dark
          ? "linear-gradient(135deg, #0D1A2E 0%, #080E1A 100%)"
          : "linear-gradient(135deg, #F0F9FF 0%, #EFF9FE 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
              Why Ensemble
            </span>
            <h2
              className="mb-6"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}
            >
              Built on Trust, Delivered with Excellence
            </h2>
            <p className="mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#94A3B8" : "#64748B" }}>
              We don&apos;t just write code — we become your technology partner. Every project at Ensemble is backed by
              rigorous process, senior oversight, and a genuine commitment to your success.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REASONS.map((r) => (
                <div key={r} className="flex items-start gap-3">
                  <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "#17B8F5" }} />
                  <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#CBD5E1" : "#374151" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map(({ value, suffix, label, icon: Icon }) => (
              <motion.div
                key={label}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                className="p-7 rounded-2xl text-center"
                style={{
                  background: dark ? "#111827" : "#FFFFFF",
                  border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
                  boxShadow: "0 4px 20px rgba(23,184,245,0.06)",
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(23,184,245,0.1)" }}>
                  <Icon size={22} style={{ color: "#17B8F5" }} />
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: "'Satoshi', sans-serif", color: "#17B8F5" }}
                >
                  <Counter to={value} suffix={suffix} />
                </div>
                <div className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#64748B" : "#94A3B8" }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Process ---

const STEPS = [
  { num: "01", title: "Discovery", desc: "Deep-dive into your goals, audience, and constraints." },
  { num: "02", title: "Planning", desc: "Define scope, architecture, and a realistic timeline." },
  { num: "03", title: "UI/UX Design", desc: "Wireframes → high-fidelity prototypes with your feedback." },
  { num: "04", title: "Development", desc: "Agile sprints, code reviews, and daily standups." },
  { num: "05", title: "Testing", desc: "QA, performance, security, and accessibility audits." },
  { num: "06", title: "Deployment", desc: "Zero-downtime release, monitoring, and alerting setup." },
  { num: "07", title: "Launch", desc: "Go live with confidence — everything checked twice." },
  { num: "08", title: "Support", desc: "Ongoing maintenance, iterations, and 24/7 incident response." },
];

function ProcessSection({ dark }: { dark: boolean }) {
  return (
    <Section id="solutions" className="py-24 px-6" style={{ background: dark ? "#080E1A" : "#FFFFFF" } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
            How We Work
          </span>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}>
            Our Development Process
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STEPS.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative p-5 rounded-2xl"
              style={{
                background: dark ? "#111827" : "#F8FAFC",
                border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
              }}
            >
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-3 z-10">
                  <ChevronRight size={16} style={{ color: "#17B8F5", opacity: 0.5 }} />
                </div>
              )}
              <span
                className="block text-3xl font-bold mb-3"
                style={{ fontFamily: "'Satoshi', sans-serif", color: "rgba(23,184,245,0.25)" }}
              >
                {num}
              </span>
              <h3 className="font-semibold mb-1.5 text-sm" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>
                {title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#64748B" : "#64748B" }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// --- Tech Stack ---

const TECHS = [
  "React", "Next.js", "Angular", "Vue.js", "TypeScript",
  "Node.js", "Express", "Laravel", "Python", "Django",
  "Java", "Spring Boot", ".NET", "Flutter", "React Native",
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes",
  "MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase",
  "GraphQL", "Redis", "Nginx", "Terraform", "GitHub Actions",
];

function TechStackSection({ dark }: { dark: boolean }) {
  return (
    <Section className="py-24 px-6" style={{ background: dark ? "linear-gradient(135deg, #0D1A2E 0%, #080E1A 100%)" : "linear-gradient(135deg, #F0F9FF 0%, #F8FAFC 100%)" } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
            Our Stack
          </span>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}>
            Technologies We Master
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {TECHS.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.025 }}
              whileHover={{ scale: 1.07, y: -2 }}
              className="px-4 py-2 rounded-full text-xs font-semibold cursor-default"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: dark ? "#111827" : "#FFFFFF",
                border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
                color: dark ? "#CBD5E1" : "#374151",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </Section>
  );
}

// --- Portfolio ---

const PROJECTS = [
  {
    title: "Dream Runners",
    cat: "Fitness",
    tech: ["React Native", "Node.js", "MongoDB", "Google Maps", "Firebase", "REST APIs"],
    color: "#17B8F5",
    img: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    desc: "Running and marathon platform with AI coaching, leaderboards, chapters, and race preparation tools.",
    caseStudy: {
      challenge: "Running enthusiasts struggled with disconnected fitness apps that lacked structured training plans, community engagement, real-time leaderboards, and race preparation tools.",
      solution: "Designed a comprehensive fitness platform that combines AI-powered workout tracking, structured marathon training schedules, real-time leaderboards, chapter-based communities, race countdowns, and performance analytics.",
      results: ["500+ active community runners", "Real-time global rankings", "Structured weekly training plans", "Community chapter engagement", "Performance insights dashboard", "Improved runner motivation"],
      features: ["Workout Tracking", "Marathon Training Plans", "Community Chapters", "Leaderboards", "Race Countdown", "Performance Analytics", "Activity History", "Challenge System", "Progress Dashboard", "Race Day Information"],
      metrics: ["10.05 km Weekly Average Distance", "02:02 Hrs Weekly Training Time", "500+ Community Members"]
    }
  },
  {
    title: "School Transport Management System",
    cat: "Logistics",
    tech: ["Flutter", "Node.js", "Google Maps API", "Firebase", "MongoDB", "Push Notifications"],
    color: "#2F8EB8",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    desc: "Transport ecosystem for parents, drivers, and administrators with live GPS, route monitoring, and trip updates.",
    caseStudy: {
      challenge: "Schools lacked a centralized transport management system for parents, drivers, transport administrators, and employees.",
      solution: "Designed a complete transport ecosystem with dedicated applications for Parents, Drivers, and Employees, providing live GPS tracking, absence management, notifications, route monitoring, vehicle details, and trip history.",
      results: ["Improved student safety", "Real-time transport visibility", "Reduced parent enquiries", "Faster communication", "Better fleet monitoring", "Simplified transport operations"],
      features: ["Live GPS Bus Tracking", "Parent Dashboard", "Driver Application", "Employee Portal", "Route Management", "Attendance & Absence", "Vehicle Information", "Driver Details", "Push Notifications", "Trip History", "Emergency Contacts", "Feedback System"],
      metrics: ["3 User Applications", "Live GPS Tracking", "100% Route Transparency"]
    }
  },
  {
    title: "Quran for Grammar (Tamil)",
    cat: "Education",
    tech: ["Flutter", "Firebase", "SQLite", "REST API", "Audio Streaming"],
    color: "#49B8E6",
    img: "https://plus.unsplash.com/premium_photo-1677587536653-0d02efbb70ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Quran learning platform with grammar explanations, Tamil support, bookmarks, and progress tracking.",
    caseStudy: {
      challenge: "Learning Quranic Arabic grammar is difficult for Tamil-speaking learners because most resources separate grammar explanations from Quran reading.",
      solution: "Designed a learning platform that integrates Quran reading with word-by-word grammar explanations, vocabulary learning, bookmarks, progress tracking, daily streaks, and multilingual support.",
      results: ["Simplified Quran grammar learning", "Improved daily engagement", "Interactive educational experience", "Personalized learning journey", "Vocabulary retention"],
      features: ["Word-by-Word Grammar", "Quran Reading", "Tamil Translation", "Vocabulary Builder", "Daily Streak", "Bookmarks", "Audio Playback", "Search Surahs", "Premium Learning", "Progress Tracking"],
      metrics: ["114 Surahs", "7 Days Learning Streak", "100% Tamil Grammar Support"]
    }
  },
  {
    title: "Manateq Website Redesign",
    cat: "Corporate",
    tech: ["Figma", "HTML5", "CSS3", "JavaScript", "Responsive Design", "UI Design System"],
    color: "#F59E0B",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    desc: "Modern enterprise website redesign with improved navigation, engagement, and investor-focused experience.",
    caseStudy: {
      challenge: "The existing corporate website had outdated navigation, weak visual hierarchy, limited user engagement, and a traditional layout.",
      solution: "Redesigned the website with a modern enterprise experience focused on improved navigation, responsive layouts, interactive service sections, dynamic statistics, stronger CTAs, and a refined visual identity.",
      results: ["Better content accessibility", "Improved navigation flow", "Stronger visual branding", "Increased user engagement", "Enhanced mobile experience", "Better investor experience"],
      features: ["Enterprise Website", "Responsive Design", "Modern Navigation", "Interactive Service Cards", "Statistics Dashboard", "Contact Forms", "Testimonials", "Mobile Optimization", "Improved Information Architecture", "CTA Optimization"],
      metrics: ["13 Industrial Zones", "47M+ SQM Development Area", "71% Operational Units"]
    }
  },
  {
    title: "Library Management System",
    cat: "Education",
    tech: ["React", "Node.js", "MongoDB", "Dashboard UI", "REST APIs"],
    color: "#10B981",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    desc: "Centralized library management platform for inventory, members, borrowing, and reporting.",
    caseStudy: {
      challenge: "Libraries struggle with manually tracking multiple copies of books, borrowing history, overdue returns, and member management.",
      solution: "Designed a digital Library Management System that streamlines book inventory, member management, borrowing workflows, overdue tracking, accession management, dashboards, and reporting.",
      results: ["Reduced manual work", "Improved inventory accuracy", "Faster book management", "Better borrowing visibility", "Efficient librarian workflow"],
      features: ["Library Dashboard", "Book Inventory", "Member Management", "Borrow & Return", "Accession Tracking", "Overdue Management", "Book History", "Search & Filters", "Reports", "Analytics"],
      metrics: ["11,205 Books Managed", "2,420 Members", "320 Borrowed Books"]
    }
  },
  {
    title: "NV Infra Real Estate Website",
    cat: "Real Estate",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Google Maps", "CMS Integration"],
    color: "#8B5CF6",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    desc: "Luxury real estate website showcasing premium villas, portfolios, pricing, and lead generation.",
    caseStudy: {
      challenge: "Luxury real estate companies require a visually appealing digital presence that showcases premium properties and generates qualified leads.",
      solution: "Designed a modern real estate website that highlights luxury villas, project portfolios, pricing packages, company expertise, and enquiry forms with a clean user experience.",
      results: ["Premium brand perception", "Improved property discovery", "Better customer engagement", "Increased enquiry opportunities", "Modern digital presence"],
      features: ["Property Showcase", "Villa Portfolio", "Pricing Packages", "Company Overview", "Contact Forms", "Interactive Gallery", "Project Highlights", "Lead Generation", "Responsive Design"],
      metrics: ["25+ Years Experience", "200+ Projects Completed", "500+ Happy Customers"]
    }
  }
];

function CaseStudyModal({ project, onClose, dark }: { project: typeof PROJECTS[0] | null; onClose: () => void; dark: boolean }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ background: dark ? "#111827" : "#FFFFFF" }}
      >
        {/* Close Button */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b" style={{ borderColor: dark ? "#1E3A50" : "#E5E7EB", background: dark ? "#0F1419" : "#F8FAFC" }}>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#F1F5F9" : "#0F172A" }}>
            {project.title}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition" style={{ background: dark ? "#1E3A50" : "#E5E7EB" }}>
            <X size={20} color={dark ? "#94A3B8" : "#64748B"} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Project Image */}
          <div className="h-72 rounded-2xl overflow-hidden">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Challenge */}
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>
              The Challenge
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: "1.6" }}>
              {project.caseStudy.challenge}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>
              Our Solution
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#94A3B8" : "#64748B", lineHeight: "1.6" }}>
              {project.caseStudy.solution}
            </p>
          </div>

          {/* Features Grid */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>
              Key Features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.caseStudy.features.map((feature) => (
                <div key={feature} className="p-3 rounded-lg" style={{ background: dark ? "#1A2640" : "#EFF9FE" }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} color="#17B8F5" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#17B8F5", fontSize: "0.875rem", fontWeight: 500 }}>
                      {feature}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>
              Results & Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.caseStudy.results.map((result, i) => (
                <div key={i} className="p-4 rounded-lg border" style={{ borderColor: dark ? "#1E3A50" : "#E5E7EB", background: dark ? "#0F1419" : "#F8FAFC" }}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg" style={{ background: "#17B8F5" }}>
                      <Rocket size={16} color="#FFFFFF" />
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#CBD5E1" : "#374151", fontSize: "0.875rem", fontWeight: 500 }}>
                      {result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>
              Key Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.caseStudy.metrics.map((metric, i) => (
                <div key={i} className="p-6 rounded-2xl text-center" style={{ background: dark ? "#1A2640" : "#EFF9FE", border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}` }}>
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#17B8F5", marginBottom: "0.5rem" }}>
                    {metric.split(" ")[0]}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: dark ? "#94A3B8" : "#64748B" }}>
                    {metric.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: project.color, color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PortfolioSection({ dark }: { dark: boolean }) {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <Section id="portfolio" className="py-24 px-6" style={{ background: dark ? "#080E1A" : "#FFFFFF" } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
            Our Work
          </span>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}>
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map(({ title, cat, tech, img, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              style={{
                background: dark ? "#111827" : "#F8FAFC",
                border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
              }}
              onClick={() => setSelectedProject(PROJECTS[i])}
            >
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(23,184,245,0.9)", color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {cat}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-2" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B", fontSize: "1rem" }}>
                  {title}
                </h3>
                <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#94A3B8" : "#64748B" }}>
                  {desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ fontFamily: "'DM Sans', sans-serif", background: dark ? "#1A2640" : "#EFF9FE", color: "#17B8F5" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 w-full justify-center py-2 rounded-lg"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#FFFFFF", background: "#17B8F5" }}>
                  View Case Study <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Modal */}
        {selectedProject && (
          <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} dark={dark} />
        )}
      </div>
    </Section>
  );
}

// --- Testimonials ---

const TESTIMONIALS = [
  {
    name: "Arun R.", role: "Founder, Dream Runners", stars: 5,
    text: "Ensemble delivered our running app with an engaging interface and smooth GPS integration. The product launch exceeded our retention and performance targets.",
    img: "1494790108377-be9c29b29330",
  },
  {
    name: "Leena S.", role: "Operations Head, School Transport Management System", stars: 5,
    text: "Their team built a reliable transport platform that simplified route monitoring, parent communication, and admin workflows in a single launch-ready product.",
    img: "1507003211169-0a1dd7228f2d",
  },
  {
    name: "Mohammed K.", role: "Product Lead, NV Infra Real Estate", stars: 5,
    text: "The website redesign elevated our premium brand and improved lead generation. The team was responsive, detail-oriented, and delivery-focused.",
    img: "1438761681033-6461ffad8d80",
  },
];

function TestimonialsSection({ dark }: { dark: boolean }) {
  return (
    <Section className="py-24 px-6" style={{ background: dark ? "linear-gradient(135deg, #0D1A2E 0%, #080E1A 100%)" : "linear-gradient(135deg, #F0F9FF 0%, #EFF9FE 100%)" } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
            Client Stories
          </span>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}>
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, stars, text, img }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-7 rounded-2xl"
              style={{
                background: dark ? "#111827" : "#FFFFFF",
                border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
              }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: stars }).map((_, j) => (
                  <Star key={j} size={14} fill="#F59E0B" stroke="none" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6 italic"
                style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#94A3B8" : "#4B5563" }}>
                "{text}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={`https://images.unsplash.com/photo-${img}?w=80&h=80&fit=crop&auto=format`}
                  alt={name}
                  className="w-10 h-10 rounded-full object-cover bg-slate-200"
                />
                <div>
                  <div className="text-sm font-semibold" style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>{name}</div>
                  <div className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#17B8F5" }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// --- Pricing ---

const PLANS = [
  {
    name: "Starter", price: "$999", period: "project", tag: null,
    desc: "Perfect for startups and small businesses launching their first digital product.",
    features: ["5-page responsive website", "Mobile-optimized design", "Contact form & SEO basics", "3-month support", "1 revision round"],
  },
  {
    name: "Professional", price: "$3,999", period: "project", tag: "Most Popular",
    desc: "Ideal for growing SMEs that need a robust web app or mobile solution.",
    features: ["Custom web or mobile app", "UI/UX design system", "Backend API development", "Cloud deployment", "6-month support", "Unlimited revisions", "Analytics integration"],
  },
  {
    name: "Enterprise", price: "Custom", period: "quote", tag: null,
    desc: "For large organisations requiring end-to-end digital transformation at scale.",
    features: ["Full digital transformation", "Dedicated project team", "AI & automation integration", "Multi-cloud architecture", "24/7 SLA support", "Security audit included", "Staff training & docs", "Ongoing retainer option"],
  },
];

function PricingSection({ dark }: { dark: boolean }) {
  return (
    <Section id="pricing" className="py-24 px-6" style={{ background: dark ? "#080E1A" : "#FFFFFF" } as React.CSSProperties}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
            Pricing
          </span>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}>
            Transparent, Value-Driven Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(({ name, price, period, tag, desc, features }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-7 rounded-2xl flex flex-col"
              style={{
                background: tag
                  ? "linear-gradient(135deg, #17B8F5 0%, #2F8EB8 100%)"
                  : dark ? "#111827" : "#F8FAFC",
                border: `1px solid ${tag ? "#17B8F5" : dark ? "#1E3A50" : "#E5E7EB"}`,
                boxShadow: tag ? "0 20px 60px rgba(23,184,245,0.35)" : "none",
              }}
            >
              {tag && (
                <span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: "#0F172A", color: "#17B8F5" }}
                >
                  {tag}
                </span>
              )}
              <div className="mb-5">
                <h3 className="font-bold text-lg mb-1"
                  style={{ fontFamily: "'Satoshi', sans-serif", color: tag ? "#FFFFFF" : dark ? "#E2E8F0" : "#1E293B" }}>
                  {name}
                </h3>
                <p className="text-xs leading-relaxed mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: tag ? "rgba(255,255,255,0.75)" : dark ? "#64748B" : "#64748B" }}>
                  {desc}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold"
                    style={{ fontFamily: "'Satoshi', sans-serif", color: tag ? "#FFFFFF" : "#17B8F5" }}>
                    {price}
                  </span>
                  <span className="text-sm mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: tag ? "rgba(255,255,255,0.6)" : dark ? "#475569" : "#94A3B8" }}>
                    /{period}
                  </span>
                </div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: tag ? "rgba(255,255,255,0.9)" : dark ? "#CBD5E1" : "#374151" }}>
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: tag ? "#FFFFFF" : "#17B8F5" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: tag ? "#FFFFFF" : "linear-gradient(135deg, #17B8F5 0%, #2F8EB8 100%)",
                  color: tag ? "#17B8F5" : "#FFFFFF",
                }}
              >
                {price === "Custom" ? "Request Quote" : "Get Started"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// --- FAQ ---

const FAQS = [
  { q: "How long does a typical project take?", a: "Timelines vary by scope. A standard website takes 3–5 weeks; a complex web app or mobile product is typically 8–16 weeks. We provide a detailed schedule after our discovery phase." },
  { q: "Do you offer post-launch support?", a: "Yes. All projects include a support period (length depends on plan), and we offer ongoing maintenance retainers for bug fixes, updates, and feature additions." },
  { q: "Can you work with our existing codebase?", a: "Absolutely. We regularly take over legacy codebases, perform audits, refactor, and extend them. We&apos;ll provide an honest assessment before committing to anything." },
  { q: "What industries do you specialise in?", a: "Healthcare, FinTech, EdTech, Retail, Logistics, Enterprise SaaS — though our engineering practices apply across any domain. We ask the right questions to adapt quickly." },
  { q: "Is my data and IP protected?", a: "Yes. We sign NDAs and assign full IP ownership to you upon final payment. All client data is handled under strict confidentiality agreements." },
  { q: "Do you work with international clients?", a: "Yes. We have clients across North America, Europe, the Middle East, and Southeast Asia. Remote collaboration is a core competency, not an afterthought." },
];

function FAQSection({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section className="py-24 px-6" style={{ background: dark ? "linear-gradient(135deg, #0D1A2E 0%, #080E1A 100%)" : "linear-gradient(135deg, #F0F9FF 0%, #EFF9FE 100%)" } as React.CSSProperties}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
            FAQ
          </span>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                background: dark ? "#111827" : "#FFFFFF",
                border: `1px solid ${open === i ? "#17B8F5" : dark ? "#1E3A50" : "#E5E7EB"}`,
                transition: "border-color 0.2s",
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm pr-4"
                  style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>
                  {q}
                </span>
                <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: open === i ? "#17B8F5" : dark ? "#1A2640" : "#F1F5F9" }}>
                  {open === i
                    ? <Minus size={14} color="#FFFFFF" />
                    : <Plus size={14} color={dark ? "#94A3B8" : "#64748B"} />}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#94A3B8" : "#64748B" }}>
                    {a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// --- Contact ---

const SERVICES_OPTIONS = [
  "Website Development", "Mobile App Development", "UI/UX Design", "Backend / API",
  "Cloud Solutions", "DevOps", "Enterprise Software", "AI Integration", "Other",
];

function ContactSection({ dark }: { dark: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Section id="contact" className="py-24 px-6" style={{ background: dark ? "#080E1A" : "#FFFFFF" } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "rgba(23,184,245,0.1)", color: "#17B8F5", border: "1px solid rgba(23,184,245,0.2)" }}>
            Get In Touch
          </span>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: dark ? "#F1F5F9" : "#0F172A", letterSpacing: "-0.025em" }}>
            Let&apos;s Build Something Great
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: Mail, label: "Email Us", value: "hello@ensembleits.com", sub: "We reply within 24 hours" },
              { icon: Phone, label: "Call Us", value: "+91 8148831989", sub: "Mon–Fri, 10am–7pm IST" },
              { icon: MapPin, label: "Office", value: "1, New Secretariat colony 5th Street, Velachery, Chennai, 600042", sub: "India" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex gap-4 p-5 rounded-2xl"
                style={{ background: dark ? "#111827" : "#F8FAFC", border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(23,184,245,0.1)" }}>
                  <Icon size={18} style={{ color: "#17B8F5" }} />
                </div>
                <div>
                  <div className="text-xs font-medium mb-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#64748B" : "#94A3B8" }}>{label}</div>
                  <div className="text-sm font-semibold"
                    style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#E2E8F0" : "#1E293B" }}>{value}</div>
                  <div className="text-xs mt-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#475569" : "#94A3B8" }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: dark ? "#111827" : "#F1F5F9",
                    border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
                    color: dark ? "#64748B" : "#94A3B8",
                  }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(23,184,245,0.1)" }}>
                  <CheckCircle size={32} style={{ color: "#17B8F5" }} />
                </div>
                <h3 className="text-xl font-bold"
                  style={{ fontFamily: "'Satoshi', sans-serif", color: dark ? "#F1F5F9" : "#0F172A" }}>
                  Message Sent!
                </h3>
                <p className="text-sm text-center max-w-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: dark ? "#94A3B8" : "#64748B" }}>
                  Thanks for reaching out. A member of our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handle} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "name", placeholder: "Full Name", type: "text" },
                    { name: "email", placeholder: "Work Email", type: "email" },
                    { name: "phone", placeholder: "Phone Number", type: "tel" },
                    { name: "company", placeholder: "Company Name", type: "text" },
                  ].map(({ name, placeholder, type }) => (
                    <input
                      key={name}
                      type={type}
                      placeholder={placeholder}
                      value={(form as Record<string, string>)[name]}
                      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: dark ? "#111827" : "#F8FAFC",
                        border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
                        color: dark ? "#E2E8F0" : "#1E293B",
                      }}
                    />
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: dark ? "#111827" : "#F8FAFC",
                      border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
                      color: form.service ? (dark ? "#E2E8F0" : "#1E293B") : (dark ? "#475569" : "#94A3B8"),
                    }}
                  >
                    <option value="" disabled>Service Required</option>
                    {SERVICES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: dark ? "#111827" : "#F8FAFC",
                      border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
                      color: form.budget ? (dark ? "#E2E8F0" : "#1E293B") : (dark ? "#475569" : "#94A3B8"),
                    }}
                  >
                    <option value="" disabled>Budget Range</option>
                    {["Under $1K", "$1K–$5K", "$5K–$20K", "$20K–$50K", "$50K+"].map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: dark ? "#111827" : "#F8FAFC",
                    border: `1px solid ${dark ? "#1E3A50" : "#E5E7EB"}`,
                    color: dark ? "#E2E8F0" : "#1E293B",
                  }}
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "linear-gradient(135deg, #17B8F5 0%, #2F8EB8 100%)",
                    boxShadow: "0 8px 24px rgba(23,184,245,0.3)",
                  }}
                >
                  Send Message <ArrowRight size={14} className="inline ml-1.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

// --- Footer ---

function Footer({ dark }: { dark: boolean }) {
  return (
    <footer
      className="pt-16 pb-8 px-6 border-t"
      style={{
        background: dark ? "#060C17" : "#0F172A",
        borderColor: dark ? "#1E3A50" : "#1E293B",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <EnsembleLogo dark size={36} />
            <p className="mt-4 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#64748B" }}>
              Transforming ambitious ideas into powerful digital solutions. Your trusted partner for the full technology journey.
            </p>
            <div className="flex gap-3 mt-5">
              {[Linkedin, Twitter, Github, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:text-[#17B8F5]"
                  style={{ background: "#1E293B", color: "#64748B" }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { heading: "Services", links: ["Website Dev", "Mobile Apps", "UI/UX Design", "Cloud Solutions", "AI Integration"] },
            { heading: "Company", links: ["About Us", "Portfolio", "Case Studies", "Careers", "Blog"] },
            { heading: "Contact", links: ["hello@ensembleits.com", "+91 8148831989", "Privacy Policy", "Terms of Service", "Sitemap"] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm mb-4"
                style={{ fontFamily: "'Satoshi', sans-serif", color: "#E2E8F0" }}>
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs transition-colors duration-200 hover:text-[#17B8F5]"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "#64748B" }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 rounded-2xl mb-10"
          style={{ background: "rgba(23,184,245,0.06)", border: "1px solid rgba(23,184,245,0.12)" }}
        >
          <div className="flex-1">
            <h4 className="font-semibold mb-1 text-sm"
              style={{ fontFamily: "'Satoshi', sans-serif", color: "#E2E8F0" }}>
              Stay in the loop
            </h4>
            <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#64748B" }}>
              Monthly insights on tech, product, and digital strategy. No spam.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "#1E293B",
                border: "1px solid #334155",
                color: "#E2E8F0",
              }}
            />
            <button
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white"
              style={{ fontFamily: "'DM Sans', sans-serif", background: "linear-gradient(135deg, #17B8F5 0%, #2F8EB8 100%)" }}
            >
              Subscribe
            </button>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between pt-6 border-t gap-3"
          style={{ borderColor: "#1E293B" }}
        >
          <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#475569" }}>
            © 2025 Ensemble IT Solutions. All rights reserved.
          </p>
          <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#475569" }}>
            Built with ❤ by the Ensemble Team · We simplify the world
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- App ---

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: dark ? "#080E1A" : "#F8FAFC",
      }}
    >
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <HeroSection dark={dark} />
      <TrustedBy dark={dark} />
      <ServicesSection dark={dark} />
      <WhyChooseSection dark={dark} />
      <ProcessSection dark={dark} />
      <TechStackSection dark={dark} />
      <PortfolioSection dark={dark} />
      <FAQSection dark={dark} />
      <ContactSection dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}
