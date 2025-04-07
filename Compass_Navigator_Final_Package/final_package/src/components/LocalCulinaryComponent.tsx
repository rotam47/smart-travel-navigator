import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer } from './ResponsiveComponents';
import { Utensils, Coffee, Star, MapPin, Clock, ThumbsUp, Info, ExternalLink } from 'lucide-react';

interface LocalCulinaryProps {
  className?: string;
}

export function LocalCulinaryComponent({ className = '' }: LocalCulinaryProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('restaurants');
  const [loading, setLoading] = useState(false);
  
  // Sample culinary data
  const [culinaryItems, setCulinaryItems] = useState({
    restaurants: [
      {
        id: 1,
        name: 'Sultanahmet Köftecisi',
        type: 'Traditional Turkish',
        distance: 0.4,
        rating: 4.7,
        priceLevel: 2,
        specialty: 'Köfte (Turkish meatballs)',
        description: 'Famous for its traditional Turkish meatballs since 1920.',
        openNow: true,
        sponsored: false,
        reviews: 1243,
        image: 'restaurant1.jpg'
      },
      {
        id: 2,
        name: 'Balıkçı Sabahattin',
        type: 'Seafood',
        distance: 0.8,
        rating: 4.8,
        priceLevel: 3,
        specialty: 'Fresh seafood and mezes',
        description: 'Family-run seafood restaurant with a great selection of mezes and daily catch.',
        openNow: true,
        sponsored: true,
        reviews: 856,
        image: 'restaurant2.jpg'
      },
      {
        id: 3,
        name: 'Çiya Sofrası',
        type: 'Regional Turkish',
        distance: 1.5,
        rating: 4.9,
        priceLevel: 2,
        specialty: 'Regional dishes from all over Turkey',
        description: 'Offering forgotten recipes from various regions of Anatolia.',
        openNow: true,
        sponsored: false,
        reviews: 1567,
        image: 'restaurant3.jpg'
      },
      {
        id: 4,
        name: 'Hamdi Restaurant',
        type: 'Kebab',
        distance: 0.9,
        rating: 4.6,
        priceLevel: 3,
        specialty: 'Kebabs and baklava',
        description: 'Famous for its kebabs and spectacular view of the Golden Horn.',
        openNow: true,
        sponsored: false,
        reviews: 2134,
        image: 'restaurant4.jpg'
      }
    ],
    cafes: [
      {
        id: 1,
        name: 'Mandabatmaz',
        type: 'Traditional Coffee House',
        distance: 0.6,
        rating: 4.8,
        priceLevel: 1,
        specialty: 'Turkish coffee',
        description: 'One of the best places in Istanbul for authentic Turkish coffee.',
        openNow: true,
        sponsored: false,
        reviews: 743,
        image: 'cafe1.jpg'
      },
      {
        id: 2,
        name: 'Fazıl Bey\'s Turkish Coffee',
        type: 'Coffee House',
        distance: 1.2,
        rating: 4.9,
        priceLevel: 2,
        specialty: 'Flavored Turkish coffee',
        description: 'Serving traditional and flavored Turkish coffee since 1923.',
        openNow: true,
        sponsored: true,
        reviews: 1023,
        image: 'cafe2.jpg'
      },
      {
        id: 3,
        name: 'Pierre Loti Café',
        type: 'Scenic Café',
        distance: 3.5,
        rating: 4.7,
        priceLevel: 2,
        specialty: 'Tea and coffee with a view',
        description: 'Historic café with panoramic views of the Golden Horn.',
        openNow: true,
        sponsored: false,
        reviews: 1876,
        image: 'cafe3.jpg'
      }
    ],
    streetFood: [
      {
        id: 1,
        name: 'Balık Ekmek Boats',
        type: 'Fish Sandwich',
        distance: 0.7,
        rating: 4.5,
        priceLevel: 1,
        specialty: 'Fish sandwich (Balık Ekmek)',
        description: 'Fresh fish sandwiches served from boats at Eminönü.',
        openNow: true,
        sponsored: false,
        reviews: 1432,
        image: 'street1.jpg'
      },
      {
        id: 2,
        name: 'Döner Stands at Taksim',
        type: 'Döner Kebab',
        distance: 2.1,
        rating: 4.6,
        priceLevel: 1,
        specialty: 'Döner kebab',
        description: 'Authentic Turkish döner kebab served in bread or on a plate.',
        openNow: true,
        sponsored: false,
        reviews: 2145,
        image: 'street2.jpg'
      },
      {
        id: 3,
        name: 'Midyeci Ahmet',
        type: 'Stuffed Mussels',
        distance: 0.9,
        rating: 4.7,
        priceLevel: 1,
        specialty: 'Stuffed mussels (Midye Dolma)',
        description: 'Famous for its delicious stuffed mussels with spiced rice.',
        openNow: true,
        sponsored: true,
        reviews: 876,
        image: 'street3.jpg'
      },
      {
        id: 4,
        name: 'Kumpir Stands at Ortaköy',
        type: 'Stuffed Potato',
        distance: 4.3,
        rating: 4.6,
        priceLevel: 1,
        specialty: 'Stuffed baked potato (Kumpir)',
        description: 'Baked potatoes filled with butter, cheese, and various toppings.',
        openNow: true,
        sponsored: false,
        reviews: 1243,
        image: 'street4.jpg'
      }
    ],
    desserts: [
      {
        id: 1,
        name: 'Karaköy Güllüoğlu',
        type: 'Baklava Shop',
        distance: 1.3,
        rating: 4.9,
        priceLevel: 2,
        specialty: 'Baklava',
        description: 'Serving the best baklava in Istanbul since 1949.',
        openNow: true,
        sponsored: true,
        reviews: 3245,
        image: 'dessert1.jpg'
      },
      {
        id: 2,
        name: 'Hafız Mustafa 1864',
        type: 'Traditional Desserts',
        distance: 0.5,
        rating: 4.8,
        priceLevel: 2,
        specialty: 'Turkish delight and baklava',
        description: 'Historic confectionery serving traditional Turkish desserts since 1864.',
        openNow: true,
        sponsored: false,
        reviews: 2876,
        image: 'dessert2.jpg'
      },
      {
        id: 3,
        name: 'Ali Muhiddin Hacı Bekir',
        type: 'Turkish Delight',
        distance: 0.8,
        rating: 4.7,
        priceLevel: 2,
        specialty: 'Turkish delight (Lokum)',
        description: 'The oldest Turkish delight shop in Istanbul, established in 1777.',
        openNow: true,
        sponsored: false,
        reviews: 1543,
        image: 'dessert3.jpg'
      }
    ]
  });
  
  // Get current items based on active tab
  const getCurrentItems = () => {
    switch(activeTab) {
      case 'restaurants':
        return culinaryItems.restaurants;
      case 'cafes':
        return culinaryItems.cafes;
      case 'streetFood':
        return culinaryItems.streetFood;
      case 'desserts':
        return culinaryItems.desserts;
      default:
        return culinaryItems.restaurants;
    }
  };
  
  // Render price level
  const renderPriceLevel = (level) => {
    return (
      <div className="flex items-center">
        {[...Array(3)].map((_, i) => (
          <span key={i} className={`text-sm ${i < level ? 'text-gray-900' : 'text-gray-300'}`}>$</span>
        ))}
      </div>
    );
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('restaurants')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'restaurants' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Utensils className="h-4 w-4 inline mr-1" />
            {t('culinary.restaurantsTab')}
          </button>
          <button 
            onClick={() => setActiveTab('cafes')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'cafes' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Coffee className="h-4 w-4 inline mr-1" />
            {t('culinary.cafesTab')}
          </button>
          <button 
            onClick={() => setActiveTab('streetFood')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'streetFood' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MapPin className="h-4 w-4 inline mr-1" />
            {t('culinary.streetFoodTab')}
          </button>
          <button 
            onClick={() => setActiveTab('desserts')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'desserts' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Star className="h-4 w-4 inline mr-1" />
            {t('culinary.dessertsTab')}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t(`culinary.${activeTab}Title`)}
          </h3>
          <p className="text-sm text-gray-600">
            {t(`culinary.${activeTab}Description`)}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {getCurrentItems().map((item) => (
            <div 
              key={item.id} 
              className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                item.sponsored ? 'border-yellow-300' : ''
              }`}
            >
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Utensils className="h-12 w-12" />
                </div>
                
                {item.sponsored && (
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {t('culinary.sponsored')}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-gray-900 font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-1">{item.rating}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {item.distance} km away
                  </div>
                  
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {item.openNow ? (
                        <span className="text-green-600">{t('culinary.openNow')}</span>
                      ) : (
                        <span className="text-red-600">{t('culinary.closed')}</span>
                      )}
                    </div>
                    
                    {renderPriceLevel(item.priceLevel)}
                  </div>
                </div>
                
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-1">
                    {t('culinary.specialty')}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">{item.specialty}</p>
                  
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {t('culinary.recommend')}
                  </button>
                  
                  <div>
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2">
                      <Info className="h-3 w-3 mr-1" />
                      {t('culinary.details')}
                    </button>
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {t('culinary.directions')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">
                {t('culinary.localTip')}
              </h4>
              <p className="mt-1 text-sm text-blue-700">
                {t(`culinary.${activeTab}Tip`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
