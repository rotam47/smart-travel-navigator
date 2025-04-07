import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer, ResponsiveFlex, ResponsiveGrid } from './ResponsiveComponents';
import { 
  MapPin, Navigation, Clock, Calendar, Users, Filter, 
  Sun, Cloud, Umbrella, Coffee, Utensils, Camera, 
  Heart, Star, Trash2, Shuffle, Save, Share2
} from 'lucide-react';

interface Location {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  description?: string;
  category: string;
  rating: number;
  visitDuration: number; // in minutes
  openingHours: { open: string; close: string };
  crowdLevel: { morning: number; afternoon: number; evening: number };
  weatherSensitivity: number; // 0-10 scale, 10 being very sensitive (outdoor)
  image?: string;
  tags: string[];
}

interface RoutePreferences {
  startTime: string;
  endTime: string;
  pace: 'relaxed' | 'balanced' | 'efficient';
  prioritizeOutdoor: boolean;
  includeLunch: boolean;
  includeCoffeeBreak: boolean;
  avoidCrowds: boolean;
  maxWalkingDistance: number; // in kilometers
  interests: string[];
  mustVisit: string[]; // location IDs that must be included
}

interface OptimizedRoute {
  locations: Array<{
    location: Location;
    arrivalTime: string;
    departureTime: string;
    note?: string;
  }>;
  totalDistance: number;
  totalDuration: number;
  weatherAdapted: boolean;
  crowdOptimized: boolean;
}

