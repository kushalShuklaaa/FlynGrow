'use client';

import { Button } from '@studyhub/ui';
import { Mail, Send } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="py-16 gradient-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Mail className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Latest Materials
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Get notified about new study materials, exam tips, and exclusive discounts.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-yellow-300 focus:outline-none text-gray-900 placeholder-gray-500"
            />
            <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-6 py-3 font-semibold">
              <Send className="mr-2 h-5 w-5" />
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-300 mt-3">
            Join 10,000+ students who receive our weekly study tips and updates.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-yellow-300 mb-2">10K+</div>
            <div className="text-gray-300">Subscribers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-300 mb-2">Weekly</div>
            <div className="text-gray-300">Updates</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-300 mb-2">Free</div>
            <div className="text-gray-300">Resources</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;