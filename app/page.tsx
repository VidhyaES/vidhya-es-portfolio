'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, Download, Github, Linkedin, Mail, ExternalLink,
  ChevronDown, Zap, Brain, Eye, Code2, BookOpen, ArrowUpRight,
  Globe, Shield, ShoppingCart, GraduationCap, Cpu, Heart,
  MapPin, Microscope, LineChart, Leaf
} from 'lucide-react';

// ── Motion presets ────────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};
const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' as const },
});

// ── Typewriter ─────────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, speed, pause]);
  return text;
}

// ── Stat counter ──────────────────────────────────────────────────────────────
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
      <div className="text-5xl font-black text-white tabular-nums">{count}<span className="text-cyan-400">{suffix}</span></div>
      <div className="text-sm text-gray-400 mt-1 max-w-[120px] mx-auto">{label}</div>
    </div>
  );
}

function downloadCV() {
  const link = document.createElement('a');
  link.href = '/resume.pdf';
  link.download = 'Vidhya_ES_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Medium icon (not in lucide) ───────────────────────────────────────────────
const MediumIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [activeFilter, setActiveFilter] = useState('All');

  const typed = useTypewriter(['Computer Vision', 'FMCG Demand Forecasting', 'NLP & Healthcare AI', 'Robotics Vision']);

  const skills = [
    { cat: 'Programming', icon: <Code2 className="w-5 h-5" />, color: 'cyan', items: ['Python', 'SQL', 'Java', 'C'] },
    { cat: 'Machine Learning', icon: <Brain className="w-5 h-5" />, color: 'purple', items: ['Scikit-learn', 'LightGBM', 'Random Forest', 'SVM', 'Feature Engineering', 'Classification'] },
    { cat: 'Deep Learning', icon: <Zap className="w-5 h-5" />, color: 'cyan', items: ['PyTorch', 'TensorFlow', 'YOLOv8', 'CNNs', 'Transfer Learning', 'EfficientNet'] },
    { cat: 'Computer Vision', icon: <Eye className="w-5 h-5" />, color: 'purple', items: ['OpenCV', 'SAM', 'COCO', 'Roboflow', 'OCR', 'TrOCR', 'Grad-CAM'] },
    { cat: 'NLP & LLMs', icon: <Brain className="w-5 h-5" />, color: 'cyan', items: ['BERT', 'BioClinicalBERT', 'spaCy', 'Hugging Face', 'Groq (Llama 4 Scout)', 'Gemini API'] },
    { cat: 'Forecasting & Data', icon: <LineChart className="w-5 h-5" />, color: 'purple', items: ['Pandas', 'NumPy', 'Time-Series Forecasting', 'Lag/Rolling/EWM Features', 'WMAPE/sMAPE/RMSE', 'ETL'] },
    { cat: 'Deployment', icon: <Code2 className="w-5 h-5" />, color: 'cyan', items: ['FastAPI', 'Flask', 'Django', 'PostgreSQL', 'Docker', 'JWT Auth', 'Render'] },
  ];

  const projects = [
    {
      tag: 'ML • FMCG Forecasting',
      filter: 'ML',
      color: 'purple',
      icon: <LineChart className="w-5 h-5" />,
      title: 'FMCG Demand Forecasting — TCPL/CDE',
      desc: 'Multi-agent forecasting pipeline at AudvikLabs combining Baseline, Scheme Uplift, and External agents for hierarchical, multi-horizon SKU/depot/channel-level demand forecasts across AGNI, PULSES, and CAPTAIN product lines, built in Python with LightGBM models on lag/rolling/EWM features.',
      stack: ['Python', 'Pandas', 'NumPy', 'LightGBM', 'Time-Series Forecasting'],
      metric: 'Multi-agent',
      github: '',
      live: '',
      featured: true,
    },
    {
      tag: 'Computer Vision • Industrial',
      filter: 'Computer Vision',
      color: 'cyan',
      icon: <Leaf className="w-5 h-5" />,
      title: 'Tea Leaf Quality / Classification',
      desc: 'Computer vision pipeline at AudvikLabs for  Tea leaf quality classification: a two-stage detect-then-classify architecture using object detection and image classification/segmentation to automate visual grading, with image processing for preprocessing and accuracy gains.',
      stack: ['Python', 'OpenCV', 'Deep Learning', 'Object Detection', 'Image Segmentation'],
      metric: 'Industrial CV',
      github: '',
      live: '',
      featured: true,
    },
    {
      tag: 'Computer Vision • Industrial',
      filter: 'Computer Vision',
      color: 'purple',
      icon: <Microscope className="w-5 h-5" />,
      title: 'Glass Particle Detection & Quality Inspection',
      desc: 'Industrial computer vision system at AudvikLabs for automated detection of glass-particle contaminants, using deep learning-based object and defect detection plus image enhancement techniques for automated visual inspection in production conditions.',
      stack: ['Python', 'OpenCV', 'Deep Learning', 'Defect Detection', 'Image Enhancement'],
      metric: 'Industrial CV',
      github: '',
      live: '',
      featured: true,
    },
    {
      tag: 'Computer Vision • Restaurant Ops',
      filter: 'Computer Vision',
      color: 'cyan',
      icon: <Cpu className="w-5 h-5" />,
      title: 'Restaurant Intelligence Suite',
      desc: 'Live computer-vision modules for a multi-branch restaurant management platform at Kalgus Labs: YOLOv8m kitchen hygiene/PPE violation detection over RTSP streams, table occupancy tracking, crowd-density estimation, and directional people counting.',
      stack: ['YOLOv8m', 'OpenCV', 'FastAPI', 'RTSP'],
      metric: 'Live deployment',
      github: '',
      live: '',
      featured: true,
    },
    {
      tag: 'Computer Vision • Retail',
      filter: 'Computer Vision',
      color: 'cyan',
      icon: <ShoppingCart className="w-5 h-5" />,
      title: 'RetailSense – AI Retail Analytics',
      desc: 'Retail intelligence platform combining CV-based footfall, heatmap, and shelf-monitoring analytics with a 4-stage ETL pipeline across 6 PostgreSQL tables and interactive dashboards for inventory and revenue optimization — cut query time from 4.2s to 0.8s.',
      stack: ['YOLOv8', 'OpenCV', 'PostgreSQL', 'Flask', 'React'],
      metric: '4.2s → 0.8s query',
      github: 'https://github.com/VidhyaES',
      live: '',
      featured: true,
    },
    {
      tag: 'Computer Vision • Robotics',
      filter: 'Computer Vision',
      color: 'cyan',
      icon: <Cpu className="w-5 h-5" />,
      title: 'Object Segmentation for Semi-Humanoid Robots',
      desc: 'Real-time instance segmentation pipeline for robotic grasping using YOLOv8 + SAM. Achieved 15% higher accuracy and 20% lower inference latency on 3,000+ annotated images.',
      stack: ['YOLOv8', 'SAM', 'Roboflow', 'PyTorch'],
      metric: '15% ↑ accuracy',
      github: 'https://github.com/VidhyaES/robot-object-segmentation-yolo-sam',
      live: '',
      featured: false,
    },
    {
      tag: 'LLM • Document Security',
      filter: 'LLM',
      color: 'purple',
      icon: <Shield className="w-5 h-5" />,
      title: 'DocuGuard AI – ID Forgery Detection',
      desc: 'FastAPI + Groq (Llama 4 Scout 17B) forensic document verification system for KYC fraud detection, evaluating 8 structural integrity dimensions and outputting a risk score 0–100 — cutting manual review time from ~8 minutes to under 30 seconds. Live on Render.',
      stack: ['FastAPI', 'Groq Vision', 'LLaMA 4 Scout', 'Python', 'Render'],
      metric: '8min → 30sec review',
      github: 'https://github.com/VidhyaES/DocuGuardAI',
      live: 'https://docuguardai.onrender.com',
      featured: true,
    },
    {
      tag: 'NLP • Healthcare',
      filter: 'Healthcare AI',
      color: 'cyan',
      icon: <Heart className="w-5 h-5" />,
      title: 'MedTriage AI – Healthcare Triage System',
      desc: 'Full-stack healthcare triage engine: spaCy NLP symptom extraction → RandomForestClassifier (300 trees, 15 disease classes, ~92% CV accuracy) → risk-stratified output (low/moderate/high/urgent).',
      stack: ['spaCy', 'scikit-learn', 'Flask', 'React', 'Vite'],
      metric: '92% CV accuracy',
      github: 'https://github.com/VidhyaES/medtriage-ai',
      live: '',
      featured: false,
    },
    {
      tag: 'OCR • NLP • Healthcare',
      filter: 'Healthcare AI',
      color: 'cyan',
      icon: <Microscope className="w-5 h-5" />,
      title: 'PrescriptionGuard AI',
      desc: 'OCR-based medicine extraction and drug interaction checker. Flask backend, Docker containerized, deployed on Render. Generates structured medication safety reports.',
      stack: ['Flask', 'Docker', 'Render', 'Python', 'OCR'],
      metric: 'Deployed',
      github: 'https://github.com/VidhyaES/PrescriptionGuard-AI',
      live: '',
      featured: false,
    },
    {
      tag: 'Computer Vision • Medical',
      filter: 'Healthcare AI',
      color: 'purple',
      icon: <Eye className="w-5 h-5" />,
      title: 'Diabetic Retinopathy Detection',
      desc: 'EfficientNet-B0 + ResNet50 ensemble for retinal disease detection, benchmarked on APTOS 2019. AUC-ROC 0.91, sensitivity 0.88, specificity 0.89, with Grad-CAM explainability for clinical transparency.',
      stack: ['EfficientNet-B0', 'ResNet50', 'Grad-CAM', 'PyTorch'],
      metric: 'AUC-ROC 0.91',
      github: 'https://github.com/VidhyaES/diabetic-retinopathy-5class-ensemble',
      live: '',
      featured: false,
    },
    {
      tag: 'NLP • Healthcare Safety',
      filter: 'Healthcare AI',
      color: 'cyan',
      icon: <Brain className="w-5 h-5" />,
      title: 'Drug Interaction Detector',
      desc: 'Real-time drug-drug interaction checker using BioClinicalBERT & vector search. spaCy NER with knowledge-base queries for clinical safety alerts. 88% accuracy.',
      stack: ['BioClinicalBERT', 'spaCy', 'Hugging Face', 'Streamlit'],
      metric: '88% accuracy',
      github: 'https://github.com/VidhyaES/drug-interaction-detector-nlp',
      live: '',
      featured: false,
    },
    {
      tag: 'Computer Vision • Retail',
      filter: 'Computer Vision',
      color: 'purple',
      icon: <ShoppingCart className="w-5 h-5" />,
      title: 'SCANOVA: Smart Self-Checkout',
      desc: 'Real-time fruit/vegetable detection via webcam using TensorFlow. Full-stack React + Flask supporting 36+ product classes with automated billing.',
      stack: ['TensorFlow', 'React', 'Flask', 'OpenCV'],
      metric: '36+ classes',
      github: 'https://github.com/VidhyaES/SCANOVA-ai-self-checkout',
      live: '',
      featured: false,
    },
    {
      tag: 'ML • Predictive Analytics',
      filter: 'ML',
      color: 'purple',
      icon: <Zap className="w-5 h-5" />,
      title: 'NAPALYZE – Sleep Quality Prediction',
      desc: 'Machine learning pipeline predicting sleep quality using behavioral and health features via Random Forest with feature importance visualization.',
      stack: ['Random Forest', 'scikit-learn', 'Python', 'Pandas'],
      metric: 'Predictive ML',
      github: 'https://github.com/VidhyaES/NapAlyze-ML-Project-for-testing-sleep-quality',
      live: '',
      featured: false,
    },
    {
      tag: 'ML • Placement',
      filter: 'ML',
      color: 'purple',
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'PLACIFY: AI Campus Recruitment',
      desc: 'SVM-based job matching engine achieving 89% accuracy. Increased placement efficiency by 35% through intelligent candidate-role matching.',
      stack: ['SVM', 'Python', 'SQL', 'scikit-learn'],
      metric: '89% accuracy',
      github: 'https://github.com/VidhyaES/PLACIFY-Campus-Recruitment-Application',
      live: '',
      featured: false,
    },
    {
      tag: 'LLM • Education',
      filter: 'LLM',
      color: 'cyan',
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Study Buddy: AI Learning Assistant',
      desc: 'Streamlit app powered by Google Gemini API generating MCQs, flashcards & explanations from study material with JSON session history.',
      stack: ['Google Gemini', 'Streamlit', 'Python', 'JSON'],
      metric: 'LLM powered',
      github: 'https://github.com/VidhyaES/study-buddy-ai-learning-assistant',
      live: '',
      featured: false,
    },
    {
      tag: 'LLM • Medical Records',
      filter: 'LLM',
      color: 'purple',
      icon: <Heart className="w-5 h-5" />,
      title: 'Medical Prescription Digitization',
      desc: 'LLM-powered pipeline converting unstructured prescription text into structured JSON medical records via prompt engineering and TrOCR.',
      stack: ['TrOCR', 'OpenCV', 'BioClinicalBERT', 'Streamlit'],
      metric: '90% accuracy',
      github: 'https://github.com/VidhyaES/prescription-digitization-ocr-nlp',
      live: '',
      featured: false,
    },
    {
      tag: 'LLM • Travel',
      filter: 'LLM',
      color: 'cyan',
      icon: <MapPin className="w-5 h-5" />,
      title: 'TREKTALE: AI Travel Companion',
      desc: 'AI-powered travel planning assistant recommending personalized itineraries, routes, and hidden local gems via LLM reasoning and API integration.',
      stack: ['LLM', 'Flutter', 'REST APIs', 'Python'],
      metric: 'AI Planner',
      github: 'https://github.com/VidhyaES/trektale-travel-companion-flutter',
      live: '',
      featured: false,
    },
  ];

  const blogs = [
    {
      title: 'From "You Only Look Once" to YOLO26: The Complete Story of the World\'s Fastest Object Detector',
      subtitle: 'A beginner-friendly guide to how YOLO evolved from a bold 2015 idea into the most powerful real-time vision model of 2025.',
      date: 'Mar 2026',
      tag: 'Computer Vision',
      color: 'cyan',
      url: 'https://medium.com/@VidhyaES/from-you-only-look-once-to-yolo26-the-complete-story-of-the-worlds-fastest-object-detector-b23529401ffe',
    },
    {
      title: 'Python 3.14 Is Here: What\'s New, Why It Matters, and Should You Upgrade?',
      subtitle: 'Deep dive into the October 2025 Python release — new language features, performance gains, and whether you should make the jump.',
      date: 'Oct 2025',
      tag: 'Python',
      color: 'purple',
      url: 'https://medium.com/@VidhyaES/python-3-14-is-here-whats-new-why-it-matters-and-should-you-upgrade-ae209ddad5fe',
    },
    {
      title: 'Exploring the Orbbec Femto Bolt: A Deep Dive into 3D Vision Technology for Object Detection',
      subtitle: 'First-hand experience using the Orbbec Femto Bolt depth camera for a real-world 3D object detection project.',
      date: 'Feb 2026',
      tag: 'Robotics',
      color: 'cyan',
      url: 'https://medium.com/@VidhyaES/exploring-the-orbbec-femto-bolt-a-deep-dive-into-3d-vision-technology-for-object-detection-0c9a27efe6e9',
    },
    {
      title: 'When AI Meets Muscle: The Promise of Intelligent Exoskeletons',
      subtitle: 'From sci-fi to reality — how AI-driven exoskeletons are helping workers lift smarter and patients walk again.',
      date: 'Sep 2025',
      tag: 'Robotics AI',
      color: 'purple',
      url: 'https://medium.com/@VidhyaES/when-ai-meets-muscle-the-promise-of-intelligent-exoskeletons-3b5a29779973',
    },
    {
      title: 'Solving the BSOD Crisis in the Age of AI: How Smarter Endpoint Protection Could Have Saved 2024',
      subtitle: 'Exploring how AI-powered endpoint protection could have prevented the catastrophic 2024 CrowdStrike outage.',
      date: 'Aug 2025',
      tag: 'AI Security',
      color: 'purple',
      url: 'https://medium.com/@VidhyaES/-solving-the-bsod-crisis-in-the-age-of-ai-how-smarter-endpoint-protection-could-have-saved-2024-0a3716a62c08',
    },
  ];

  const filters = ['All', 'Computer Vision', 'Healthcare AI', 'LLM', 'ML'];
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.filter === activeFilter);

  const colorMap: Record<string, { border: string; hoverBorder: string; tag: string; badge: string; link: string; glow: string }> = {
    cyan:   { border: 'border-cyan-500/10',   hoverBorder: 'hover:border-cyan-500/40',   tag: 'text-cyan-400',   badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',   link: 'group-hover:text-cyan-400',   glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]' },
    purple: { border: 'border-purple-500/10', hoverBorder: 'hover:border-purple-500/40', tag: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20', link: 'group-hover:text-purple-400', glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]' },
  };

  return (
    <main className="overflow-hidden bg-[#080810] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@700;800&display=swap');
        .display { font-family: 'Space Grotesk', sans-serif; }
        .cursor::after { content: '|'; animation: blink 1s step-end infinite; color: #22d3ee; }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        .card-hover { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080810; } ::-webkit-scrollbar-thumb { background: #22d3ee40; border-radius: 2px; }
        .blog-card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .blog-card-hover:hover { transform: translateY(-3px); }
        .filter-btn { transition: all 0.2s ease; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="min-h-screen flex items-center relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          {/* LEFT */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="space-y-8 z-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-sm text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              AI/ML Engineer @ AudvikLabs · Open to new opportunities
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="display text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Vidhya{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ES</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-2xl text-gray-300 font-medium h-8">
              <span className="cursor">{typed}</span>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Building vision systems and forecasting agents that turn pixels and data into decisions — from object detection and industrial quality inspection to FMCG demand forecasting.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('projects')}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-100">
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={downloadCV}
                className="group flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-cyan-400 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 active:scale-100 hover:bg-white/5">
                Download CV
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center gap-4 pt-2">
              <a href="mailto:vidhyavidhu088@gmail.com" className="p-3 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all" aria-label="Email">
                <Mail className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/vidhya-es/" target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
              <a href="https://github.com/VidhyaES" target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all" aria-label="GitHub">
                <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
              <a href="https://medium.com/@VidhyaES" target="_blank" rel="noreferrer" className="p-3 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all" aria-label="Medium">
                <MediumIcon />
              </a>
              <span className="text-gray-600 text-sm ml-2">vidhyavidhu088@gmail.com</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Profile photo */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end z-10">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[420px] h-[420px] rounded-full border border-cyan-500/10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-[360px] h-[360px] rounded-full border border-purple-500/10 animate-[spin_15s_linear_infinite_reverse]" />
            </div>
            <div className="relative mx-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl" />
              <div className="relative w-72 h-80 rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
                <img src="/profile.jpg" alt="Vidhya ES" className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/10 display">VE</div>
              </div>
              {/* Floating chips */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                className="absolute -left-12 top-8 bg-[#0f0f1a] border border-cyan-500/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
                <div className="text-2xl font-black text-cyan-400">87%</div>
                <div className="text-xs text-gray-400">mAP Score</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}
                className="absolute -right-12 bottom-12 bg-[#0f0f1a] border border-purple-500/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
                <div className="text-2xl font-black text-purple-400">17+</div>
                <div className="text-xs text-gray-400">AI Projects</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs">
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          <StatCard value={17} label="AI Projects Built" suffix="+" />
          <StatCard value={87} label="mAP (Robotics Pipeline)" />
          <StatCard value={5} label="Deployed Applications" suffix="+" />
          <StatCard value={20} label="Inference Latency Reduction" />
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
                AI/ML Engineer passionate about production-grade Computer Vision, FMCG demand forecasting, and Healthcare NLP systems that solve real-world problems.
              </motion.p>
              <motion.p {...stagger(1)}>
                As an <span className="text-cyan-400 font-medium">AI/ML Engineer at AudvikLabs</span>, I build interconnected Baseline, Scheme Uplift, and External forecasting agents for SKU/depot/channel-level FMCG demand planning, alongside industrial computer-vision systems for <span className="text-cyan-400">Tata Tea leaf grading</span> and glass-particle detection.
              </motion.p>
              <motion.p {...stagger(2)}>
                Earlier, at <span className="text-cyan-400 font-medium">Kalgus Labs</span> I shipped live restaurant computer-vision modules, and at <span className="text-cyan-400 font-medium">iHub Robotics</span> I designed real-time object segmentation pipelines using <span className="text-cyan-400">YOLOv8 + SAM</span>, achieving <span className="text-emerald-400 font-semibold">15% higher segmentation accuracy</span> and <span className="text-emerald-400 font-semibold">20% lower inference latency</span> on 3,000+ annotated images.
              </motion.p>
              <motion.p {...stagger(3)}>
                I excel at the full ML lifecycle — from dataset annotation and feature engineering to model optimization and deployment. Key wins: a <span className="text-emerald-400 font-semibold">92% accurate</span> medical triage engine and an <span className="text-emerald-400 font-semibold">AUC-ROC 0.91</span> diabetic retinopathy detector.
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
              <motion.div key={i} {...stagger(i)}
                className={`card-hover bg-white/3 border rounded-3xl p-7 ${group.color === 'cyan' ? 'border-cyan-500/10 hover:border-cyan-500/40' : 'border-purple-500/10 hover:border-purple-500/40'}`}>
                <div className={`flex items-center gap-3 mb-5 ${group.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
                  {group.icon}
                  <h3 className="font-semibold text-sm uppercase tracking-wider">{group.cat}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <span key={skill}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${group.color === 'cyan' ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300 hover:border-cyan-500/50' : 'bg-purple-500/5 border-purple-500/20 text-purple-300 hover:border-purple-500/50'}`}>
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
          <motion.div {...fadeUp} className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Featured Work</div>
            <h2 className="display text-5xl font-black">Projects</h2>
            <p className="text-gray-400 mt-3">17+ production-ready AI/ML, forecasting & Computer Vision systems</p>
          </motion.div>

          {/* Filter bar */}
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`filter-btn px-5 py-2 rounded-full text-sm font-medium border ${activeFilter === f ? 'bg-cyan-400 text-black border-cyan-400' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => {
              const c = colorMap[p.color] || colorMap.cyan;
              return (
                <motion.div key={p.title} {...stagger(i)}
                  className={`card-hover group relative bg-gradient-to-br from-white/[0.03] to-transparent border rounded-3xl p-8 flex flex-col ${c.border} ${c.hoverBorder} ${c.glow}`}>
                  <div className={`absolute top-6 right-6 text-xs px-3 py-1 rounded-full font-semibold border ${c.badge}`}>{p.metric}</div>

                  <div className={`flex items-center gap-2 mb-3 mt-2 ${c.tag}`}>
                    {p.icon}
                    <span className="text-xs uppercase tracking-widest">{p.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 leading-snug pr-4">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-6 mb-6">
                    {p.stack.map(t => (
                      <span key={t} className={`text-xs px-3 py-1 rounded-full border ${c.badge}`}>{t}</span>
                    ))}
                  </div>

                  {(p.github || p.live) && (
                    <div className="flex items-center gap-4">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer"
                          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors text-gray-500 ${c.link}`}>
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer"
                          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors text-gray-500 ${c.link}`}>
                          <Globe className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  )}
                  {!p.github && !p.live && (
                    <div className="text-xs text-gray-600 italic">Proprietary — details on request</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <a href="https://github.com/VidhyaES" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 hover:border-cyan-400 rounded-2xl font-medium transition-all hover:bg-white/5">
              View All Projects on GitHub <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── BLOGS ──────────────────────────────────────────────────────────────── */}
      <section id="blogs" className="py-28 bg-[#0c0c18]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Writing</div>
            <h2 className="display text-5xl font-black">From My Medium</h2>
            <p className="text-gray-400 mt-3">Sharing what I learn about AI, computer vision & robotics</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => {
              const c = colorMap[blog.color] || colorMap.cyan;
              return (
                <motion.a key={i} {...stagger(i)} href={blog.url} target="_blank" rel="noreferrer"
                  className={`blog-card-hover group relative bg-gradient-to-br from-white/[0.03] to-transparent border rounded-3xl p-8 flex flex-col ${c.border} ${c.hoverBorder} ${c.glow} cursor-pointer`}>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${c.badge}`}>{blog.tag}</span>
                    <span className="text-xs text-gray-600">{blog.date}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug mb-3 flex-1">{blog.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{blog.subtitle}</p>
                  <div className={`inline-flex items-center gap-2 text-sm font-medium text-gray-500 ${c.link} transition-colors`}>
                    <MediumIcon /> Read on Medium
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14">
            <a href="https://medium.com/@VidhyaES" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 hover:border-cyan-400 rounded-2xl font-medium transition-all hover:bg-white/5">
              Read All Articles on Medium <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────────────── */}
      <section id="experience" className="py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Work History</div>
            <h2 className="display text-5xl font-black">Experience</h2>
          </motion.div>
          <div className="relative pl-8 border-l border-white/10 space-y-16">
            {[
              {
                period: 'Jul 2026 – Present',
                role: 'AI/ML Engineer',
                company: 'AudvikLabs Private Limited',
                location: 'Bengaluru',
                current: true,
                bullets: [
                  'Built end-to-end FMCG demand forecasting pipelines in Python (Pandas, NumPy) for hierarchical, multi-horizon SKU/depot/channel-level forecasts across <span class="text-emerald-400 font-medium">Baseline, Scheme Uplift, and External</span> agents',
                  'Developed and tuned LightGBM-based machine learning models for time-series forecasting across AGNI, CAPTAIN, and PULSES FMCG product categories',
                  'Engineered lag/rolling/EWM time-series features on hierarchical demand data; analysed WMAPE, sMAPE, MAE, RMSE, and forecast bias',
                  'Developed a computer vision pipeline (Python, OpenCV, deep learning) for tea leaf quality classification, using object detection and image classification/segmentation to automate visual grading',
                  'Built an industrial computer vision system (Python, OpenCV) for automated glass-particle contaminant detection, using deep learning-based object/defect detection and image enhancement for automated visual inspection',
                ],
              },
              {
                period: 'May 2026 – Jun 2026',
                role: 'AI Engineer Intern',
                company: 'Kalgus Labs Private Limited',
                location: 'Ernakulam, Kerala',
                bullets: [
                  'Engineered computer-vision solutions for a live, multi-branch restaurant management platform',
                  'Developed YOLOv8m-based kitchen hygiene/PPE violation detection using RTSP video streams',
                  'Implemented table occupancy detection, crowd-density estimation, and directional people counting',
                ],
              },
              {
                period: 'Oct 2025 – Feb 2026',
                role: 'AI/ML Intern',
                company: 'iHub Robotics',
                location: 'Ernakulam, Kerala',
                bullets: [
                  'Developed YOLOv8 + SAM real-time object segmentation pipeline for semi-humanoid robots, achieving <span class="text-emerald-400 font-medium">~87% mAP</span>',
                  'Improved model accuracy by <span class="text-emerald-400 font-medium">12%</span> via advanced preprocessing and feature engineering',
                  'Reduced training time by <span class="text-emerald-400 font-medium">18%</span> by restructuring data pipelines and optimizing batch processing',
                  'Annotated 3,000+ images on Roboflow; optimized edge deployment for inference latency reduction',
                ],
              },
              {
                period: 'Feb 2023 – Apr 2023',
                role: 'AI Intern',
                company: 'Teachnook (Teachscape Online Learning Services)',
                location: 'Remote',
                bullets: [
                  'Built supervised learning models achieving <span class="text-emerald-400 font-medium">85%+</span> accuracy on structured datasets',
                  'Implemented regression and classification workflows using Scikit-learn',
                  'Strengthened ML fundamentals: bias-variance tradeoff, model validation, and evaluation metrics',
                ],
              },
            ].map((exp, i) => (
              <motion.div key={i} {...stagger(i)} className="relative">
                <div className={`absolute -left-[2.35rem] top-1.5 w-4 h-4 rounded-full border-2 ${exp.current ? 'border-cyan-400 bg-cyan-400/30' : 'border-cyan-400 bg-[#080810]'}`} />
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">{exp.period}{exp.current ? ' · Current' : ''}</div>
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
      <section id="education" className="py-28 bg-[#0c0c18]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Background</div>
            <h2 className="display text-5xl font-black">Education & Certifications</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              { years: '2025 – 2026', degree: 'PG Diploma in AI & Machine Learning', school: 'I Hub School of Learning, Ernakulam' },
              { years: '2021 – 2025', degree: 'B.Tech in Computer Science', school: 'Thejus Engineering College, Thrissur, Kerala' },
              { years: '2021', degree: 'Higher Secondary Education (Class XII)', school: 'GHSS Erumapetty, Thrissur · 96%' },
              { years: '2019', degree: 'Secondary Education (Class X)', school: 'SDVHSS Peramangalam, Thrissur · 95%' },
            ].map((ed, i) => (
              <motion.div key={i} {...stagger(i)} className="card-hover bg-white/3 border border-white/10 hover:border-cyan-500/30 rounded-3xl p-8">
                <div className="text-cyan-400 text-sm mb-3">{ed.years}</div>
                <div className="text-xl font-bold mb-2">{ed.degree}</div>
                <div className="text-gray-400 text-sm">{ed.school}</div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp}>
            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-6">Certifications</div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Microsoft Azure for AI and Machine Learning', issuer: 'Coursera', desc: 'Applied AI/ML workflows and model deployment on Microsoft Azure' },
                { title: 'Advanced Software Engineering Job Simulation', issuer: 'Walmart, USA', desc: 'Simulated real-world software engineering challenges at Walmart scale' },
                { title: 'Frontend Software Engineering Job Simulation', issuer: 'Skyscanner (Forage)', desc: "Hands-on frontend engineering with Skyscanner's engineering team" },
                { title: 'Python for Beginners Certification Program', issuer: 'Certification Program', desc: 'Foundational Python programming certification' },
                { title: 'Google Flutter & Dart Certification Program', issuer: 'Certification Program', desc: 'Cross-platform app development with Flutter & Dart' },
                { title: 'C, C++ and PHP: Comprehensive Programming Bootcamp', issuer: 'Bootcamp', desc: 'Core programming fundamentals across C, C++, and PHP' },
              ].map((cert, i) => (
                <motion.div key={i} {...stagger(i)} className="card-hover bg-white/3 border border-white/10 hover:border-purple-500/30 rounded-3xl p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-semibold text-lg leading-snug">{cert.title}</div>
                      <div className="text-purple-400 text-sm mt-1">{cert.issuer}</div>
                    </div>
                    <span className="shrink-0 text-xs px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">Completed</span>
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
            <p className="text-gray-400 text-lg mb-12">
              Currently building forecasting & vision systems at AudvikLabs — always open to new opportunities in Computer Vision, AI/ML Engineering & Healthcare AI.
            </p>
          </motion.div>

          {/* Primary CTA */}
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex justify-center mb-4">
            <a href="mailto:vidhyavidhu088@gmail.com"
              className="flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-cyan-400 transition-all hover:scale-105 w-full sm:w-auto">
              <Mail className="w-5 h-5" /> Email Me
            </a>
          </motion.div>

          {/* Secondary links — 2-col on mobile, 3-col on sm+ */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: 'https://www.linkedin.com/in/vidhya-es/', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
              { href: 'https://github.com/VidhyaES', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
              { href: 'https://medium.com/@VidhyaES', icon: <MediumIcon />, label: 'Medium' },
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 border border-white/20 hover:border-cyan-400 rounded-2xl font-semibold transition-all hover:bg-white/5 text-sm">
                {item.icon} {item.label}
              </a>
            ))}
          </motion.div>

          <motion.p {...fadeUp} transition={{ delay: 0.3 }} className="text-gray-600 text-sm mt-10">
            vidhyavidhu088@gmail.com · Bengaluru, India
          </motion.p>
        </div>
      </section>
    </main>
  );
}
