'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@studyhub/ui';
import { Star, Download, Eye, Heart } from 'lucide-react';
import Image from 'next/image';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: 'IELTS Complete Preparation Pack',
      description: 'Comprehensive IELTS study materials including practice tests, vocabulary guides, and speaking tips.',
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.9,
      reviewCount: 1247,
      downloads: 15420,
      image: '/images/ielts-pack.jpg',
      category: 'IELTS',
      tags: ['PDF', 'Audio', 'Video']
    },
    {
      id: 2,
      title: 'GRE Quantitative Mastery Guide',
      description: 'Advanced GRE math preparation with 500+ practice questions and detailed solutions.',
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviewCount: 892,
      downloads: 12300,
      image: '/images/gre-math.jpg',
      category: 'GRE',
      tags: ['PDF', 'Practice Tests']
    },
    {
      id: 3,
      title: 'TOEFL Speaking & Writing Bundle',
      description: 'Complete TOEFL speaking and writing preparation with sample responses and templates.',
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.7,
      reviewCount: 654,
      downloads: 8900,
      image: '/images/toefl-bundle.jpg',
      category: 'TOEFL',
      tags: ['PDF', 'Audio', 'Templates']
    },
    {
      id: 4,
      title: 'GMAT Verbal Reasoning Pack',
      description: 'GMAT verbal section mastery with critical reasoning and sentence correction guides.',
      price: 44.99,
      originalPrice: 69.99,
      rating: 4.9,
      reviewCount: 743,
      downloads: 11200,
      image: '/images/gmat-verbal.jpg',
      category: 'GMAT',
      tags: ['PDF', 'Practice Questions']
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Study Materials
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked premium study materials that have helped thousands of students achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="card-hover group">
              <CardHeader className="p-0">
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold text-purple-300">
                      {product.category.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                
                <CardTitle className="text-lg mb-2 group-hover:text-purple-600 transition-colors">
                  {product.title}
                </CardTitle>
                
                <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </CardDescription>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="h-4 w-4 mr-1" />
                    {product.downloads.toLocaleString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                    Add to Cart
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;