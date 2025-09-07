import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoriesSection from '@/components/home/CategoriesSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export const metadata: Metadata = {
  title: 'StudyHub - Premium Digital Study Materials',
  description: 'Access premium digital study materials for IELTS, GRE, TOEFL, GMAT and more. Download PDFs, ZIP files, and comprehensive study guides.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <CategoriesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}