export function AIRouteOptimizer() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [availableLocations, setAvailableLocations] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<RoutePreferences>({
    startTime: '09:00',
    endTime: '18:00',
    pace: 'balanced',
    prioritizeOutdoor: true,
    includeLunch: true,
    includeCoffeeBreak: true,
    avoidCrowds: true,
    maxWalkingDistance: 5,
    interests: [],
    mustVisit: []
  });
  const [optimizedRoutes, setOptimizedRoutes] = useState<OptimizedRoute[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [userMood, setUserMood] = useState<string>('happy');
  const [weather, setWeather] = useState<{condition: string; temperature: number}>({
    condition: 'sunny',
    temperature: 22
  });
  
  // Available interests for selection
  const availableInterests = [
    'history', 'architecture', 'art', 'nature', 'food', 
    'shopping', 'photography', 'religion', 'local', 'family'
  ];
  
  // Load available locations
  useEffect(() => {
    // In a real implementation, this would be an API call
    // Simulate API call with mock data
    setTimeout(() => {
      setAvailableLocations([
        {
          id: '1',
          name: 'Hagia Sophia',
          position: { lat: 41.0086, lng: 28.9802 },
          description: 'Historic museum and former church',
          category: 'historical',
          rating: 4.8,
          visitDuration: 120, // 2 hours
          openingHours: { open: '09:00', close: '17:00' },
          crowdLevel: { morning: 7, afternoon: 9, evening: 5 },
          weatherSensitivity: 3,
          tags: ['history', 'architecture', 'religion']
        },
        {
          id: '2',
          name: 'Blue Mosque',
          position: { lat: 41.0054, lng: 28.9768 },
          description: 'Historic mosque with blue tiles',
          category: 'historical',
          rating: 4.7,
          visitDuration: 60, // 1 hour
          openingHours: { open: '08:30', close: '18:30' },
          crowdLevel: { morning: 6, afternoon: 8, evening: 4 },
          weatherSensitivity: 3,
          tags: ['history', 'architecture', 'religion']
        },
        {
          id: '3',
          name: 'Topkapi Palace',
          position: { lat: 41.0115, lng: 28.9833 },
          description: 'Historic palace of Ottoman sultans',
          category: 'historical',
          rating: 4.6,
          visitDuration: 180, // 3 hours
          openingHours: { open: '09:00', close: '16:45' },
          crowdLevel: { morning: 5, afternoon: 8, evening: 3 },
          weatherSensitivity: 4,
          tags: ['history', 'architecture', 'art']
        },
        {
          id: '4',
          name: 'Grand Bazaar',
          position: { lat: 41.0108, lng: 28.9682 },
          description: 'One of the largest and oldest covered markets',
          category: 'shopping',
          rating: 4.4,
          visitDuration: 120, // 2 hours
          openingHours: { open: '08:30', close: '19:00' },
          crowdLevel: { morning: 6, afternoon: 9, evening: 7 },
          weatherSensitivity: 1,
          tags: ['shopping', 'local', 'food']
        },
        {
          id: '5',
          name: 'Basilica Cistern',
          position: { lat: 41.0084, lng: 28.9779 },
          description: 'Ancient underground water reservoir',
          category: 'historical',
          rating: 4.5,
          visitDuration: 60, // 1 hour
          openingHours: { open: '09:00', close: '17:30' },
          crowdLevel: { morning: 4, afternoon: 7, evening: 5 },
          weatherSensitivity: 0,
          tags: ['history', 'architecture']
        },
        {
          id: '6',
          name: 'Galata Tower',
          position: { lat: 41.0256, lng: 28.9741 },
          description: 'Medieval stone tower with panoramic views',
          category: 'landmark',
          rating: 4.5,
          visitDuration: 60, // 1 hour
          openingHours: { open: '09:00', close: '20:00' },
          crowdLevel: { morning: 5, afternoon: 8, evening: 9 },
          weatherSensitivity: 7,
          tags: ['architecture', 'photography', 'views']
        },
        {
          id: '7',
          name: 'Spice Bazaar',
          position: { lat: 41.0165, lng: 28.9704 },
          description: 'Historic market selling spices and Turkish delights',
          category: 'shopping',
          rating: 4.6,
          visitDuration: 60, // 1 hour
          openingHours: { open: '08:00', close: '19:00' },
          crowdLevel: { morning: 7, afternoon: 9, evening: 6 },
          weatherSensitivity: 1,
          tags: ['food', 'shopping', 'local']
        },
        {
          id: '8',
          name: 'Dolmabahce Palace',
          position: { lat: 41.0391, lng: 29.0008 },
          description: 'Ottoman palace with European architecture',
          category: 'historical',
          rating: 4.7,
          visitDuration: 150, // 2.5 hours
          openingHours: { open: '09:00', close: '16:00' },
          crowdLevel: { morning: 6, afternoon: 7, evening: 3 },
          weatherSensitivity: 4,
          tags: ['history', 'architecture', 'art']
        },
        {
          id: '9',
          name: 'Bosphorus Cruise',
          position: { lat: 41.0211, lng: 29.0011 },
          description: 'Scenic boat tour along the Bosphorus strait',
          category: 'activity',
          rating: 4.8,
          visitDuration: 120, // 2 hours
          openingHours: { open: '10:00', close: '18:00' },
          crowdLevel: { morning: 5, afternoon: 7, evening: 8 },
          weatherSensitivity: 9,
          tags: ['nature', 'photography', 'views']
        },
        {
          id: '10',
          name: 'Istanbul Archaeological Museums',
          position: { lat: 41.0116, lng: 28.9811 },
          description: 'Complex of three archaeological museums',
          category: 'museum',
          rating: 4.5,
          visitDuration: 120, // 2 hours
          openingHours: { open: '09:00', close: '17:00' },
          crowdLevel: { morning: 4, afternoon: 6, evening: 3 },
          weatherSensitivity: 1,
          tags: ['history', 'art', 'architecture']
        }
      ]);
    }, 500);
  }, []);
  
  // Toggle location selection
  const toggleLocationSelection = (locationId: string) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(selectedLocations.filter(id => id !== locationId));
    } else {
      setSelectedLocations([...selectedLocations, locationId]);
    }
  };
  
  // Toggle interest selection
  const toggleInterest = (interest: string) => {
    if (preferences.interests.includes(interest)) {
      setPreferences({
        ...preferences,
        interests: preferences.interests.filter(i => i !== interest)
      });
    } else {
      setPreferences({
        ...preferences,
        interests: [...preferences.interests, interest]
      });
    }
  };
  
  // Set must-visit locations
  const toggleMustVisit = (locationId: string) => {
    if (preferences.mustVisit.includes(locationId)) {
      setPreferences({
        ...preferences,
        mustVisit: preferences.mustVisit.filter(id => id !== locationId)
      });
    } else {
      setPreferences({
        ...preferences,
        mustVisit: [...preferences.mustVisit, locationId]
      });
    }
  };
  
  // Handle preference changes
  const handlePreferenceChange = (key: keyof RoutePreferences, value: any) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };
  
  // Optimize route based on preferences and selected locations
  const optimizeRoute = () => {
    setIsOptimizing(true);
    
    // In a real implementation, this would be an API call to a backend service
    // that uses AI algorithms to optimize the route
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Get selected location objects
      const locationsToVisit = availableLocations.filter(
        location => selectedLocations.includes(location.id)
      );
      
      // Create a base route (this would be much more sophisticated in a real implementation)
      const baseRoute: OptimizedRoute = {
        locations: [],
        totalDistance: 0,
        totalDuration: 0,
        weatherAdapted: weather.condition !== 'sunny',
        crowdOptimized: preferences.avoidCrowds
      };
      
      // Current time tracker
      let currentTime = preferences.startTime;
      
      // Add must-visit locations first
      const mustVisitLocations = locationsToVisit.filter(
        location => preferences.mustVisit.includes(location.id)
      );
      
      // Add remaining locations
      const otherLocations = locationsToVisit.filter(
        location => !preferences.mustVisit.includes(location.id)
      );
      
      // Sort other locations based on preferences
      otherLocations.sort((a, b) => {
        // If weather is bad, prioritize indoor locations
        if (weather.condition === 'rainy' && a.weatherSensitivity !== b.weatherSensitivity) {
          return a.weatherSensitivity - b.weatherSensitivity;
        }
        
        // If avoiding crowds, prioritize less crowded locations during their time slot
        if (preferences.avoidCrowds) {
          const timeOfDay = parseInt(currentTime.split(':')[0]) < 12 ? 'morning' : 
                           (parseInt(currentTime.split(':')[0]) < 17 ? 'afternoon' : 'evening');
          const crowdDiff = a.crowdLevel[timeOfDay] - b.crowdLevel[timeOfDay];
          if (crowdDiff !== 0) return crowdDiff;
        }
        
        // Prioritize locations matching user interests
        const aInterestMatch = a.tags.filter(tag => preferences.interests.includes(tag)).length;
        const bInterestMatch = b.tags.filter(tag => preferences.interests.includes(tag)).length;
        if (aInterestMatch !== bInterestMatch) return bInterestMatch - aInterestMatch;
        
        // Default to rating
        return b.rating - a.rating;
      });
      
      // Combine must-visit and other locations
      const orderedLocations = [...mustVisitLocations, ...otherLocations];
      
      // Add locations to route with time calculations
      let totalDistance = 0;
      let previousLocation = null;
      
      for (let i = 0; i < orderedLocations.length; i++) {
        const location = orderedLocations[i];
        
        // Calculate travel time from previous location (simplified)
        let travelTime = 0;
        if (previousLocation) {
          // Simple distance calculation (would be more complex in real implementation)
          const distance = Math.sqrt(
            Math.pow(location.position.lat - previousLocation.position.lat, 2) +
            Math.pow(location.position.lng - previousLocation.position.lng, 2)
          ) * 111; // Rough conversion to kilometers
          
          totalDistance += distance;
          
          // Assume 15 minutes per kilometer walking
          travelTime = Math.round(distance * 15);
        }
        
        // Add travel time to current time
        let arrivalTime = addMinutesToTime(currentTime, travelTime);
        
        // Check if location is open at arrival time
        const openTime = location.openingHours.open;
        const closeTime = location.openingHours.close;
        
        if (compareTime(arrivalTime, openTime) < 0) {
          // Arrived before opening, wait until opening
          arrivalTime = openTime;
        }
        
        // Calculate departure time
        let departureTime = addMinutesToTime(arrivalTime, location.visitDuration);
        
        // Check if we would leave after closing
        if (compareTime(departureTime, closeTime) > 0) {
          // Would leave after closing, adjust visit duration
          departureTime = closeTime;
        }
        
        // Add location to route
        baseRoute.locations.push({
          location,
          arrivalTime,
          departureTime,
          note: travelTime > 0 ? `${travelTime} min walk from previous location` : undefined
        });
        
        // Update current time for next location
        currentTime = departureTime;
        previousLocation = location;
        
        // Add breaks if needed
        if (preferences.includeLunch && 
            compareTime(currentTime, '12:00') >= 0 && 
            compareTime(currentTime, '14:00') <= 0 &&
            i < orderedLocations.length - 1) {
          // Add lunch break
          const lunchDuration = 60; // 1 hour
          const lunchDepartureTime = addMinutesToTime(currentTime, lunchDuration);
          
          baseRoute.locations.push({
            location: {
              id: 'lunch',
              name: t('route.lunchBreak'),
              position: location.position, // Use same position as last location
              category: 'break',
              rating: 0,
              visitDuration: lunchDuration,
              openingHours: { open: '00:00', close: '23:59' },
              crowdLevel: { morning: 0, afternoon: 0, evening: 0 },
              weatherSensitivity: 0,
              tags: ['food']
            },
            arrivalTime: currentTime,
            departureTime: lunchDepartureTime,
            note: t('route.lunchNote')
          });
          
          currentTime = lunchDepartureTime;
          preferences.includeLunch = false; // Ensure we only add one lunch
        }
        
        if (preferences.includeCoffeeBreak && 
            compareTime(currentTime, '15:00') >= 0 && 
            compareTime(currentTime, '17:00') <= 0 &&
            i < orderedLocations.length - 1) {
          // Add coffee break
          const coffeeDuration = 30; // 30 minutes
          const coffeeDepartureTime = addMinutesToTime(currentTime, coffeeDuration);
          
          baseRoute.locations.push({
            location: {
              id: 'coffee',
              name: t('route.coffeeBreak'),
              position: location.position, // Use same position as last location
              category: 'break',
              rating: 0,
              visitDuration: coffeeDuration,
              openingHours: { open: '00:00', close: '23:59' },
              crowdLevel: { morning: 0, afternoon: 0, evening: 0 },
              weatherSensitivity: 0,
              tags: ['food']
            },
            arrivalTime: currentTime,
            departureTime: coffeeDepartureTime,
            note: t('route.coffeeNote')
          });
          
          currentTime = coffeeDepartureTime;
          preferences.includeCoffeeBreak = false; // Ensure we only add one coffee break
        }
        
        // Check if we've exceeded end time
        if (compareTime(currentTime, preferences.endTime) > 0) {
          break;
        }
      }
      
      // Update total distance and duration
      baseRoute.totalDistance = parseFloat(totalDistance.toFixed(1));
      baseRoute.totalDuration = calculateTotalDuration(baseRoute.locations);
      
      // Create variations of the route (would be more sophisticated in real implementation)
      const alternativeRoute1 = createAlternativeRoute(baseRoute, 'weather');
      const alternativeRoute2 = createAlternativeRoute(baseRoute, 'crowd');
      
      setOptimizedRoutes([baseRoute, alternativeRoute1, alternativeRoute2]);
      setSelectedRouteIndex(0);
      setIsOptimizing(false);
      setStep(3);
    }, 2000);
  };
  
  // Helper function to add minutes to time string (HH:MM)
  const addMinutesToTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
  };
  
  // Helper function to compare times (returns negative if t1 < t2, 0 if equal, positive if t1 > t2)
  const compareTime = (t1: string, t2: string): number => {
    const [h1, m1] = t1.split(':').map(Number);
    const [h2, m2] = t2.split(':').map(Number);
    if (h1 !== h2) return h1 - h2;
    return m1 - m2;
  };
  
  // Helper function to calculate total duration of a route in minutes
  const calculateTotalDuration = (locations: OptimizedRoute['locations']): number => {
    if (locations.length === 0) return 0;
    
    const firstArrival = locations[0].arrivalTime;
    const lastDeparture = locations[locations.length - 1].departureTime;
    
    const [firstHours, firstMins] = firstArrival.split(':').map(Number);
    const [lastHours, lastMins] = lastDeparture.split(':').map(Number);
    
    const firstTotalMins = firstHours * 60 + firstMins;
    const lastTotalMins = lastHours * 60 + lastMins;
    
    return lastTotalMins - firstTotalMins;
  };
  
  // Helper function to create alternative routes (simplified)
  const createAlternativeRoute = (baseRoute: OptimizedRoute, focus: 'weather' | 'crowd'): OptimizedRoute => {
    // Clone the base route
    const newRoute: OptimizedRoute = JSON.parse(JSON.stringify(baseRoute));
    
    // Get only actual locations (no breaks)
    const actualLocations = newRoute.locations.filter(item => item.location.id !== 'lunch' && item.location.id !== 'coffee');
    
    // Shuffle middle locations (keep first and last fixed)
    if (actualLocations.length > 3) {
      const middleLocations = actualLocations.slice(1, -1);
      
      if (focus === 'weather' && weather.condition === 'rainy') {
        // Sort by weather sensitivity (indoor first)
        middleLocations.sort((a, b) => a.location.weatherSensitivity - b.location.weatherSensitivity);
        newRoute.weatherAdapted = true;
      } else if (focus === 'crowd') {
        // Sort by crowd level for the time of day
        middleLocations.sort((a, b) => {
          const timeOfDay = parseInt(a.arrivalTime.split(':')[0]) < 12 ? 'morning' : 
                           (parseInt(a.arrivalTime.split(':')[0]) < 17 ? 'afternoon' : 'evening');
          return a.location.crowdLevel[timeOfDay] - b.location.crowdLevel[timeOfDay];
        });
        newRoute.crowdOptimized = true;
      }
      
      // Replace the middle locations in the route
      const breaks = newRoute.locations.filter(item => item.location.id === 'lunch' || item.location.id === 'coffee');
      newRoute.locations = [
        actualLocations[0],
        ...middleLocations,
        actualLocations[actualLocations.length - 1],
        ...breaks
      ];
      
      // Sort by arrival time to maintain chronological order
      newRoute.locations.sort((a, b) => compareTime(a.arrivalTime, b.arrivalTime));
    }
    
    return newRoute;
  };
  
  // Render step 1: Select locations
  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t('route.selectLocations')}</h2>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-medium">{t('route.filterByInterests')}</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {availableInterests.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-1 rounded-full text-sm ${
                preferences.interests.includes(interest)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(`interests.${interest}`)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {availableLocations
          .filter(location => 
            preferences.interests.length === 0 || 
            location.tags.some(tag => preferences.interests.includes(tag))
          )
          .map(location => (
            <div 
              key={location.id}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedLocations.includes(location.id)
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => toggleLocationSelection(location.id)}
            >
              <div className="relative h-40 bg-gray-200">
                {/* This would be a real image in production */}
                <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
                  <MapPin className="h-8 w-8 text-blue-400" />
                </div>
                
                {selectedLocations.includes(location.id) && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {preferences.mustVisit.includes(location.id) && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white rounded-full p-1">
                    <Star className="h-5 w-5" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{location.visitDuration} {t('route.minutes')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{location.rating}</span>
                </div>
              </div>
              
              {selectedLocations.includes(location.id) && (
                <div className="px-4 pb-4 pt-0 flex justify-between">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMustVisit(location.id);
                    }}
                    className={`text-sm flex items-center ${
                      preferences.mustVisit.includes(location.id)
                        ? 'text-yellow-600'
                        : 'text-gray-600 hover:text-yellow-600'
                    }`}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    {preferences.mustVisit.includes(location.id) 
                      ? t('route.mustVisit') 
                      : t('route.markMustVisit')}
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      
      <div className="flex justify-between">
        <div>
          <span className="text-gray-700">
            {t('route.selected')}: {selectedLocations.length} {t('route.locations')}
          </span>
        </div>
        <button
          onClick={() => setStep(2)}
          disabled={selectedLocations.length < 2}
          className={`px-6 py-2 rounded-md font-medium ${
            selectedLocations.length < 2
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {t('route.next')}
        </button>
      </div>
    </div>
  );
  
  // Render step 2: Set preferences
  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t('route.setPreferences')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('route.startTime')}
            </label>
            <input
              type="time"
              value={preferences.startTime}
              onChange={(e) => handlePreferenceChange('startTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('route.endTime')}
            </label>
            <input
              type="time"
              value={preferences.endTime}
              onChange={(e) => handlePreferenceChange('endTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('route.pace')}
            </label>
            <select
              value={preferences.pace}
              onChange={(e) => handlePreferenceChange('pace', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relaxed">{t('route.relaxed')}</option>
              <option value="balanced">{t('route.balanced')}</option>
              <option value="efficient">{t('route.efficient')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('route.maxWalkingDistance')} (km)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={preferences.maxWalkingDistance}
              onChange={(e) => handlePreferenceChange('maxWalkingDistance', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 km</span>
              <span>{preferences.maxWalkingDistance} km</span>
              <span>10 km</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('route.currentMood')}
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setUserMood('happy')}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  userMood === 'happy' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-2xl mb-1">😊</span>
                <span className="text-sm">{t('mood.happy')}</span>
              </button>
              <button
                onClick={() => setUserMood('energetic')}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  userMood === 'energetic' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-2xl mb-1">⚡</span>
                <span className="text-sm">{t('mood.energetic')}</span>
              </button>
              <button
                onClick={() => setUserMood('relaxed')}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  userMood === 'relaxed' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-2xl mb-1">😌</span>
                <span className="text-sm">{t('mood.relaxed')}</span>
              </button>
              <button
                onClick={() => setUserMood('tired')}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  userMood === 'tired' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-2xl mb-1">😴</span>
                <span className="text-sm">{t('mood.tired')}</span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('route.weatherForecast')}
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setWeather({condition: 'sunny', temperature: 22})}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  weather.condition === 'sunny' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <Sun className="h-6 w-6 text-yellow-500 mb-1" />
                <span className="text-sm">{t('weather.sunny')}</span>
              </button>
              <button
                onClick={() => setWeather({condition: 'cloudy', temperature: 18})}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  weather.condition === 'cloudy' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <Cloud className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-sm">{t('weather.cloudy')}</span>
              </button>
              <button
                onClick={() => setWeather({condition: 'rainy', temperature: 15})}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  weather.condition === 'rainy' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <Umbrella className="h-6 w-6 text-blue-500 mb-1" />
                <span className="text-sm">{t('weather.rainy')}</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeLunch"
                checked={preferences.includeLunch}
                onChange={(e) => handlePreferenceChange('includeLunch', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeLunch" className="ml-2 block text-sm text-gray-700">
                <div className="flex items-center">
                  <Utensils className="h-4 w-4 mr-1 text-gray-500" />
                  {t('route.includeLunch')}
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeCoffeeBreak"
                checked={preferences.includeCoffeeBreak}
                onChange={(e) => handlePreferenceChange('includeCoffeeBreak', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeCoffeeBreak" className="ml-2 block text-sm text-gray-700">
                <div className="flex items-center">
                  <Coffee className="h-4 w-4 mr-1 text-gray-500" />
                  {t('route.includeCoffeeBreak')}
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="prioritizeOutdoor"
                checked={preferences.prioritizeOutdoor}
                onChange={(e) => handlePreferenceChange('prioritizeOutdoor', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="prioritizeOutdoor" className="ml-2 block text-sm text-gray-700">
                <div className="flex items-center">
                  <Sun className="h-4 w-4 mr-1 text-gray-500" />
                  {t('route.prioritizeOutdoor')}
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="avoidCrowds"
                checked={preferences.avoidCrowds}
                onChange={(e) => handlePreferenceChange('avoidCrowds', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="avoidCrowds" className="ml-2 block text-sm text-gray-700">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  {t('route.avoidCrowds')}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-2 rounded-md font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {t('route.back')}
        </button>
        <button
          onClick={optimizeRoute}
          className="px-6 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700"
        >
          {t('route.optimizeRoute')}
        </button>
      </div>
    </div>
  );
  
  // Render step 3: View optimized routes
  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t('route.optimizedRoutes')}</h2>
      
      {isOptimizing ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">{t('route.optimizing')}</p>
        </div>
      ) : (
        <>
          {/* Route Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {optimizedRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() => setSelectedRouteIndex(index)}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  selectedRouteIndex === index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {index === 0 ? t('route.balanced') : 
                 index === 1 ? (route.weatherAdapted ? t('route.weatherOptimized') : t('route.alternative1')) : 
                 index === 2 ? (route.crowdOptimized ? t('route.crowdOptimized') : t('route.alternative2')) : 
                 t('route.alternative') + (index + 1)}
              </button>
            ))}
          </div>
          
          {/* Selected Route */}
          {optimizedRoutes.length > 0 && (
            <div>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    <span>
                      <span className="font-medium">{Math.floor(optimizedRoutes[selectedRouteIndex].totalDuration / 60)}</span> {t('route.hours')} <span className="font-medium">{optimizedRoutes[selectedRouteIndex].totalDuration % 60}</span> {t('route.minutes')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    <span>
                      <span className="font-medium">{optimizedRoutes[selectedRouteIndex].totalDistance}</span> {t('route.kilometers')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    <span>
                      <span className="font-medium">{optimizedRoutes[selectedRouteIndex].locations.filter(item => 
                        item.location.id !== 'lunch' && item.location.id !== 'coffee'
                      ).length}</span> {t('route.locations')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Timeline */}
              <div className="relative border-l-2 border-gray-200 ml-3 pl-8 pb-2 mb-6">
                {optimizedRoutes[selectedRouteIndex].locations.map((item, index) => (
                  <div key={index} className="mb-8 relative">
                    <div className={`absolute -left-10 mt-1.5 w-5 h-5 rounded-full ${
                      item.location.id === 'lunch' || item.location.id === 'coffee'
                        ? 'bg-yellow-500'
                        : index === 0
                          ? 'bg-green-500'
                          : index === optimizedRoutes[selectedRouteIndex].locations.length - 1
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                    }`}></div>
                    
                    <div className="flex items-start">
                      <div className="min-w-24 text-sm text-gray-500 mr-4">
                        {item.arrivalTime} - {item.departureTime}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{item.location.name}</div>
                        {item.location.description && (
                          <div className="text-gray-700 text-sm">{item.location.description}</div>
                        )}
                        {item.note && (
                          <div className="text-gray-500 text-sm mt-1">{item.note}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
                  <Navigation className="h-5 w-5 mr-2" />
                  {t('route.startNavigation')}
                </button>
                <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
                  <Save className="h-5 w-5 mr-2" />
                  {t('route.saveRoute')}
                </button>
                <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
                  <Share2 className="h-5 w-5 mr-2" />
                  {t('route.shareRoute')}
                </button>
                <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
                  <Shuffle className="h-5 w-5 mr-2" />
                  {t('route.regenerate')}
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 rounded-md font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              {t('route.back')}
            </button>
          </div>
        </>
      )}
    </div>
  );
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stepNumber < step
                      ? 'bg-blue-600 text-white'
                      : stepNumber === step
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepNumber < step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="text-sm mt-2 text-gray-600">
                  {stepNumber === 1 && t('route.selectLocations')}
                  {stepNumber === 2 && t('route.preferences')}
                  {stepNumber === 3 && t('route.results')}
                </div>
              </div>
              
              {stepNumber < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  stepNumber < step ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}
