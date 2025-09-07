'use client';

import { Card, CardContent } from '@studyhub/ui';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: BookOpen,
      value: '1000+',
      label: 'Study Materials',
      description: 'Comprehensive resources for all major exams'
    },
    {
      icon: Users,
      value: '50K+',
      label: 'Happy Students',
      description: 'Students who achieved their goals with us'
    },
    {
      icon: Award,
      value: '95%',
      label: 'Success Rate',
      description: 'Students who passed their target exams'
    },
    {
      icon: TrendingUp,
      value: '4.9/5',
      label: 'Average Rating',
      description: 'Based on thousands of student reviews'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful students who have achieved their academic goals with our premium study materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center card-hover">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;