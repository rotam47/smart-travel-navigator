import React from 'react';
import { Button } from './ui/button';
import { Calendar, Clock, MapPin, Navigation, Compass, Users, Zap } from 'lucide-react';

export const CulturalTimeMachine: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center">
          <Clock className="h-7 w-7 mr-3" />
          Kültürel Zaman Makinesi
        </h3>
        <p className="mt-2 text-purple-100">Tarihi yerleri orijinal halleriyle keşfedin</p>
      </div>
      
      <div className="p-6">
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
          {/* Placeholder for AR view */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                  <Compass className="h-16 w-16 text-gray-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Zaman Makinesi Görünümü</p>
            </div>
          </div>
          
          {/* Time slider */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">M.Ö. 500</span>
              <span className="text-xs font-medium text-gray-600">Günümüz</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-2 text-center text-sm font-medium text-purple-700">
              M.S. 1453 - İstanbul'un Fethi
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Popüler Tarihi Dönemler</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Antik Yunan
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Roma İmparatorluğu
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Osmanlı Dönemi
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Bizans Dönemi
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Yakındaki Tarihi Yerler</h4>
          <div className="space-y-3">
            <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <MapPin className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h5 className="font-medium">Ayasofya</h5>
                <p className="text-sm text-gray-600">537 yılında inşa edildi, 1.5 km uzaklıkta</p>
              </div>
              <Navigation className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <MapPin className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h5 className="font-medium">Topkapı Sarayı</h5>
                <p className="text-sm text-gray-600">1460 yılında inşa edildi, 2.3 km uzaklıkta</p>
              </div>
              <Navigation className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
            <Zap className="h-4 w-4 mr-2" />
            Zaman Yolculuğu Başlat
          </Button>
          <Button variant="outline" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            Tur Rehberi Bul
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CulturalTimeMachine;
