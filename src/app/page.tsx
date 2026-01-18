'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button, Footer, Particles } from '@/components/ui';
import { Mail, FileText } from 'lucide-react';
import {
  FaGithub,
  FaGoogleScholar,
  FaLinkedin,
  FaResearchgate,
} from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { FaOrcid } from 'react-icons/fa';

export default function Home() {
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const newColor = theme === 'dark' ? '#fff' : '#000';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColor(newColor);
  }, [theme]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'CV.pdf';
    link.click();
  };

  return (
    <>
      {/* Hero Section */}
      <main className="min-h-screen flex flex-col bg-background">
        <section className="relative container mx-auto px-4 pt-28 flex-1 flex flex-col justify-center overflow-hidden">
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color={color}
            refresh
          />
          <div className="relative z-10 flex flex-col items-center gap-12 max-w-4xl mx-auto">
            <div className="shrink-0">
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <Image
                  src="/nethma.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Nethma Kalpani
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
                Demonstrator
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                A passionate computer science enthusiast with a strong
                commitment to continuous academic growth and research.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="mailto:kalpani4lk@gmail.com" target="_blank">
                  <Button size="lg" className="gap-2 cursor-pointer">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 cursor-pointer"
                  onClick={handleDownload}
                >
                  <FileText className="w-4 h-4" />
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto p-4 flex items-center justify-center gap-4">
          <Link
            href="https://github.com/kalpani1234"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </Link>
          <Link
            href="https://orcid.org/0009-0000-0233-9962"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
            aria-label="ORCID"
          >
            <FaOrcid className="w-5 h-5" />
          </Link>
          <Link
            href="https://researchgate.net/profile/Nethma-Kalpani"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
            aria-label="ResearchGate"
          >
            <FaResearchgate className="w-5 h-5" />
          </Link>
          <Link
            href="https://scholar.google.com/citations?user=qJwoILoAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
            aria-label="Google Scholar"
          >
            <FaGoogleScholar className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/nethma-kalpani"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:kalpani4lk@gmail.com"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
