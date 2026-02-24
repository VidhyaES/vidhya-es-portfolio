import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vidhya ES | Aspiring AI/ML Engineer | Computer Vision',
  description: 'Building vision systems that turn pixels into intelligence — YOLOv8, SAM, BioClinicalBERT for robotics & healthcare.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0a0a0a] text-white font-sans">
        {/* Fixed Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                VE
              </span>
              <span className="text-sm text-gray-400">Vidhya ES</span>
            </div>

            <div className="hidden md:flex gap-10 text-sm font-medium">
              <a href="#about" className="hover:text-cyan-400 transition">About</a>
              <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
              <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
              <a href="#experience" className="hover:text-cyan-400 transition">Experience</a>
              <a href="#education" className="hover:text-cyan-400 transition">Education</a>
            </div>

            <a
              href="#contact"
              className="px-6 py-2.5 bg-white text-black rounded-2xl font-semibold hover:bg-cyan-400 transition-all flex items-center gap-2 text-sm"
            >
              Get in Touch
            </a>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}