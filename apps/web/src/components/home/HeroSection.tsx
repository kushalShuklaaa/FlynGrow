'use client';

import { Button } from '@studyhub/ui';
import { ArrowRight, Download, Star, Users, Award, BookOpen } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="gradient-bg text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master Your Exams with
            <span className="block text-yellow-300">Premium Study Materials</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Access comprehensive digital study materials for IELTS, GRE, TOEFL, GMAT, 
            and programming exams. Download instantly and start your success journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Download className="mr-2 h-5 w-5" />
              Browse Materials
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <BookOpen className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">50K+</div>
              <div className="text-gray-300">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">1000+</div>
              <div className="text-gray-300">Study Materials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">4.9</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;