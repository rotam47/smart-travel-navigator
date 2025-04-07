import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer } from './ResponsiveComponents';
import { Clock, Calendar, History, MapPin, Camera, Smile, Frown, Meh, Sun, Cloud, CloudRain } from 'lucide-react';

interface EmotionalMappingProps {
  className?: string;
}

type Mood = 'happy' | 'neutral' | 'sad' | 'excited' | 'tired' | 'romantic' | 'adventurous' | 'relaxed';

interface MoodBasedRecommendation {
  mood: Mood;
  title: string;
  description: string;
  places: Array<{
    id: string;
    name: string;
    description: string;
    distance: number;
    rating: number;
    image?: string;
    tags: string[];
  }>;
  activities: string[];
}

export function EmotionalMapping({ className = '' }: EmotionalMappingProps) {
  const { t } = useI18n();
  const [selectedMood, setSelectedMood] = useState<Mood>('happy');
  const [recommendations, setRecommendations] = useState<MoodBasedRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<{condition: string; temperature: number}>({
    condition: 'sunny',
    temperature: 22
  });
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');
  
  // Available moods with their icons and descriptions
  const moods: Array<{id: Mood; icon: React.ReactNode; label: string; description: string}> = [
    { 
      id: 'happy', 
      icon: <Smile className="h-6 w-6 text-yellow-500" />, 
      label: t('emotional.happy'),
      description: t('emotional.happyDesc')
    },
    { 
      id: 'neutral', 
      icon: <Meh className="h-6 w-6 text-blue-400" />, 
      label: t('emotional.neutral'),
      description: t('emotional.neutralDesc')
    },
    { 
      id: 'sad', 
      icon: <Frown className="h-6 w-6 text-indigo-400" />, 
      label: t('emotional.sad'),
      description: t('emotional.sadDesc')
    },
    { 
      id: 'excited', 
      icon: <span className="text-2xl">🤩</span>, 
      label: t('emotional.excited'),
      description: t('emotional.excitedDesc')
    },
    { 
      id: 'tired', 
      icon: <span className="text-2xl">😴</span>, 
      label: t('emotional.tired'),
      description: t('emotional.tiredDesc')
    },
    { 
      id: 'romantic', 
      icon: <span className="text-2xl">❤️</span>, 
      label: t('emotional.romantic'),
      description: t('emotional.romanticDesc')
    },
    { 
      id: 'adventurous', 
      icon: <span className="text-2xl">🧗</span>, 
      label: t('emotional.adventurous'),
      description: t('emotional.adventurousDesc')
    },
    { 
      id: 'relaxed', 
      icon: <span className="text-2xl">😌</span>, 
      label: t('emotional.relaxed'),
      description: t('emotional.relaxedDesc')
    }
  ];
  
  // Set time of day based on current hour
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);
  
  // Get recommendations based on mood, weather, and time of day
  useEffect(() => {
    if (!selectedMood) return;
    
    setLoading(true);
    
    // In a real implementation, this would be an API call
    // Simulate API call with mock data
    setTimeout(() => {
      // Generate recommendations based on mood, weather, and time of day
      const moodRecommendations: Record<Mood, MoodBasedRecommendation> = {
        happy: {
          mood: 'happy',
          title: t('emotional.happyTitle'),
          description: t('emotional.happyRecommendation'),
          places: [
            {
              id: '1',
              name: 'Gülhane Park',
              description: 'Beautiful park with colorful flowers and scenic views',
              distance: 0.8,
              rating: 4.7,
              tags: ['outdoor', 'nature', 'peaceful']
            },
            {
              id: '2',
              name: 'Grand Bazaar',
              description: 'Vibrant market with a lively atmosphere',
              distance: 1.2,
              rating: 4.5,
              tags: ['shopping', 'cultural', 'busy']
            },
            {
              id: '3',
              name: 'Bosphorus Cruise',
              description: 'Scenic boat tour with amazing city views',
              distance: 2.5,
              rating: 4.8,
              tags: ['water', 'views', 'relaxing']
            }
          ],
          activities: [
            t('emotional.happyActivity1'),
            t('emotional.happyActivity2'),
            t('emotional.happyActivity3')
          ]
        },
        neutral: {
          mood: 'neutral',
          title: t('emotional.neutralTitle'),
          description: t('emotional.neutralRecommendation'),
          places: [
            {
              id: '4',
              name: 'Istanbul Archaeological Museums',
              description: 'Fascinating collection of artifacts from various periods',
              distance: 0.5,
              rating: 4.6,
              tags: ['indoor', 'cultural', 'educational']
            },
            {
              id: '5',
              name: 'Spice Bazaar',
              description: 'Colorful market with aromatic spices and Turkish delights',
              distance: 1.0,
              rating: 4.5,
              tags: ['shopping', 'food', 'cultural']
            },
            {
              id: '6',
              name: 'Galata Tower',
              description: 'Historic tower with panoramic views of the city',
              distance: 1.8,
              rating: 4.7,
              tags: ['views', 'historical', 'photography']
            }
          ],
          activities: [
            t('emotional.neutralActivity1'),
            t('emotional.neutralActivity2'),
            t('emotional.neutralActivity3')
          ]
        },
        sad: {
          mood: 'sad',
          title: t('emotional.sadTitle'),
          description: t('emotional.sadRecommendation'),
          places: [
            {
              id: '7',
              name: 'Princes\' Islands',
              description: 'Peaceful islands with no cars, perfect for quiet reflection',
              distance: 15.0,
              rating: 4.8,
              tags: ['nature', 'peaceful', 'escape']
            },
            {
              id: '8',
              name: 'Çamlıca Hill',
              description: 'Hilltop park with calming views and fresh air',
              distance: 8.5,
              rating: 4.6,
              tags: ['views', 'nature', 'peaceful']
            },
            {
              id: '9',
              name: 'Turkish Bath (Hamam)',
              description: 'Traditional bath experience for relaxation and rejuvenation',
              distance: 1.2,
              rating: 4.5,
              tags: ['wellness', 'relaxing', 'cultural']
            }
          ],
          activities: [
            t('emotional.sadActivity1'),
            t('emotional.sadActivity2'),
            t('emotional.sadActivity3')
          ]
        },
        excited: {
          mood: 'excited',
          title: t('emotional.excitedTitle'),
          description: t('emotional.excitedRecommendation'),
          places: [
            {
              id: '10',
              name: 'Taksim Square',
              description: 'Bustling city center with shops, restaurants, and nightlife',
              distance: 3.2,
              rating: 4.3,
              tags: ['busy', 'nightlife', 'urban']
            },
            {
              id: '11',
              name: 'Aqua Florya',
              description: 'Modern shopping mall with an aquarium and entertainment',
              distance: 18.5,
              rating: 4.4,
              tags: ['shopping', 'entertainment', 'indoor']
            },
            {
              id: '12',
              name: 'Vialand Theme Park',
              description: 'Exciting theme park with rides and attractions',
              distance: 12.7,
              rating: 4.5,
              tags: ['fun', 'thrilling', 'entertainment']
            }
          ],
          activities: [
            t('emotional.excitedActivity1'),
            t('emotional.excitedActivity2'),
            t('emotional.excitedActivity3')
          ]
        },
        tired: {
          mood: 'tired',
          title: t('emotional.tiredTitle'),
          description: t('emotional.tiredRecommendation'),
          places: [
            {
              id: '13',
              name: 'Kilyos Beach',
              description: 'Relaxing beach with comfortable loungers and calm atmosphere',
              distance: 35.0,
              rating: 4.2,
              tags: ['beach', 'relaxing', 'nature']
            },
            {
              id: '14',
              name: 'Emirgan Park',
              description: 'Peaceful park with beautiful gardens and cafes',
              distance: 10.5,
              rating: 4.6,
              tags: ['nature', 'peaceful', 'relaxing']
            },
            {
              id: '15',
              name: 'Çinili Hamam',
              description: 'Historic Turkish bath for relaxation and rejuvenation',
              distance: 2.8,
              rating: 4.4,
              tags: ['wellness', 'relaxing', 'historical']
            }
          ],
          activities: [
            t('emotional.tiredActivity1'),
            t('emotional.tiredActivity2'),
            t('emotional.tiredActivity3')
          ]
        },
        romantic: {
          mood: 'romantic',
          title: t('emotional.romanticTitle'),
          description: t('emotional.romanticRecommendation'),
          places: [
            {
              id: '16',
              name: 'Maiden\'s Tower',
              description: 'Iconic tower with a romantic legend and beautiful views',
              distance: 4.5,
              rating: 4.7,
              tags: ['romantic', 'historical', 'views']
            },
            {
              id: '17',
              name: 'Pierre Loti Hill',
              description: 'Hilltop cafe with panoramic views, especially at sunset',
              distance: 7.2,
              rating: 4.6,
              tags: ['romantic', 'views', 'sunset']
            },
            {
              id: '18',
              name: 'Ortaköy',
              description: 'Charming neighborhood with waterfront restaurants',
              distance: 8.5,
              rating: 4.5,
              tags: ['romantic', 'dining', 'views']
            }
          ],
          activities: [
            t('emotional.romanticActivity1'),
            t('emotional.romanticActivity2'),
            t('emotional.romanticActivity3')
          ]
        },
        adventurous: {
          mood: 'adventurous',
          title: t('emotional.adventurousTitle'),
          description: t('emotional.adventurousRecommendation'),
          places: [
            {
              id: '19',
              name: 'Belgrad Forest',
              description: 'Vast forest with hiking trails and outdoor activities',
              distance: 25.0,
              rating: 4.7,
              tags: ['nature', 'hiking', 'adventure']
            },
            {
              id: '20',
              name: 'Rumeli Fortress',
              description: 'Historic fortress with challenging climbs and great views',
              distance: 12.5,
              rating: 4.6,
              tags: ['historical', 'adventure', 'views']
            },
            {
              id: '21',
              name: 'Caddebostan Beach',
              description: 'Beach with water sports and activities',
              distance: 15.8,
              rating: 4.3,
              tags: ['beach', 'sports', 'adventure']
            }
          ],
          activities: [
            t('emotional.adventurousActivity1'),
            t('emotional.adventurousActivity2'),
            t('emotional.adventurousActivity3')
          ]
        },
        relaxed: {
          mood: 'relaxed',
          title: t('emotional.relaxedTitle'),
          description: t('emotional.relaxedRecommendation'),
          places: [
            {
              id: '22',
              name: 'Büyükada',
              description: 'Largest of the Princes\' Islands with a laid-back atmosphere',
              distance: 20.0,
              rating: 4.8,
              tags: ['island', 'peaceful', 'nature']
            },
            {
              id: '23',
              name: 'Bebek Park',
              description: 'Waterfront park with cafes and walking paths',
              distance: 9.5,
              rating: 4.6,
              tags: ['waterfront', 'peaceful', 'walking']
            },
            {
              id: '24',
              name: 'Mihrabat Grove',
              description: 'Secluded grove with stunning Bosphorus views',
              distance: 14.2,
              rating: 4.7,
              tags: ['nature', 'views', 'peaceful']
            }
          ],
          activities: [
            t('emotional.relaxedActivity1'),
            t('emotional.relaxedActivity2'),
            t('emotional.relaxedActivity3')
          ]
        }
      };
      
      // Adjust recommendations based on weather and time of day
      let adjustedRecommendation = { ...moodRecommendations[selectedMood] };
      
      // Weather adjustments
      if (weather.condition === 'rainy') {
        adjustedRecommendation.description += ' ' + t('emotional.rainyAdjustment');
        // Filter for indoor places or add indoor alternatives
        const indoorAlternatives = [
          {
            id: '25',
            name: 'Istanbul Modern Art Museum',
            description: 'Contemporary art museum with Turkish and international works',
            distance: 2.3,
            rating: 4.5,
            tags: ['indoor', 'art', 'cultural']
          },
          {
            id: '26',
            name: 'Pera Museum',
            description: 'Museum with art collections in a historic building',
            distance: 3.1,
            rating: 4.6,
            tags: ['indoor', 'art', 'cultural']
          }
        ];
        
        // Add indoor alternatives to the beginning of the places array
        adjustedRecommendation.places = [
          ...indoorAlternatives,
          ...adjustedRecommendation.places.filter(place => place.tags.includes('indoor'))
        ].slice(0, 3);
      }
      
      // Time of day adjustments
      if (timeOfDay === 'evening') {
        adjustedRecommendation.description += ' ' + t('emotional.eveningAdjustment');
        // Add evening-appropriate activities
        adjustedRecommendation.activities.push(t('emotional.eveningActivity'));
      } else if (timeOfDay === 'morning') {
        adjustedRecommendation.description += ' ' + t('emotional.morningAdjustment');
        // Add morning-appropriate activities
        adjustedRecommendation.activities.push(t('emotional.morningActivity'));
      }
      
      setRecommendations(adjustedRecommendation);
      setLoading(false);
    }, 1000);
  }, [selectedMood, weather, timeOfDay, t]);
  
  // Weather icon based on condition
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-400" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };
  
  // Simulate weather change (in a real app, this would come from a weather API)
  const changeWeather = (condition: string) => {
    setWeather({
      ...weather,
      condition
    });
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('emotional.title')}</h2>
        <p className="text-gray-600 mb-6">{t('emotional.description')}</p>
        
        {/* Current Context */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-gray-900 mb-3">{t('emotional.currentContext')}</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-500" />
              <span>{t(`emotional.${timeOfDay}`)}</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2">{getWeatherIcon()}</div>
              <span>{t(`emotional.${weather.condition}`)}, {weather.temperature}°C</span>
            </div>
            
            {/* Weather selector (for demo purposes) */}
            <div className="ml-auto flex space-x-2">
              <button 
                onClick={() => changeWeather('sunny')}
                className={`p-2 rounded-full ${weather.condition === 'sunny' ? 'bg-yellow-100' : 'bg-gray-100'}`}
                title={t('emotional.sunny')}
              >
                <Sun className="h-5 w-5 text-yellow-500" />
              </button>
              <button 
                onClick={() => changeWeather('cloudy')}
                className={`p-2 rounded-full ${weather.condition === 'cloudy' ? 'bg-gray-200' : 'bg-gray-100'}`}
                title={t('emotional.cloudy')}
              >
                <Cloud className="h-5 w-5 text-gray-500" />
              </button>
              <button 
                onClick={() => changeWeather('rainy')}
                className={`p-2 rounded-full ${weather.condition === 'rainy' ? 'bg-blue-100' : 'bg-gray-100'}`}
                title={t('emotional.rainy')}
              >
                <CloudRain className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mood Selection */}
        <h3 className="font-medium text-gray-900 mb-3">{t('emotional.selectMood')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {moods.map(mood => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-4 rounded-lg flex flex-col items-center transition-colors ${
                selectedMood === mood.id
                  ? 'bg-blue-100 border-2 border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="mb-2">{mood.icon}</div>
              <div className="font-medium text-gray-900">{mood.label}</div>
              <div className="text-xs text-gray-500 text-center mt-1">{mood.description}</div>
            </button>
          ))}
        </div>
        
        {/* Recommendations */}
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-100 rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-24 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : recommendations ? (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{recommendations.title}</h3>
            <p className="text-gray-600 mb-6">{recommendations.description}</p>
            
            <h4 className="font-medium text-gray-900 mb-3">{t('emotional.recommendedPlaces')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {recommendations.places.map(place => (
                <div key={place.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    {place.image ? (
                      <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <h5 className="font-medium text-gray-900">{place.name}</h5>
                    <p className="text-gray-600 text-sm mb-2">{place.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {place.distance} km
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm">{place.rating}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {place.tags.map(tag => (
                        <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <h4 className="font-medium text-gray-900 mb-3">{t('emotional.recommendedActivities')}</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {recommendations.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
            
            <div className="mt-6 flex justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
                <Navigation className="h-5 w-5 mr-2" />
                {t('emotional.createRoute')}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
