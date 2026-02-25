'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, ExternalLink, ChevronDown, Zap, Brain, Eye, Code2 } from 'lucide-react';

// ✅ FIXED MOTION CONSTANTS (Next.js 16 + Framer Motion compatible)
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
});

// ── Typing animation hook ────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return text;
}

// ── Stat counter ─────────────────────────────────────────────────────────────
function StatCard({ value, label, suffix = '%' }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        let start = 0;
        const step = value / 50;
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, started]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-white tabular-nums">
        {count}<span className="text-cyan-400">{suffix}</span>
      </div>
      <div className="text-sm text-gray-400 mt-1 max-w-[120px] mx-auto">{label}</div>
    </div>
  );
}

// ── Download CV helper (fixes the backslash bug in original) ─────────────────
function downloadCV() {
  const link = document.createElement('a');
  link.href = '/resume.pdf';          // forward slash — critical fix
  link.download = 'Vidhya_ES_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ── Smooth scroll helper ──────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const typed = useTypewriter(['Computer Vision', 'AI/ML Engineering', 'NLP & Healthcare AI', 'Robotics Vision']);

  const skills = [
    { cat: 'Programming', icon: <Code2 className="w-5 h-5" />, color: 'cyan', items: ['Python', 'Java', 'SQL', 'C'] },
    { cat: 'Machine Learning', icon: <Brain className="w-5 h-5" />, color: 'purple', items: ['Scikit-learn', 'Random Forest', 'SVM', 'Feature Engineering', 'Classification', 'Regression'] },
    { cat: 'Deep Learning', icon: <Zap className="w-5 h-5" />, color: 'cyan', items: ['PyTorch', 'TensorFlow', 'YOLOv8', 'CNNs', 'Transfer Learning'] },
    { cat: 'Computer Vision', icon: <Eye className="w-5 h-5" />, color: 'purple', items: ['OpenCV', 'SAM', 'COCO', 'Roboflow', 'OCR', 'TrOCR'] },
    { cat: 'NLP', icon: <Brain className="w-5 h-5" />, color: 'cyan', items: ['BERT', 'BioClinicalBERT', 'spaCy', 'Hugging Face'] },
    { cat: 'Deployment', icon: <Code2 className="w-5 h-5" />, color: 'purple', items: ['Django', 'Flask', 'Docker', 'Firebase', 'Git', 'Streamlit'] },
  ];

  const projects = [
    {
      tag: 'Computer Vision • Robotics',
      color: 'cyan',
      title: 'Object Segmentation for Semi-Humanoid Robots',
      desc: 'Real-time instance segmentation pipeline for robotic grasping using YOLOv8 + SAM. Achieved 15% higher accuracy and 20% lower inference latency on 3,000+ annotated images.',
      stack: ['YOLOv8', 'SAM', 'Roboflow', 'PyTorch'],
      metric: '15% ↑ accuracy',
    },
    {
      tag: 'OCR • NLP • Healthcare',
      color: 'purple',
      title: 'Medical Prescription Digitization',
      desc: 'End-to-end OCR + NLP system extracting and digitizing printed/handwritten prescriptions with 90% accuracy using TrOCR + OpenCV. Deployed via Streamlit.',
      stack: ['OpenCV', 'TrOCR', 'BioClinicalBERT', 'Streamlit'],
      metric: '90% accuracy',
    },
    {
      tag: 'NLP • Healthcare',
      color: 'cyan',
      title: 'Drug Interaction Detector',
      desc: 'Real-time drug-drug interaction checker using BioClinicalBERT & vector search. spaCy NER with knowledge base queries for clinical safety alerts. 88% accuracy.',
      stack: ['BioClinicalBERT', 'spaCy', 'Hugging Face', 'Streamlit'],
      metric: '88% accuracy',
    },
    {
      tag: 'Computer Vision • Retail',
      color: 'purple',
      title: 'SCANOVA: Smart Self-Checkout',
      desc: 'Real-time fruit/vegetable detection via webcam using TensorFlow. Full-stack React + Flask backend supporting 36+ product classes.',
      stack: ['TensorFlow', 'React', 'Flask', 'OpenCV'],
      metric: '36+ classes',
    },
    {
      tag: 'LLM • Education',
      color: 'cyan',
      title: 'Study Buddy: AI Learning Assistant',
      desc: 'Streamlit app powered by Google Gemini API generating MCQs, flashcards & explanations. JSON-based session history with polished custom UI.',
      stack: ['Google Gemini', 'Streamlit', 'Python', 'JSON'],
      metric: 'LLM powered',
    },
    {
      tag: 'Machine Learning • Placement',
      color: 'purple',
      title: 'PLACIFY: AI Campus Recruitment',
      desc: 'SVM-based job matching engine achieving 89% accuracy. Increased placement efficiency by 35% through intelligent candidate-role matching.',
      stack: ['SVM', 'Python', 'SQL', 'Scikit-learn'],
      metric: '89% accuracy',
    },
  ];

  return (
    <main className="overflow-hidden bg-[#080810] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@700;800&display=swap');
        .display { font-family: 'Space Grotesk', sans-serif; }
        .cursor::after { content: '|'; animation: blink 1s step-end infinite; color: #22d3ee; }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        .glow-cyan { box-shadow: 0 0 40px rgba(34,211,238,0.15); }
        .glow-purple { box-shadow: 0 0 40px rgba(168,85,247,0.15); }
        .card-hover { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080810; } ::-webkit-scrollbar-thumb { background: #22d3ee40; border-radius: 2px; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="min-h-screen flex items-center relative pt-24 pb-16">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Radial glow */}
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        {/* Noise overlay */}
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          {/* LEFT */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="space-y-8 z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-sm text-cyan-400"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Open to Computer Vision Roles
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display text-6xl lg:text-7xl font-black tracking-tight leading-tight"
            >
              Vidhya{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ES</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-gray-300 font-medium h-8"
            >
              <span className="cursor">{typed}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-400 max-w-lg leading-relaxed"
            >
              Building vision systems that turn pixels into intelligence — object detection, segmentation, and real-time analytics for robotics & healthcare.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {/* ✅ FIXED: View Projects — scrolls to #projects */}
              <button
                onClick={() => scrollTo('projects')}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-100"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* ✅ FIXED: Download CV — uses forward slash + proper link */}
              <button
                onClick={downloadCV}
                className="group flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-cyan-400 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 active:scale-100 hover:bg-white/5"
              >
                Download CV
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 pt-2"
            >
              <a href="mailto:vidhyavidhu088@gmail.com" className="p-3 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all" aria-label="Email">
                <Mail className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
              <a href="https://linkedin.com/in/vidhya-es-9946ufg" target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
              <a href="https://github.com/VidhyaES" target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all" aria-label="GitHub">
                <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
              <span className="text-gray-600 text-sm ml-2">vidhyavidhu088@gmail.com</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end z-10"
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[420px] h-[420px] rounded-full border border-cyan-500/10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-[360px] h-[360px] rounded-full border border-purple-500/10 animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            {/* Photo + chips wrapper — overflow visible so chips show outside image */}
            <div className="relative mx-12">
              {/* Glow behind photo */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-2xl" />
              <img
                src="/profile.jpg"
                alt="Vidhya ES — AI/ML Engineer"
                className="relative w-full max-w-sm lg:max-w-md rounded-[2rem] shadow-2xl border border-white/10 object-cover z-10"
              />
              {/* Floating stat chips — use translate instead of negative margin to avoid clipping */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute left-0 top-1/4 -translate-x-[calc(100%+8px)] bg-[#12121e] border border-cyan-500/30 rounded-2xl px-4 py-3 shadow-xl glow-cyan z-20"
              >
                <div className="text-2xl font-black text-cyan-400">90%</div>
                <div className="text-xs text-gray-400">OCR Accuracy</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute right-0 bottom-1/4 translate-x-[calc(100%+8px)] bg-[#12121e] border border-purple-500/30 rounded-2xl px-4 py-3 shadow-xl glow-purple z-20"
              >
                <div className="text-2xl font-black text-purple-400">6+</div>
                <div className="text-xs text-gray-400">AI Projects</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs">
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          <StatCard value={90} label="OCR Accuracy" />
          <StatCard value={89} label="SVM Accuracy (PLACIFY)" />
          <StatCard value={20} label="Latency Reduction" />
          <StatCard value={35} label="Placement Efficiency ↑" />
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <motion.div {...fadeUp}>
                <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">About Me</div>
                <h2 className="display text-5xl font-black leading-tight">
                  Building AI that<br />
                  <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">matters</span>
                </h2>
              </motion.div>
            </div>

            <div className="lg:col-span-3 space-y-6 text-gray-300 text-lg leading-relaxed">
              <motion.p {...stagger(0)} className="text-white text-xl font-medium">
                Aspiring AI/ML Engineer passionate about production-grade Computer Vision and Healthcare NLP systems that solve real-world problems.
              </motion.p>
              <motion.p {...stagger(1)}>
                During my AI/ML Engineering Internship at <span className="text-cyan-400 font-medium">iHub Robotics</span>, I designed and optimized real-time object segmentation pipelines using <span className="text-cyan-400">YOLOv8 + SAM</span>, achieving <span className="text-emerald-400 font-semibold">15% higher segmentation accuracy</span> and <span className="text-emerald-400 font-semibold">20% lower inference latency</span> on 3,000+ annotated images.
              </motion.p>
              <motion.p {...stagger(2)}>
                I excel at the full ML lifecycle — data annotation, feature engineering, model optimization, and deployment. Key wins: an <span className="text-emerald-400 font-semibold">88% accurate</span> drug interaction detector using BioClinicalBERT and an <span className="text-emerald-400 font-semibold">89% accurate</span> SVM-powered campus recruitment system.
              </motion.p>
              <motion.p {...stagger(3)} className="text-cyan-300 font-medium">
                Currently seeking full-time Computer Vision / AI Engineer roles where I can deliver measurable impact in robotics, healthcare, or intelligent systems.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 bg-[#0c0c18]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Technical Arsenal</div>
            <h2 className="display text-5xl font-black">Skills & Technologies</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {skills.map((group, i) => (
              <motion.div
                key={i}
                {...stagger(i)}
                className={`card-hover bg-white/3 border rounded-3xl p-7 ${group.color === 'cyan' ? 'border-cyan-500/10 hover:border-cyan-500/40 hover:glow-cyan' : 'border-purple-500/10 hover:border-purple-500/40 hover:glow-purple'}`}
              >
                <div className={`flex items-center gap-3 mb-5 ${group.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
                  {group.icon}
                  <h3 className="font-semibold text-sm uppercase tracking-wider">{group.cat}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${group.color === 'cyan' ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300 hover:border-cyan-500/50' : 'bg-purple-500/5 border-purple-500/20 text-purple-300 hover:border-purple-500/50'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Featured Work</div>
            <h2 className="display text-5xl font-black">Projects</h2>
            <p className="text-gray-400 mt-3">Production-ready AI/ML & Computer Vision systems</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                {...stagger(i)}
                className={`card-hover group relative bg-gradient-to-br from-white/[0.03] to-transparent border rounded-3xl p-8 flex flex-col ${p.color === 'cyan' ? 'border-cyan-500/10 hover:border-cyan-500/40' : 'border-purple-500/10 hover:border-purple-500/40'}`}
              >
                {/* Metric badge */}
                <div className={`absolute top-6 right-6 text-xs px-3 py-1 rounded-full font-semibold ${p.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                  {p.metric}
                </div>

                <div className={`text-xs uppercase tracking-widest mb-3 ${p.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>{p.tag}</div>
                <h3 className="text-xl font-bold mb-4 leading-snug pr-16">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mt-6 mb-6">
                  {p.stack.map((t) => (
                    <span key={t} className={`text-xs px-3 py-1 rounded-full border ${p.color === 'cyan' ? 'bg-cyan-950/50 text-cyan-400 border-cyan-500/20' : 'bg-purple-950/50 text-purple-400 border-purple-500/20'}`}>{t}</span>
                  ))}
                </div>

                <a
                  href="https://github.com/VidhyaES"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${p.color === 'cyan' ? 'text-gray-500 group-hover:text-cyan-400' : 'text-gray-500 group-hover:text-purple-400'}`}
                >
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <a
              href="https://github.com/VidhyaES"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 hover:border-cyan-400 rounded-2xl font-medium transition-all hover:bg-white/5"
            >
              View All Projects on GitHub <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────────────── */}
      <section id="experience" className="py-28 bg-[#0c0c18]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Work History</div>
            <h2 className="display text-5xl font-black">Experience</h2>
          </motion.div>

          <div className="relative pl-8 border-l border-white/10 space-y-16">
            {[
              {
                period: 'Oct 2025 – Jan 2026',
                role: 'AI/ML Engineering Intern',
                company: 'iHub Robotics',
                location: 'Ernakulam, Kerala',
                bullets: [
                  'Developed and optimized ML models for computer vision and NLP applications across internal research prototypes',
                  'Improved model accuracy by <span class="text-emerald-400 font-medium">12%</span> via advanced preprocessing and feature engineering',
                  'Reduced training time by <span class="text-emerald-400 font-medium">18%</span> by restructuring data pipelines and optimizing batch processing',
                  'Delivered <span class="text-emerald-400 font-medium">2 AI prototypes</span> ready for deployment testing in collaboration with cross-functional teams',
                ],
              },
              {
                period: 'Feb 2023 – Mar 2023',
                role: 'AI Intern',
                company: 'Aican Automate (Teachnook)',
                location: 'Remote',
                bullets: [
                  'Built supervised learning models achieving <span class="text-emerald-400 font-medium">85%+</span> accuracy on structured datasets',
                  'Implemented regression and classification workflows using Scikit-learn',
                  'Strengthened ML fundamentals: bias-variance tradeoff, model validation, and evaluation metrics',
                ],
              },
            ].map((exp, i) => (
              <motion.div key={i} {...stagger(i)} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[2.35rem] top-1.5 w-4 h-4 rounded-full border-2 border-cyan-400 bg-[#0c0c18]" />

                <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">{exp.period}</div>
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <div className="text-cyan-400 mb-5">{exp.company} · {exp.location}</div>
                <ul className="space-y-3">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-gray-300 text-sm pl-4 border-l border-white/10 py-1" dangerouslySetInnerHTML={{ __html: b }} />
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION & CERTS ──────────────────────────────────────────────────── */}
      <section id="education" className="py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Background</div>
            <h2 className="display text-5xl font-black">Education & Certifications</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              { years: '2025 – 2026', degree: 'PG Diploma in AI & Machine Learning', school: 'I Hub School of Learning, Ernakulam' },
              { years: '2021 – 2025', degree: 'B.Tech in Computer Science', school: 'Thejus Engineering College, Thrissur, Kerala' },
            ].map((ed, i) => (
              <motion.div key={i} {...stagger(i)} className="card-hover bg-white/3 border border-white/10 hover:border-cyan-500/30 rounded-3xl p-8">
                <div className="text-cyan-400 text-sm mb-3">{ed.years}</div>
                <div className="text-xl font-bold mb-2">{ed.degree}</div>
                <div className="text-gray-400 text-sm">{ed.school}</div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-cyan-400 text-3xl">★</span> Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Advanced Software Engineering Job Simulation', issuer: 'Walmart, USA', desc: 'Simulated real-world software engineering challenges at Walmart scale' },
                { title: 'Frontend Software Engineering Job Simulation', issuer: 'Skyscanner', desc: 'Hands-on frontend engineering with Skyscanner\'s engineering team' },
              ].map((cert, i) => (
                <motion.div key={i} {...stagger(i)} className="card-hover bg-white/3 border border-white/10 hover:border-purple-500/30 rounded-3xl p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-semibold text-lg leading-snug">{cert.title}</div>
                      <div className="text-purple-400 text-sm mt-1">{cert.issuer}</div>
                    </div>
                    <span className="shrink-0 text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">Completed</span>
                  </div>
                  <p className="text-sm text-gray-400">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-[#0c0c18] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeUp}>
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Get in Touch</div>
            <h2 className="display text-5xl lg:text-6xl font-black mb-4 leading-tight">
              Ready to build<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">intelligent systems</span><br />
              together?
            </h2>
            <p className="text-gray-400 text-lg mb-12">Open to full-time roles in Computer Vision, AI/ML Engineering & Healthcare AI.</p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:vidhyavidhu088@gmail.com"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-cyan-400 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" /> Email Me
            </a>
            <a
              href="https://linkedin.com/in/vidhya-es-9946ufg"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:border-cyan-400 rounded-2xl font-semibold transition-all hover:bg-white/5"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a
              href="https://github.com/VidhyaES"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:border-cyan-400 rounded-2xl font-semibold transition-all hover:bg-white/5"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
          </motion.div>

          <motion.p {...fadeUp} transition={{ delay: 0.3 }} className="text-gray-600 text-sm mt-10">
            vidhyavidhu088@gmail.com · Ernakulam, Kerala
          </motion.p>
        </div>
      </section>
    </main>
  );
}
