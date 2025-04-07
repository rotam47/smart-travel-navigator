import React from 'react';
import { Button } from './ui/button';
import { Users, UserCheck, Map, AlertTriangle, Clock } from 'lucide-react';

export const DynamicCrowdManagement: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center">
          <Users className="h-7 w-7 mr-3" />
          Dinamik Kalabalık Yönetimi
        </h3>
        <p className="mt-2 text-green-100">Kalabalıktan kaçının, daha keyifli bir deneyim yaşayın</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Canlı Kalabalık Haritası</h4>
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-3">
            {/* Placeholder for crowd map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Map className="h-12 w-12 text-gray-300" />
            </div>
            
            {/* Crowd indicators */}
            <div className="absolute top-1/4 left-1/3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="absolute top-1/2 right-1/3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="absolute bottom-1/4 right-1/4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                <Users className="h-5 w-5" />
              </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span>Sakin</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                  <span>Orta Yoğunluk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  <span>Çok Kalabalık</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-600 mb-4">
            Son güncelleme: 5 dakika önce
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Popüler Yerlerin Durumu</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h5 className="font-medium">Kapalıçarşı</h5>
                  <div className="flex items-center text-sm text-red-700">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Çok kalabalık</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Tahmini bekleme</div>
                <div className="text-red-700">45+ dakika</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h5 className="font-medium">Ayasofya</h5>
                  <div className="flex items-center text-sm text-yellow-700">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Orta yoğunluk</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Tahmini bekleme</div>
                <div className="text-yellow-700">20-30 dakika</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h5 className="font-medium">Gülhane Parkı</h5>
                  <div className="flex items-center text-sm text-green-700">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Sakin</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Tahmini bekleme</div>
                <div className="text-green-700">Bekleme yok</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Kalabalık Tahminleri</h4>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">Bugün</div>
                <div className="h-4 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: '75%'}}></div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-medium text-gray-700">En yoğun saatler</div>
                <div className="text-sm text-gray-600">14:00 - 17:00</div>
              </div>
            </div>
            
            <div className="flex items-center mb-3">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">Yarın</div>
                <div className="h-4 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: '60%'}}></div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-medium text-gray-700">En yoğun saatler</div>
                <div className="text-sm text-gray-600">13:00 - 16:00</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">Hafta sonu</div>
                <div className="h-4 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: '90%'}}></div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-medium text-gray-700">En yoğun saatler</div>
                <div className="text-sm text-gray-600">11:00 - 18:00</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
          <h4 className="font-medium text-green-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Önerilen Alternatif
          </h4>
          <p className="text-sm text-gray-700 mb-3">
            Kapalıçarşı şu anda çok kalabalık. Bunun yerine, benzer deneyim için yakındaki Mısır Çarşısı'nı ziyaret etmenizi öneririz (şu anda sakin).
          </p>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
            Alternatif Rotayı Görüntüle
          </Button>
        </div>
        
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Users className="h-4 w-4 mr-2" />
          Kalabalıktan Kaçınan Rota Oluştur
        </Button>
      </div>
    </div>
  );
};

export default DynamicCrowdManagement;
