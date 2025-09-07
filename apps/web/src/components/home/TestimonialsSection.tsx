'use client';

import { Card, CardContent } from '@studyhub/ui';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'IELTS Student',
      rating: 5,
      content: 'The IELTS preparation materials were incredibly comprehensive. I scored 8.5 overall thanks to the detailed practice tests and speaking guides.',
      avatar: 'SJ',
      exam: 'IELTS',
      score: '8.5'
    },
    {
      name: 'Michael Chen',
      role: 'GRE Student',
      rating: 5,
      content: 'The GRE quantitative guide helped me improve my math score by 15 points. The practice questions were exactly like the real exam.',
      avatar: 'MC',
      exam: 'GRE',
      score: '330'
    },
    {
      name: 'Emily Rodriguez',
      role: 'TOEFL Student',
      rating: 5,
      content: 'The TOEFL speaking templates were a game-changer. I felt confident during the exam and achieved my target score of 110.',
      avatar: 'ER',
      exam: 'TOEFL',
      score: '110'
    },
    {
      name: 'David Kim',
      role: 'GMAT Student',
      rating: 5,
      content: 'The GMAT verbal reasoning materials were excellent. The critical reasoning strategies helped me improve my score significantly.',
      avatar: 'DK',
      exam: 'GMAT',
      score: '720'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real success stories from students who achieved their goals with our study materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-purple-200" />
                  <p className="text-gray-700 text-sm italic pl-4">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500">Exam:</span>
                    <span className="text-sm font-semibold text-purple-600 ml-1">
                      {testimonial.exam}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Score:</span>
                    <span className="text-sm font-bold text-green-600 ml-1">
                      {testimonial.score}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-3">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700 font-semibold">
              <span className="text-2xl font-bold text-gray-900">4.9</span> out of 5 stars
            </span>
            <span className="text-gray-500 ml-2">(2,847 reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;