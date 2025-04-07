import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer } from './ResponsiveComponents';
import { MapPin, Clock, Calendar, Star, Users, ThumbsUp, MessageCircle, Info, Camera, History } from 'lucide-react';

interface InformationCardProps {
  locationId?: string;
  className?: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  userImage?: string;
}

interface LocationInfo {
  id: string;
  name: string;
  description: string;
  shortFacts: string[];
  historicalInfo: string;
  culturalSignificance: string;
  bestTimeToVisit: string;
  openingHours: { [key: string]: string };
  entranceFee: string;
  rating: number;
  reviewCount: number;
  images: string[];
  reviews: Review[];
  tags: string[];
}

export function InformationCardsComponent({ 
  locationId = '1', 
  className = ''
}: InformationCardProps) {
  const { t } = useI18n();
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [expandedReviews, setExpandedReviews] = useState(false);
  
  // Fetch location information
  useEffect(() => {
    // In a real implementation, this would be an API call
    // Simulate API call with mock data
    setTimeout(() => {
      setLocation({
        id: locationId,
        name: 'Hagia Sophia',
        description: 'A historic museum and former church in Istanbul, Turkey. Built in 537 AD, it was the world\'s largest building and an engineering marvel of its time.',
        shortFacts: [
          'Built in 537 AD during the reign of Justinian I',
          'Served as a church for 916 years, a mosque for 481 years, and a museum for 85 years',
          'The dome is 55.6 meters high and 31.87 meters in diameter',
          'Features stunning Byzantine mosaics and Islamic calligraphy'
        ],
        historicalInfo: 'Hagia Sophia was built as a Christian cathedral in 537 AD under Emperor Justinian I. After the Ottoman conquest in 1453, it was converted into a mosque. In 1935, it became a museum, and in 2020, it was reconverted to a mosque while maintaining its status as a UNESCO World Heritage site.',
        culturalSignificance: 'Hagia Sophia represents a unique blend of Byzantine and Ottoman architectural and artistic elements, symbolizing the meeting of Eastern and Western cultures. Its mosaics and calligraphy are considered masterpieces of their respective traditions.',
        bestTimeToVisit: 'Early morning (8-10 AM) or late afternoon (3-5 PM) to avoid crowds. Weekdays are generally less crowded than weekends.',
        openingHours: {
          monday: '9:00 AM - 5:00 PM',
          tuesday: '9:00 AM - 5:00 PM',
          wednesday: '9:00 AM - 5:00 PM',
          thursday: '9:00 AM - 5:00 PM',
          friday: '9:00 AM - 5:00 PM',
          saturday: '9:00 AM - 5:00 PM',
          sunday: '9:00 AM - 5:00 PM',
        },
        entranceFee: 'Free (as a mosque), but donations are appreciated',
        rating: 4.8,
        reviewCount: 12543,
        images: [
          '/images/hagia-sophia-1.jpg',
          '/images/hagia-sophia-2.jpg',
          '/images/hagia-sophia-3.jpg',
        ],
        reviews: [
          {
            id: '1',
            userName: 'Maria S.',
            rating: 5,
            comment: 'Absolutely breathtaking! The architecture is stunning and the history is fascinating. A must-visit when in Istanbul.',
            date: '2025-03-15',
            helpful: 42,
            userImage: '/images/users/maria.jpg'
          },
          {
            id: '2',
            userName: 'Ahmed K.',
            rating: 4,
            comment: 'Beautiful place with amazing history. It gets very crowded though, so go early in the morning if possible.',
            date: '2025-02-28',
            helpful: 31
          },
          {
            id: '3',
            userName: 'John D.',
            rating: 5,
            comment: 'The blend of Christian and Islamic art and architecture is incredible. I spent hours just looking at the details.',
            date: '2025-02-10',
            helpful: 27
          },
          {
            id: '4',
            userName: 'Sophia L.',
            rating: 5,
            comment: 'As an architecture student, this was a dream come true. The dome is an engineering marvel, especially considering when it was built.',
            date: '2025-01-22',
            helpful: 19
          },
          {
            id: '5',
            userName: 'Carlos M.',
            rating: 4,
            comment: 'Great historical site. The only downside is the crowds, but it\'s worth it. The mosaics are incredible.',
            date: '2025-01-05',
            helpful: 15
          }
        ],
        tags: ['historical', 'architecture', 'religious', 'unesco']
      });
      setLoading(false);
    }, 1000);
  }, [locationId]);
  
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-40 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }
  
  if (!location) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <p className="text-red-500">{t('location.notFound')}</p>
      </div>
    );
  }
  
  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-current opacity-50" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400" />);
      }
    }
    return stars;
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header with Image */}
      <div className="relative h-64 bg-gray-300">
        {/* This would be a real image in production */}
        <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
          <Camera className="h-16 w-16 text-blue-400" />
        </div>
        
        {/* Location Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h2 className="text-white text-2xl font-bold">{location.name}</h2>
          <div className="flex items-center text-white mt-1">
            <div className="flex mr-2">
              {renderStars(location.rating)}
            </div>
            <span>{location.rating.toFixed(1)}</span>
            <span className="mx-1">•</span>
            <span>{location.reviewCount.toLocaleString()} {t('location.reviews')}</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('info')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'info' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Info className="h-4 w-4 inline mr-1" />
            {t('infoCard.quickInfo')}
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'history' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <History className="h-4 w-4 inline mr-1" />
            {t('infoCard.history')}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'reviews' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageCircle className="h-4 w-4 inline mr-1" />
            {t('infoCard.reviews')}
          </button>
          <button 
            onClick={() => setActiveTab('practical')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'practical' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Clock className="h-4 w-4 inline mr-1" />
            {t('infoCard.practicalInfo')}
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {/* Quick Info Tab */}
        {activeTab === 'info' && (
          <div>
            <p className="text-gray-700 mb-6">{location.description}</p>
            
            <h3 className="font-medium text-gray-900 mb-3">{t('infoCard.quickFacts')}</h3>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              {location.shortFacts.map((fact, index) => (
                <li key={index} className="text-gray-700">{fact}</li>
              ))}
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">{t('infoCard.bestTimeToVisit')}</h4>
              <p className="text-blue-700">{location.bestTimeToVisit}</p>
            </div>
          </div>
        )}
        
        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <h3 className="font-medium text-gray-900 mb-3">{t('infoCard.historicalInfo')}</h3>
            <p className="text-gray-700 mb-6">{location.historicalInfo}</p>
            
            <h3 className="font-medium text-gray-900 mb-3">{t('infoCard.culturalSignificance')}</h3>
            <p className="text-gray-700 mb-6">{location.culturalSignificance}</p>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h4 className="font-medium text-amber-800 mb-2">{t('infoCard.didYouKnow')}</h4>
              <p className="text-amber-700">{t('infoCard.hagiaSophiaFact')}</p>
            </div>
          </div>
        )}
        
        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center mb-6">
              <div className="flex mr-2">
                {renderStars(location.rating)}
              </div>
              <span className="text-lg font-medium">{location.rating.toFixed(1)}</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-500">{location.reviewCount.toLocaleString()} {t('infoCard.reviews')}</span>
            </div>
            
            <div className="space-y-6">
              {location.reviews.slice(0, expandedReviews ? undefined : 3).map(review => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      {review.userImage ? (
                        <img src={review.userImage} alt={review.userName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                          {review.userName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{review.userName}</h4>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex my-1">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-700 mt-1">{review.comment}</p>
                      <button className="flex items-center mt-2 text-gray-500 text-sm hover:text-blue-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {t('infoCard.helpful')} ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {location.reviews.length > 3 && (
                <button 
                  onClick={() => setExpandedReviews(!expandedReviews)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {expandedReviews ? t('infoCard.showLess') : t('infoCard.showMore')}
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Practical Info Tab */}
        {activeTab === 'practical' && (
          <div>
            <h3 className="font-medium text-gray-900 mb-3">{t('infoCard.openingHours')}</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-700">{t('infoCard.monday')}:</div>
                <div className="text-gray-900">{location.openingHours.monday}</div>
                <div className="text-gray-700">{t('infoCard.tuesday')}:</div>
                <div className="text-gray-900">{location.openingHours.tuesday}</div>
                <div className="text-gray-700">{t('infoCard.wednesday')}:</div>
                <div className="text-gray-900">{location.openingHours.wednesday}</div>
                <div className="text-gray-700">{t('infoCard.thursday')}:</div>
                <div className="text-gray-900">{location.openingHours.thursday}</div>
                <div className="text-gray-700">{t('infoCard.friday')}:</div>
                <div className="text-gray-900">{location.openingHours.friday}</div>
                <div className="text-gray-700">{t('infoCard.saturday')}:</div>
                <div className="text-gray-900">{location.openingHours.saturday}</div>
                <div className="text-gray-700">{t('infoCard.sunday')}:</div>
                <div className="text-gray-900">{location.openingHours.sunday}</div>
              </div>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-3">{t('infoCard.entranceFee')}</h3>
            <p className="text-gray-700 mb-6">{location.entranceFee}</p>
            
            <h3 className="font-medium text-gray-900 mb-3">{t('infoCard.tags')}</h3>
            <div className="flex flex-wrap gap-2">
              {location.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
