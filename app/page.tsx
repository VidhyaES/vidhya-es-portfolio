'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Portfolio() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="min-h-screen pt-20 flex items-center relative bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_0.8px,transparent_1px)] [background-size:30px_30px] opacity-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-full text-sm">
              <span className="text-cyan-400">✦</span> Open to Computer Vision Roles
            </div>

            <h1 className="text-7xl lg:text-8xl font-bold tracking-tighter">Vidhya ES</h1>
            <p className="text-4xl bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Aspiring AI/ML Engineer
            </p>

            <p className="text-xl text-gray-400 max-w-lg">
              Building vision systems that turn pixels into intelligence — object detection, segmentation, and real-time analytics.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* View Projects - FIXED & WORKING */}
              <motion.button
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-cyan-400 transition-all group"
                whileHover={{ scale: 1.05 }}
              >
                View Projects <ArrowRight className="group-hover:translate-x-1 transition" />
              </motion.button>

              {/* Download CV - FIXED & AUTO DOWNLOADS FROM public/resume.pdf */}
              <motion.a
                href="/resume.pdf"
                download="Vidhya_ES_Resume.pdf"
                className="flex items-center gap-3 px-8 py-4 border border-white/30 hover:border-cyan-400 rounded-2xl transition-all group"
                whileHover={{ scale: 1.05 }}
              >
                Download CV <Download className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* PROFILE PHOTO - YOUR JPEG GOES HERE */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="relative flex justify-center">
            <div className="absolute -inset-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-[4rem] blur-3xl" />
            <img
              src="/profile.jpg"
              alt="Vidhya ES - AI/ML Engineer"
              className="w-full max-w-md rounded-3xl shadow-2xl border border-white/10 relative z-10 object-cover"
            />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-gray-500">
          Scroll to explore ↓
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-8">About Me</h2>
          <div className="prose prose-invert text-lg text-gray-300">
            <p>
              AI/ML engineer with practical expertise in natural language processing and computer vision. 
              Proficient in YOLOv8, Hugging Face Transformers, TensorFlow, PyTorch, and end-to-end model deployment. 
              I specialize in crafting practical AI solutions such as object segmentation for robotics and biomedical NLP systems for healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 bg-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-12 text-center">Technical Arsenal</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { cat: "Programming", items: ["Python", "Java", "SQL"] },
              { cat: "Machine Learning", items: ["Scikit-learn", "Random Forest", "SVM", "Feature Engineering"] },
              { cat: "Deep Learning", items: ["PyTorch", "TensorFlow", "YOLOv8", "CNNs", "Transfer Learning"] },
              { cat: "Computer Vision", items: ["OpenCV", "Segment Anything Model (SAM)", "COCO", "Roboflow", "OCR"] },
              { cat: "NLP", items: ["BERT", "BioClinicalBERT", "spaCy", "Hugging Face Transformers"] },
              { cat: "Deployment & Tools", items: ["Django", "Flask", "Docker", "Firebase", "Git", "Jupyter", "Streamlit"] },
            ].map((group, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }} className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-cyan-400 font-semibold mb-6">{group.cat}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <span key={skill} className="px-5 py-2 bg-white/10 rounded-2xl text-sm border border-white/20 hover:border-cyan-400 transition">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS - ALL YOUR NEW PROJECTS ADDED */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-center text-gray-400 mb-16">Production-ready AI/ML & Computer Vision work</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Object Segmentation */}
            <motion.div {...fadeIn} className="group bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all">
              <div className="text-xs uppercase tracking-widest text-cyan-400 mb-3">Computer Vision • Robotics</div>
              <h3 className="text-2xl font-semibold mb-4">Object Segmentation for Semi-Humanoid Robots</h3>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>• Developed real-time instance segmentation pipeline for robotic grasping using YOLOv8 + SAM</li>
                <li>• Leveraged Roboflow Smart Polygon for precise annotations during iHub Robotics internship</li>
                <li>• Trained YOLOv8 segmentation models for improved object manipulation in dynamic environments</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-8">
                {["YOLOv8", "SAM", "Roboflow", "PyTorch"].map(t => <span key={t} className="text-xs px-4 py-1 bg-cyan-950 text-cyan-400 rounded-full">{t}</span>)}
              </div>
              <a href="https://github.com/VidhyaES" target="_blank" className="inline-flex items-center gap-2 text-sm group-hover:text-cyan-400">
                View on GitHub <Github className="w-4 h-4" />
              </a>
            </motion.div>

            {/* 2. Medical Prescription Digitization */}
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="group bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 hover:border-purple-400/50 transition-all">
              <div className="text-xs uppercase tracking-widest text-purple-400 mb-3">OCR • NLP • Healthcare (Ongoing)</div>
              <h3 className="text-2xl font-semibold mb-4">Medical Prescription Digitization System</h3>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>• End-to-end OCR + NLP system to extract and digitize printed/handwritten prescriptions</li>
                <li>• 90% accuracy on printed text using TrOCR + OpenCV preprocessing</li>
                <li>• BioClinicalBERT + spaCy for drug entity extraction; deployed via Streamlit</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-8">
                {["OpenCV", "TrOCR", "BioClinicalBERT", "Streamlit"].map(t => <span key={t} className="text-xs px-4 py-1 bg-purple-950 text-purple-400 rounded-full">{t}</span>)}
              </div>
              <a href="https://github.com/VidhyaES" target="_blank" className="inline-flex items-center gap-2 text-sm group-hover:text-cyan-400">
                View on GitHub <Github className="w-4 h-4" />
              </a>
            </motion.div>

            {/* 3. Drug Interaction Detector */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="group bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all">
              <div className="text-xs uppercase tracking-widest text-cyan-400 mb-3">NLP • Healthcare (Ongoing)</div>
              <h3 className="text-2xl font-semibold mb-4">Drug Interaction Detector</h3>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>• Real-time drug-drug interaction checker using BioClinicalBERT & vector search</li>
                <li>• spaCy NER + knowledge base queries for safety alerts</li>
                <li>• Streamlit web app with clinical-grade output</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-8">
                {["BioClinicalBERT", "spaCy", "Hugging Face", "Streamlit"].map(t => <span key={t} className="text-xs px-4 py-1 bg-cyan-950 text-cyan-400 rounded-full">{t}</span>)}
              </div>
              <a href="https://github.com/VidhyaES" target="_blank" className="inline-flex items-center gap-2 text-sm group-hover:text-cyan-400">
                View on GitHub <Github className="w-4 h-4" />
              </a>
            </motion.div>

            {/* 4. SCANOVA */}
            <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="group bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 hover:border-purple-400/50 transition-all">
              <div className="text-xs uppercase tracking-widest text-purple-400 mb-3">Computer Vision • Retail</div>
              <h3 className="text-2xl font-semibold mb-4">SCANOVA: Smart Supermarket Self-Checkout</h3>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>• Real-time fruit/vegetable detection via webcam using TensorFlow</li>
                <li>• Full-stack React + Flask backend with 36+ product classes</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-8">
                {["TensorFlow", "React", "Flask", "OpenCV"].map(t => <span key={t} className="text-xs px-4 py-1 bg-purple-950 text-purple-400 rounded-full">{t}</span>)}
              </div>
              <a href="https://github.com/VidhyaES" target="_blank" className="inline-flex items-center gap-2 text-sm group-hover:text-cyan-400">
                View on GitHub <Github className="w-4 h-4" />
              </a>
            </motion.div>

            {/* 5. Study Buddy */}
            <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="group bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all">
              <div className="text-xs uppercase tracking-widest text-cyan-400 mb-3">LLM • Education</div>
              <h3 className="text-2xl font-semibold mb-4">Study Buddy: AI-Powered Learning Assistant</h3>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>• Streamlit app using Google Gemini API for MCQs, flashcards & explanations</li>
                <li>• JSON-based history & custom CSS for professional UI</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Google Gemini", "Streamlit", "Python", "JSON"].map(t => <span key={t} className="text-xs px-4 py-1 bg-cyan-950 text-cyan-400 rounded-full">{t}</span>)}
              </div>
              <a href="https://github.com/VidhyaES" target="_blank" className="inline-flex items-center gap-2 text-sm group-hover:text-cyan-400">
                View on GitHub <Github className="w-4 h-4" />
              </a>
            </motion.div>

            {/* 6. PLACIFY */}
            <motion.div {...fadeIn} transition={{ delay: 0.5 }} className="group bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 hover:border-purple-400/50 transition-all">
              <div className="text-xs uppercase tracking-widest text-purple-400 mb-3">Machine Learning • Placement</div>
              <h3 className="text-2xl font-semibold mb-4">PLACIFY: AI-Driven Campus Recruitment</h3>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li>• SVM-based job matching engine with 89% accuracy</li>
                <li>• Increased placement efficiency by 35%</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-8">
                {["SVM", "Python", "SQL", "Scikit-learn"].map(t => <span key={t} className="text-xs px-4 py-1 bg-purple-950 text-purple-400 rounded-full">{t}</span>)}
              </div>
              <a href="https://github.com/VidhyaES" target="_blank" className="inline-flex items-center gap-2 text-sm group-hover:text-cyan-400">
                View on GitHub <Github className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* View All Projects */}
          <div className="text-center mt-16">
            <a
              href="https://github.com/VidhyaES"
              target="_blank"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 hover:border-cyan-400 rounded-2xl text-lg font-medium"
            >
              View All 8 Projects on GitHub <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE, EDUCATION, CONTACT - unchanged but included for completeness */}
      <section id="experience" className="py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16">Experience</h2>
          <div className="space-y-16">
            <div className="flex gap-8">
              <div className="w-28 text-right text-sm text-gray-500 shrink-0">Oct 2025 – Jan 2026</div>
              <div>
                <div className="font-semibold">AI/ML Intern @ i Hub Robotics, Ernakulam</div>
                <ul className="mt-4 space-y-2 text-sm text-gray-300 list-disc pl-5">
                  <li>Designed YOLOv8 + SAM segmentation pipelines for semi-humanoid robots</li>
                  <li>Built healthcare AI prototypes: OCR prescription digitization & biomedical NLP</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="py-24 bg-black/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-12">Education & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-8 rounded-3xl">
              <div className="text-cyan-400 text-sm">2025 – 2026</div>
              <div className="text-2xl font-semibold mt-2">PG Diploma in AI & ML</div>
              <div className="text-gray-400">I Hub School of Learning, Ernakulam</div>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl">
              <div className="text-cyan-400 text-sm">2021 – 2025</div>
              <div className="text-2xl font-semibold mt-2">B.Tech Computer Science</div>
              <div className="text-gray-400">Thejus Engineering College, Thrissur</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to build intelligent systems together?</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
            <a href="mailto:vidhyavidhu088@gmail.com" className="flex items-center gap-3 px-8 py-4 border border-white/30 rounded-2xl hover:border-cyan-400">
              <Mail className="w-5 h-5" /> vidhyavidhu088@gmail.com
            </a>
            <a href="https://linkedin.com/in/vidhya-es-9946ufg" target="_blank" className="flex items-center gap-3 px-8 py-4 border border-white/30 rounded-2xl hover:border-cyan-400">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="https://github.com/VidhyaES" target="_blank" className="flex items-center gap-3 px-8 py-4 border border-white/30 rounded-2xl hover:border-cyan-400">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}