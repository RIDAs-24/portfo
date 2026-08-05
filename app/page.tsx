/**
 * Root page — Server Component by default (no 'use client').
 *
 * Code splitting strategy:
 * - Header + Hero: eagerly imported (above-the-fold critical path)
 * - All other sections: dynamic() with SSR enabled (preserves SEO, avoids hydration mismatch)
 *   The JS bundle for each is split into a separate chunk and only downloaded when needed.
 *
 * Note: ProjectShowcase components handle their own ssr:false
 * via isMounted guards, so the section shell itself can still SSR.
 */
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SectionSkeleton from '@/components/SectionSkeleton';

// Below-fold sections — dynamically imported to split JS bundle.
// SSR enabled (default) for SEO & hydration stability.
const About = dynamic(() => import('@/components/About'), {
  loading: () => <SectionSkeleton height="h-[700px]" />,
});

const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <SectionSkeleton height="h-[600px]" />,
});

const PurposePassion = dynamic(() => import('@/components/PurposePassion'), {
  loading: () => <SectionSkeleton height="h-[700px]" />,
});

const SectionDivider = dynamic(() => import('@/components/SectionDivider'), {
  loading: () => <div className="h-32 w-full" />,
});

const ProjectShowcase = dynamic(() => import('@/components/showcase/ProjectShowcase'), {
  loading: () => <SectionSkeleton height="h-[800px]" />,
});

const EcoSection = dynamic(() => import('@/components/EcoSection'), {
  loading: () => <SectionSkeleton height="h-[600px]" />,
});

const Experience = dynamic(() => import('@/components/Experience'), {
  loading: () => <SectionSkeleton height="h-[800px]" />,
});

const Goals = dynamic(() => import('@/components/Goals'), {
  loading: () => <SectionSkeleton height="h-[400px]" />,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <SectionSkeleton height="h-[700px]" />,
});

const Footer = dynamic(() => import('@/components/Footer'));

import IntroWrapper from '@/components/IntroWrapper';

export default function Home() {
  return (
    <IntroWrapper>
      <main className="flex flex-col">
        {/* Critical above-the-fold — eager load */}
        <Header />
        <Hero />

        {/* Below-fold sections — split bundles, wrapped in Suspense */}
        <Suspense fallback={<SectionSkeleton height="h-[700px]" />}>
          <About />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
          <Skills />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton height="h-[700px]" />}>
          <PurposePassion />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton height="h-[800px]" />}>
          <ProjectShowcase />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
          <EcoSection />
        </Suspense>
        
        <SectionDivider />

        <Suspense fallback={<SectionSkeleton height="h-[800px]" />}>
          <Experience />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton height="h-[400px]" />}>
          <Goals />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionSkeleton height="h-[700px]" />}>
          <Contact />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[100px]" />}>
          <Footer />
        </Suspense>
      </main>
    </IntroWrapper>
  );
}
