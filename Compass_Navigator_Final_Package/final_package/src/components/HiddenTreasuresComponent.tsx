import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer } from './ResponsiveComponents';
import { MapPin, Navigation, Clock, Calendar, Users, Search, Filter, Star, ThumbsUp, Eye } from 'lucide-react';

interface HiddenTreasuresProps {
  className?: string;
}

interface Treasure {
  id: string;
  name: string;
  description: string;
  position: { lat: number; lng: number };
  distance: number;
  category: string;
  popularity: number; // 1-10 scale, lower means more hidden
  localRating: number; // 1-5 scale
  touristRating: number; // 1-5 scale
  bestTimeToVisit: string;
  image?: string;
  localTip: string;
  discoveredBy: number; // percentage of tourists who discover this place
  tags: string[];
}

export function HiddenTreasuresComponent({ className = '' }: HiddenTreasuresProps) {
  const { t } = useI18n();
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [filteredTreasures, setFilteredTreasures] = useState<Treasure[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [hiddenLevel, setHiddenLevel] = useState<number>(5); // 1-10 scale, higher means show more hidden places
  
  // Available categories
  const categories = [
    { id: 'all', label: t('hiddenTreasures.allCategories') },
    { id: 'food', label: t('hiddenTreasures.food') },
    { id: 'nature', label: t('hiddenTreasures.nature') },
    { id: 'cultural', label: t('hiddenTreasures.cultural') },
    { id: 'historical', label: t('hiddenTreasures.historical') },
    { id: 'viewpoint', label: t('hiddenTreasures.viewpoint') },
    { id: 'local', label: t('hiddenTreasures.local') }
  ];
  
  // Fetch hidden treasures
  useEffect(() => {
    // In a real implementation, this would be an API call
    // Simulate API call with mock data
    setTimeout(() => {
      const mockTreasures: Treasure[] = [
        {
          id: '1',
          name: 'Çukurcuma Antique Shops',
          description: 'A hidden neighborhood with charming antique shops and vintage stores that most tourists miss.',
          position: { lat: 41.0312, lng: 28.9765 },
          distance: 1.2,
          category: 'local',
          popularity: 3,
          localRating: 4.8,
          touristRating: 4.5,
          bestTimeToVisit: 'Weekday mornings',
          localTip: 'Visit Aslı Antique Shop and ask for Mehmet, he has the best stories about the neighborhood.',
          discoveredBy: 15,
          tags: ['shopping', 'antiques', 'local', 'hidden']
        },
        {
          id: '2',
          name: 'Yıldız Park Secret Garden',
          description: 'A secluded garden within Yıldız Park that few visitors know about, offering peaceful surroundings and beautiful views.',
          position: { lat: 41.0512, lng: 29.0102 },
          distance: 5.8,
          category: 'nature',
          popularity: 2,
          localRating: 4.9,
          touristRating: 4.7,
          bestTimeToVisit: 'Sunset',
          localTip: 'There\'s a small path behind the third fountain that leads to an even more secluded viewpoint.',
          discoveredBy: 8,
          tags: ['nature', 'peaceful', 'views', 'hidden']
        },
        {
          id: '3',
          name: 'Balat Colorful Houses',
          description: 'A vibrant neighborhood with colorful houses and authentic local life, less frequented by typical tourists.',
          position: { lat: 41.0294, lng: 28.9491 },
          distance: 3.5,
          category: 'cultural',
          popularity: 4,
          localRating: 4.6,
          touristRating: 4.8,
          bestTimeToVisit: 'Early afternoon',
          localTip: 'The small café on the corner of the blue and yellow houses serves the best Turkish coffee in the area.',
          discoveredBy: 25,
          tags: ['cultural', 'photography', 'local', 'colorful']
        },
        {
          id: '4',
          name: 'Underground Cistern of Philoxenos',
          description: 'A lesser-known underground cistern compared to the famous Basilica Cistern, but equally impressive and with fewer visitors.',
          position: { lat: 41.0086, lng: 28.9713 },
          distance: 0.9,
          category: 'historical',
          popularity: 3,
          localRating: 4.5,
          touristRating: 4.6,
          bestTimeToVisit: 'Weekday afternoons',
          localTip: 'Look for the small Medusa head carving in the northeast corner.',
          discoveredBy: 20,
          tags: ['historical', 'architecture', 'underground', 'quiet']
        },
        {
          id: '5',
          name: 'Karaköy Lokma',
          description: 'A tiny shop serving traditional Turkish lokma (sweet fried dough) that locals love but tourists rarely find.',
          position: { lat: 41.0225, lng: 28.9772 },
          distance: 1.8,
          category: 'food',
          popularity: 2,
          localRating: 4.9,
          touristRating: 4.7,
          bestTimeToVisit: 'Morning, when they\'re freshly made',
          localTip: 'Ask for the cinnamon and walnut topping, it\'s not on the menu.',
          discoveredBy: 12,
          tags: ['food', 'sweets', 'local', 'hidden']
        },
        {
          id: '6',
          name: 'Samatya Fish Market',
          description: 'An authentic fish market where locals shop, with small restaurants cooking your fresh purchases on the spot.',
          position: { lat: 40.9947, lng: 28.9243 },
          distance: 6.2,
          category: 'food',
          popularity: 1,
          localRating: 4.8,
          touristRating: 4.3,
          bestTimeToVisit: 'Sunday mornings',
          localTip: 'The small restaurant with blue chairs has the best grilled fish. Bring your purchase there.',
          discoveredBy: 5,
          tags: ['food', 'seafood', 'market', 'authentic']
        },
        {
          id: '7',
          name: 'Çamlıca Hill Secret Viewpoint',
          description: 'A hidden spot on Çamlıca Hill that offers panoramic views of both the European and Asian sides of Istanbul.',
          position: { lat: 41.0275, lng: 29.0718 },
          distance: 9.5,
          category: 'viewpoint',
          popularity: 2,
          localRating: 4.9,
          touristRating: 4.8,
          bestTimeToVisit: 'Sunset or night',
          localTip: 'Take the unmarked path behind the main viewing platform and walk about 200 meters.',
          discoveredBy: 10,
          tags: ['views', 'photography', 'romantic', 'hidden']
        },
        {
          id: '8',
          name: 'Kuzguncuk Colorful Street',
          description: 'A charming street on the Asian side with colorful houses, small art galleries, and cozy cafés.',
          position: { lat: 41.0372, lng: 29.0347 },
          distance: 7.8,
          category: 'cultural',
          popularity: 3,
          localRating: 4.7,
          touristRating: 4.6,
          bestTimeToVisit: 'Weekday afternoons',
          localTip: 'The purple building houses a small art gallery with rotating exhibitions by local artists.',
          discoveredBy: 18,
          tags: ['cultural', 'art', 'cafés', 'photography']
        },
        {
          id: '9',
          name: 'Pierre Loti Secret Path',
          description: 'A hidden path near the famous Pierre Loti café that leads to an even better viewpoint without the crowds.',
          position: { lat: 41.0586, lng: 28.9394 },
          distance: 8.3,
          category: 'viewpoint',
          popularity: 1,
          localRating: 4.9,
          touristRating: 4.7,
          bestTimeToVisit: 'Sunset',
          localTip: 'Look for the narrow dirt path that branches off to the right about 100 meters before reaching the main café.',
          discoveredBy: 7,
          tags: ['views', 'hidden', 'peaceful', 'photography']
        },
        {
          id: '10',
          name: 'Kadıköy Street Art Alley',
          description: 'A narrow alley in Kadıköy filled with impressive street art and murals that changes regularly.',
          position: { lat: 40.9901, lng: 29.0282 },
          distance: 5.5,
          category: 'cultural',
          popularity: 3,
          localRating: 4.6,
          touristRating: 4.8,
          bestTimeToVisit: 'Daytime for best lighting',
          localTip: 'Visit during the first week of the month when new artworks are often added.',
          discoveredBy: 22,
          tags: ['art', 'cultural', 'photography', 'urban']
        }
      ];
      
      setTreasures(mockTreasures);
      setFilteredTreasures(mockTreasures);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter treasures based on search, category, distance, and hidden level
  useEffect(() => {
    if (treasures.length === 0) return;
    
    let filtered = [...treasures];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(treasure => 
        treasure.name.toLowerCase().includes(query) || 
        treasure.description.toLowerCase().includes(query) ||
        treasure.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(treasure => treasure.category === selectedCategory);
    }
    
    // Filter by distance
    filtered = filtered.filter(treasure => treasure.distance <= maxDistance);
    
    // Filter by hidden level
    filtered = filtered.filter(treasure => treasure.popularity <= hiddenLevel);
    
    // Sort by a combination of hidden level and distance
    filtered.sort((a, b) => {
      // Calculate a score based on how hidden and how close the place is
      const scoreA = (11 - a.popularity) * 2 - (a.distance / maxDistance);
      const scoreB = (11 - b.popularity) * 2 - (b.distance / maxDistance);
      return scoreB - scoreA; // Higher score first
    });
    
    setFilteredTreasures(filtered);
  }, [treasures, searchQuery, selectedCategory, maxDistance, hiddenLevel]);
  
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
  
  // Render hidden level indicator
  const renderHiddenLevel = (popularity: number) => {
    const hiddenLevel = 10 - popularity; // Convert popularity to hidden level (1-10)
    const gems = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.ceil(hiddenLevel / 2)) {
        gems.push(
          <div key={i} className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
            <Eye className="h-3 w-3 text-white" />
          </div>
        );
      } else {
        gems.push(
          <div key={i} className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
            <Eye className="h-3 w-3 text-gray-400" />
          </div>
        );
      }
    }
    
    return (
      <div className="flex space-x-1" title={`${t('hiddenTreasures.hiddenLevel')}: ${hiddenLevel}/10`}>
        {gems}
      </div>
    );
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('hiddenTreasures.title')}</h2>
        <p className="text-gray-600 mb-6">{t('hiddenTreasures.description')}</p>
        
        {/* Search and Filters */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('hiddenTreasures.searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Distance Filter */}
            <div className="w-full md:w-48">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">{t('hiddenTreasures.maxDistance')}: {maxDistance} km</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Hidden Level Filter */}
            <div className="w-full md:w-48">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">{t('hiddenTreasures.hiddenLevel')}: {hiddenLevel}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={hiddenLevel}
                  onChange={(e) => setHiddenLevel(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex">
                  <div className="h-24 w-24 bg-gray-200 rounded-lg mr-4"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTreasures.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{t('hiddenTreasures.noResults')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTreasures.map(treasure => (
              <div key={treasure.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
                      <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        {treasure.image ? (
                          <img src={treasure.image} alt={treasure.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <MapPin className="h-12 w-12 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800">{treasure.name}</h3>
                        {renderHiddenLevel(treasure.popularity)}
                      </div>
                      
                      <div className="flex items-center mt-1 mb-2">
                        <div className="flex mr-2">
                          {renderStars(treasure.localRating)}
                        </div>
                        <span className="text-sm text-gray-600">{t('hiddenTreasures.localRating')}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{treasure.distance} km</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <Eye className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{t('hiddenTreasures.discoveredBy', { percent: treasure.discoveredBy })}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{treasure.description}</p>
                      
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 mb-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                              <ThumbsUp className="h-3 w-3 text-purple-600" />
                            </div>
                          </div>
                          <div className="ml-2">
                            <h4 className="text-sm font-medium text-purple-800">{t('hiddenTreasures.localTip')}</h4>
                            <p className="text-sm text-purple-700">{treasure.localTip}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{t('hiddenTreasures.bestTime')}: {treasure.bestTimeToVisit}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {treasure.tags.map(tag => (
                          <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                          <Navigation className="h-4 w-4 mr-1" />
                          {t('hiddenTreasures.directions')}
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          {t('hiddenTreasures.addToWishlist')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Results Summary */}
        {!loading && filteredTreasures.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('hiddenTreasures.foundResults', { count: filteredTreasures.length })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
