import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer } from './ResponsiveComponents';
import { Map, Navigation, Compass, MapPin, Clock, Users, Sun, Cloud, Umbrella } from 'lucide-react';

interface SmartLocationOrderingProps {
  className?: string;
}

export function SmartLocationOrderingComponent({ className = '' }: SmartLocationOrderingProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('nearby');
  const [loading, setLoading] = useState(false);
  const [optimizationCriteria, setOptimizationCriteria] = useState({
    distance: true,
    crowdLevel: true,
    weather: true,
    openingHours: true,
    userPreferences: true
  });
  
  // Sample locations data
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: 'Hagia Sophia',
      distance: 0.3,
      estimatedTime: 90,
      crowdLevel: 'high',
      openNow: true,
      weather: 'sunny',
      category: 'historical',
      rating: 4.8,
      mustSee: true
    },
    {
      id: 2,
      name: 'Blue Mosque',
      distance: 0.5,
      estimatedTime: 60,
      crowdLevel: 'medium',
      openNow: true,
      weather: 'sunny',
      category: 'religious',
      rating: 4.7,
      mustSee: true
    },
    {
      id: 3,
      name: 'Topkapi Palace',
      distance: 0.8,
      estimatedTime: 120,
      crowdLevel: 'medium',
      openNow: true,
      weather: 'sunny',
      category: 'historical',
      rating: 4.6,
      mustSee: false
    },
    {
      id: 4,
      name: 'Grand Bazaar',
      distance: 1.2,
      estimatedTime: 90,
      crowdLevel: 'high',
      openNow: true,
      weather: 'indoor',
      category: 'shopping',
      rating: 4.5,
      mustSee: false
    },
    {
      id: 5,
      name: 'Basilica Cistern',
      distance: 0.4,
      estimatedTime: 45,
      crowdLevel: 'low',
      openNow: true,
      weather: 'indoor',
      category: 'historical',
      rating: 4.6,
      mustSee: false
    },
    {
      id: 6,
      name: 'Spice Bazaar',
      distance: 1.5,
      estimatedTime: 60,
      crowdLevel: 'high',
      openNow: true,
      weather: 'indoor',
      category: 'shopping',
      rating: 4.4,
      mustSee: false
    },
    {
      id: 7,
      name: 'Galata Tower',
      distance: 2.1,
      estimatedTime: 45,
      crowdLevel: 'medium',
      openNow: true,
      weather: 'sunny',
      category: 'viewpoint',
      rating: 4.5,
      mustSee: false
    },
    {
      id: 8,
      name: 'Dolmabahçe Palace',
      distance: 4.3,
      estimatedTime: 120,
      crowdLevel: 'low',
      openNow: true,
      weather: 'sunny',
      category: 'historical',
      rating: 4.7,
      mustSee: false
    }
  ]);
  
  // Optimize locations based on selected criteria
  const optimizeLocations = () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let optimizedLocations = [...locations];
      
      // Apply different optimization strategies based on active tab
      if (activeTab === 'nearby') {
        // Sort by distance
        optimizedLocations.sort((a, b) => a.distance - b.distance);
      } else if (activeTab === 'efficient') {
        // Sort by a combination of distance and time
        optimizedLocations.sort((a, b) => {
          const scoreA = a.distance * 0.5 + (a.estimatedTime / 60) * 0.5;
          const scoreB = b.distance * 0.5 + (b.estimatedTime / 60) * 0.5;
          return scoreA - scoreB;
        });
      } else if (activeTab === 'weather') {
        // Prioritize indoor locations if weather is bad, otherwise sort by distance
        const weatherScore = (loc) => {
          if (loc.weather === 'indoor') return 0;
          if (loc.weather === 'sunny') return 1;
          return 2;
        };
        
        optimizedLocations.sort((a, b) => {
          const scoreA = weatherScore(a) * 2 + a.distance * 0.5;
          const scoreB = weatherScore(b) * 2 + b.distance * 0.5;
          return scoreA - scoreB;
        });
      } else if (activeTab === 'crowd') {
        // Sort by crowd level and then by distance
        const crowdScore = (level) => {
          if (level === 'low') return 0;
          if (level === 'medium') return 1;
          return 2;
        };
        
        optimizedLocations.sort((a, b) => {
          const scoreA = crowdScore(a.crowdLevel) * 2 + a.distance * 0.5;
          const scoreB = crowdScore(b.crowdLevel) * 2 + b.distance * 0.5;
          return scoreA - scoreB;
        });
      }
      
      // Always prioritize "must see" locations
      optimizedLocations.sort((a, b) => {
        if (a.mustSee && !b.mustSee) return -1;
        if (!a.mustSee && b.mustSee) return 1;
        return 0;
      });
      
      setLocations(optimizedLocations);
      setLoading(false);
    }, 1000);
  };
  
  // Trigger optimization when tab changes
  useEffect(() => {
    optimizeLocations();
  }, [activeTab, optimizationCriteria]);
  
  // Toggle optimization criteria
  const toggleCriteria = (criterion) => {
    setOptimizationCriteria(prev => ({
      ...prev,
      [criterion]: !prev[criterion]
    }));
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('nearby')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'nearby' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MapPin className="h-4 w-4 inline mr-1" />
            {t('locations.nearbyTab')}
          </button>
          <button 
            onClick={() => setActiveTab('efficient')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'efficient' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Clock className="h-4 w-4 inline mr-1" />
            {t('locations.efficientTab')}
          </button>
          <button 
            onClick={() => setActiveTab('weather')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'weather' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Sun className="h-4 w-4 inline mr-1" />
            {t('locations.weatherTab')}
          </button>
          <button 
            onClick={() => setActiveTab('crowd')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'crowd' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-1" />
            {t('locations.crowdTab')}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('locations.optimizationTitle')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('locations.optimizationDescription')}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">
            {t('locations.optimizationCriteria')}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                id="criteria-distance"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={optimizationCriteria.distance}
                onChange={() => toggleCriteria('distance')}
              />
              <label htmlFor="criteria-distance" className="ml-2 block text-sm text-gray-700">
                {t('locations.distanceCriteria')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="criteria-crowd"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={optimizationCriteria.crowdLevel}
                onChange={() => toggleCriteria('crowdLevel')}
              />
              <label htmlFor="criteria-crowd" className="ml-2 block text-sm text-gray-700">
                {t('locations.crowdCriteria')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="criteria-weather"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={optimizationCriteria.weather}
                onChange={() => toggleCriteria('weather')}
              />
              <label htmlFor="criteria-weather" className="ml-2 block text-sm text-gray-700">
                {t('locations.weatherCriteria')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="criteria-hours"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={optimizationCriteria.openingHours}
                onChange={() => toggleCriteria('openingHours')}
              />
              <label htmlFor="criteria-hours" className="ml-2 block text-sm text-gray-700">
                {t('locations.hoursCriteria')}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="criteria-preferences"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={optimizationCriteria.userPreferences}
                onChange={() => toggleCriteria('userPreferences')}
              />
              <label htmlFor="criteria-preferences" className="ml-2 block text-sm text-gray-700">
                {t('locations.preferencesCriteria')}
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">
              {t('locations.optimizedResults')}
            </h4>
            
            <button
              onClick={optimizeLocations}
              disabled={loading}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('locations.optimizing')}
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  {t('locations.reoptimize')}
                </>
              )}
            </button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {locations.map((location, index) => (
                <li key={location.id} className={`p-4 hover:bg-gray-50 ${location.mustSee ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium text-gray-900">
                          {location.name}
                          {location.mustSee && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {t('locations.mustSee')}
                            </span>
                          )}
                        </h5>
                        
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">
                            {location.rating}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`h-4 w-4 ${i < Math.floor(location.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {location.distance} km
                        </div>
                        
                        <div className="flex items-center mr-4">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {location.estimatedTime} min
                        </div>
                        
                        <div className="flex items-center mr-4">
                          <Users className="h-4 w-4 mr-1 text-gray-400" />
                          <span className={`
                            ${location.crowdLevel === 'low' ? 'text-green-600' : ''}
                            ${location.crowdLevel === 'medium' ? 'text-yellow-600' : ''}
                            ${location.crowdLevel === 'high' ? 'text-red-600' : ''}
                          `}>
                            {t(`locations.crowd.${location.crowdLevel}`)}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          {location.weather === 'sunny' && <Sun className="h-4 w-4 mr-1 text-yellow-500" />}
                          {location.weather === 'cloudy' && <Cloud className="h-4 w-4 mr-1 text-gray-500" />}
                          {location.weather === 'rainy' && <Umbrella className="h-4 w-4 mr-1 text-blue-500" />}
                          {location.weather === 'indoor' && <Home className="h-4 w-4 mr-1 text-purple-500" />}
                          {t(`locations.weather.${location.weather}`)}
                        </div>
                      </div>
                      
                      <div className="mt-2 flex justify-between items-center">
                        <span className={`text-xs ${location.openNow ? 'text-green-600' : 'text-red-600'}`}>
                          {location.openNow ? t('locations.openNow') : t('locations.closed')}
                        </span>
                        
                        <div>
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {t('locations.details')}
                          </button>
                          <button className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {t('locations.addToRoute')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">
                {t('locations.aiPowered')}
              </h4>
              <p className="mt-1 text-sm text-blue-700">
                {t('locations.aiPoweredDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
