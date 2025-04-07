import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer } from './ResponsiveComponents';
import { MapComponent } from './MapComponent';
import { Search, Navigation, MapPin, Clock, Calendar, Users, Filter, Compass, X, DollarSign, Star } from 'lucide-react';

interface RoutePoint {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  description?: string;
  type: 'start' | 'destination' | 'waypoint';
  sponsored?: boolean;
}

interface POI {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  description?: string;
  distance: number;
  direction: number; // in degrees
  category?: string;
  sponsored?: boolean;
}

export function ARNavigationComponent() {
  const { t } = useI18n();
  const [arMode, setArMode] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [nearbyPOIs, setNearbyPOIs] = useState<POI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState<number>(0);
  const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientationEvent | null>(null);
  const [devicePosition, setDevicePosition] = useState<GeolocationPosition | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Request camera permission for AR
  const requestCameraPermission = async () => {
    try {
      setIsLoading(true);
      
      // Request device orientation permission
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState !== 'granted') {
          throw new Error('Device orientation permission not granted');
        }
      }
      
      // Request geolocation permission
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setDevicePosition(position);
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      }
      
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Set video stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraPermission(true);
      setIsLoading(false);
      
      // Start AR mode after permissions are granted
      setArMode(true);
      
      // Show ad after 10 seconds in AR mode
      setTimeout(() => {
        setShowAd(true);
        // Hide ad after 5 seconds
        setTimeout(() => {
          setShowAd(false);
        }, 5000);
      }, 10000);
      
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setCameraPermission(false);
      setIsLoading(false);
    }
  };
  
  // Toggle AR mode
  const toggleARMode = () => {
    if (!arMode && cameraPermission === null) {
      requestCameraPermission();
    } else if (cameraPermission) {
      setArMode(!arMode);
      
      // If turning off AR mode, stop the video stream
      if (arMode && videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };
  
  // Handle device orientation changes
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setDeviceOrientation(event);
    };
    
    window.addEventListener('deviceorientation', handleOrientation);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);
  
  // Handle geolocation updates
  useEffect(() => {
    let watchId: number;
    
    if (arMode && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setDevicePosition(position);
        },
        (error) => {
          console.error('Error watching position:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 20000
        }
      );
    }
    
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [arMode]);
  
  // Draw AR overlays on canvas
  useEffect(() => {
    if (!arMode || !canvasRef.current || !deviceOrientation || !devicePosition) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match video
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get current position
    const currentLat = devicePosition.coords.latitude;
    const currentLng = devicePosition.coords.longitude;
    
    // Get device orientation
    const heading = deviceOrientation.alpha || 0; // compass direction
    const pitch = deviceOrientation.beta || 0; // up/down
    const roll = deviceOrientation.gamma || 0; // left/right
    
    // Draw POIs and route points
    const drawPoints = [...nearbyPOIs, ...route.map(point => ({
      id: point.id,
      name: point.name,
      position: point.position,
      description: point.description,
      distance: calculateDistance(currentLat, currentLng, point.position.lat, point.position.lng),
      direction: calculateBearing(currentLat, currentLng, point.position.lat, point.position.lng),
      sponsored: point.sponsored
    }))];
    
    drawPoints.forEach(point => {
      // Calculate if point is in current view based on heading
      const relativeBearing = ((point.direction - heading) + 360) % 360;
      
      // Only show points in a 120-degree field of view
      if (relativeBearing > 300 || relativeBearing < 60) {
        // Calculate horizontal position based on bearing
        const x = canvas.width / 2 + (relativeBearing - 0) * (canvas.width / 120);
        
        // Calculate vertical position based on distance (closer = lower)
        const y = canvas.height / 2 + (pitch - 45) * 10;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, point.sponsored ? 15 : 10, 0, 2 * Math.PI);
        ctx.fillStyle = point.sponsored ? '#FFD700' : '#3B82F6';
        ctx.fill();
        
        // Draw text
        ctx.font = point.sponsored ? 'bold 16px Arial' : '14px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(point.name, x, y - 20);
        
        // Draw distance
        ctx.font = '12px Arial';
        ctx.fillText(`${point.distance.toFixed(1)}m`, x, y + 25);
        
        // Add sponsor indicator
        if (point.sponsored) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(x + 25, y - 25, 8, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.font = 'bold 12px Arial';
          ctx.fillText('$', x + 25, y - 21);
        }
      }
    });
    
    // Draw compass
    drawCompass(ctx, canvas.width - 60, 60, heading);
    
  }, [arMode, deviceOrientation, devicePosition, route, nearbyPOIs]);
  
  // Draw compass
  const drawCompass = (ctx: CanvasRenderingContext2D, x: number, y: number, heading: number) => {
    const radius = 30;
    
    // Draw outer circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();
    
    // Draw inner circle
    ctx.beginPath();
    ctx.arc(x, y, radius - 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Draw north indicator
    const northAngle = (360 - heading) * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.sin(northAngle) * (radius - 10),
      y - Math.cos(northAngle) * (radius - 10)
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    
    // Draw south indicator
    const southAngle = (180 - heading) * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.sin(southAngle) * (radius - 15),
      y - Math.cos(southAngle) * (radius - 15)
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
    // Draw cardinal directions
    ctx.font = '10px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('N', x, y - radius + 15);
    ctx.fillText('S', x, y + radius - 5);
    ctx.fillText('E', x + radius - 10, y + 5);
    ctx.fillText('W', x - radius + 10, y + 5);
  };
  
  // Calculate distance between two points in meters
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c;
  };
  
  // Calculate bearing between two points in degrees
  const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    
    const θ = Math.atan2(y, x);
    
    return (θ * 180 / Math.PI + 360) % 360;
  };
  
  // Sample route data
  useEffect(() => {
    // In a real implementation, this would come from an API or user input
    setRoute([
      {
        id: '1',
        name: 'Current Location',
        position: { lat: 41.0082, lng: 28.9784 },
        type: 'start'
      },
      {
        id: '2',
        name: 'Hagia Sophia',
        position: { lat: 41.0086, lng: 28.9802 },
        description: 'Historic museum and former church',
        type: 'waypoint'
      },
      {
        id: '3',
        name: 'Blue Mosque',
        position: { lat: 41.0054, lng: 28.9768 },
        description: 'Historic mosque with blue tiles',
        type: 'waypoint'
      },
      {
        id: '4',
        name: 'Topkapi Palace',
        position: { lat: 41.0115, lng: 28.9833 },
        description: 'Historic palace of Ottoman sultans',
        type: 'destination'
      },
      {
        id: '5',
        name: 'Istanbul Kebab House',
        position: { lat: 41.0095, lng: 28.9810 },
        description: 'Best kebabs in Istanbul - Special Offer!',
        type: 'waypoint',
        sponsored: true
      }
    ]);
    
    // Set nearby points of interest
    setNearbyPOIs([
      {
        id: 'poi1',
        name: 'Grand Bazaar',
        position: { lat: 41.0104, lng: 28.9679 },
        description: 'One of the largest and oldest covered markets',
        distance: 850,
        direction: 240
      },
      {
        id: 'poi2',
        name: 'Spice Bazaar',
        position: { lat: 41.0165, lng: 28.9704 },
        description: 'Historic spice market',
        distance: 650,
        direction: 320
      },
      {
        id: 'poi3',
        name: 'Luxury Hotel Istanbul',
        position: { lat: 41.0072, lng: 28.9770 },
        description: 'Special rates for app users - 20% OFF!',
        distance: 300,
        direction: 180,
        sponsored: true
      },
      {
        id: 'poi4',
        name: 'Istanbul Tours',
        position: { lat: 41.0090, lng: 28.9750 },
        description: 'Book guided tours - Exclusive discount!',
        distance: 400,
        direction: 220,
        sponsored: true
      }
    ]);
  }, []);
  
  // Ads rotation
  const ads = [
    {
      title: 'Istanbul Luxury Hotel',
      description: 'Special 20% discount for Compass Navigator users!',
      cta: 'Book Now'
    },
    {
      title: 'Istanbul Food Tours',
      description: 'Discover the best local cuisine with our guided tours',
      cta: 'Learn More'
    },
    {
      title: 'Premium Upgrade',
      description: 'Unlock all features and remove ads with Compass Premium',
      cta: 'Upgrade'
    }
  ];
  
  // Rotate ads
  useEffect(() => {
    if (showAd) {
      const interval = setInterval(() => {
        setCurrentAd((prev) => (prev + 1) % ads.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [showAd, ads.length]);
  
  return (
    <div className="relative">
      {/* Map View */}
      <div className={`transition-opacity duration-500 ${arMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <MapComponent 
          height="calc(100vh - 200px)"
          initialCenter={{ lat: 41.0082, lng: 28.9784 }}
          initialZoom={15}
          markers={route.map(point => ({
            position: point.position,
            title: point.name,
            description: point.description,
            sponsored: point.sponsored
          }))}
          className="rounded-lg shadow-lg"
        />
      </div>
      
      {/* AR View */}
      {arMode && (
        <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          {/* Video feed from camera */}
          <video 
            ref={videoRef}
            autoPlay 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Canvas for AR overlays */}
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
          
          {/* Sponsored Ad Banner */}
          {showAd && (
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-xs text-yellow-500 font-medium">Sponsored</span>
                  </div>
                  <h4 className="font-bold text-gray-800">{ads[currentAd].title}</h4>
                  <p className="text-sm text-gray-600">{ads[currentAd].description}</p>
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded">
                    {ads[currentAd].cta}
                  </button>
                </div>
                <button 
                  onClick={() => setShowAd(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          
          {/* AR Instructions */}
          <div className="absolute top-4 left-4 right-4 bg-black bg-opacity-50 rounded-lg p-3 text-white text-sm">
            <p>{t('ar.moveDeviceInstructions')}</p>
          </div>
        </div>
      )}
      
      {/* AR Toggle Button */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={toggleARMode}
          disabled={isLoading || cameraPermission === false}
          className={`px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 ${
            arMode 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
          } ${
            (isLoading || cameraPermission === false) 
              ? 'opacity-50 cursor-not-allowed' 
              : ''
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>{t('ar.loading')}</span>
            </>
          ) : (
            <>
              <span className="text-lg">
                {arMode ? '🗺️' : '📱'}
              </span>
              <span>{arMode ? t('ar.mapView') : t('ar.arView')}</span>
            </>
          )}
        </button>
      </div>
      
      {/* Route Information Panel */}
      <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Navigation className="h-5 w-5 mr-2 text-blue-600" />
          {t('ar.routeInformation')}
        </h3>
        
        <div className="space-y-4">
          {/* Route Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-500" />
              <span>45 {t('ar.minutes')}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
              <span>3.2 {t('ar.kilometers')}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              <span>{t('ar.bestTime')}: {t('ar.morning')}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-gray-500" />
              <span>{t('ar.crowdLevel')}: {t('ar.moderate')}</span>
            </div>
          </div>
          
          {/* Route Points */}
          <div className="space-y-2">
            {route.map((point, index) => (
              <div key={point.id} className="flex items-start">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3
                  ${point.type === 'start' ? 'bg-green-500' : 
                    point.type === 'destination' ? 'bg-red-500' : 
                    point.sponsored ? 'bg-yellow-500' : 'bg-blue-500'} 
                  text-white font-bold
                `}>
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <div className="font-medium">{point.name}</div>
                    {point.sponsored && (
                      <div className="ml-2 flex items-center text-yellow-500 text-xs">
                        <DollarSign className="h-3 w-3 mr-1" />
                        <span>Sponsored</span>
                      </div>
                    )}
                  </div>
                  {point.description && (
                    <div className="text-sm text-gray-600">{point.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Sponsored Recommendations */}
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-medium text-gray-800">{t('ar.recommendations')}</h4>
            </div>
            <div className="text-sm text-gray-700">
              <p>{t('ar.recommendedStop')}: <span className="font-medium">Istanbul Kebab House</span> - {t('ar.onYourRoute')}</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium">
                {t('ar.addToRoute')}
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
              <Navigation className="h-5 w-5 mr-2" />
              {t('ar.startNavigation')}
            </button>
            <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              {t('ar.modifyRoute')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
