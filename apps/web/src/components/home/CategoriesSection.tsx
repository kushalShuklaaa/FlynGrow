'use client';

import { Card, CardContent } from '@studyhub/ui';
import { BookOpen, Users, Award, TrendingUp, FileText, Code } from 'lucide-react';

const CategoriesSection = () => {
  const categories = [
    {
      icon: BookOpen,
      title: 'IELTS',
      description: 'Complete IELTS preparation materials',
      count: '250+ Materials',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      icon: Award,
      title: 'GRE',
      description: 'GRE quantitative and verbal guides',
      count: '180+ Materials',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      icon: Users,
      title: 'TOEFL',
      description: 'TOEFL speaking and writing resources',
      count: '200+ Materials',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      icon: TrendingUp,
      title: 'GMAT',
      description: 'GMAT verbal and quantitative prep',
      count: '150+ Materials',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    },
    {
      icon: Code,
      title: 'Programming',
      description: 'Coding interview and skill guides',
      count: '300+ Materials',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100'
    },
    {
      icon: FileText,
      title: 'Career Roadmaps',
      description: 'Professional development guides',
      count: '120+ Materials',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Study Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect study materials for your exam preparation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="card-hover group cursor-pointer">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`h-8 w-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    {category.count}
                  </span>
                  <button className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}>
                    Explore →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;