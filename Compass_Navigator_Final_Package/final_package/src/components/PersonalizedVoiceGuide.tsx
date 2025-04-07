import React from 'react';
import { Button } from './ui/button';
import { Headphones, Volume2, Music, Mic, Settings, User } from 'lucide-react';

export const PersonalizedVoiceGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center">
          <Headphones className="h-7 w-7 mr-3" />
          Kişiselleştirilmiş Sesli Rehber
        </h3>
        <p className="mt-2 text-purple-100">Sizin için özel olarak uyarlanmış sesli rehberlik</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="relative w-full h-24 bg-purple-50 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
            <div className="absolute inset-0">
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-1 h-8 bg-purple-300 rounded-full animate-pulse"></div>
                  <div className="w-1 h-12 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-purple-300 rounded-full animate-pulse"></div>
                  <div className="w-1 h-10 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-4 bg-purple-300 rounded-full animate-pulse"></div>
                  <div className="w-1 h-8 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-purple-300 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center space-x-4">
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="text-purple-800 font-medium">
                "Ayasofya'nın tarihini dinleyin..."
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Volume2 className="h-5 w-5 text-gray-600 mr-2" />
              <div className="w-24 h-1 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-600 rounded-full" style={{width: '70%'}}></div>
              </div>
            </div>
            <div className="flex items-center">
              <Music className="h-5 w-5 text-gray-600 mr-2" />
              <div className="w-24 h-1 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-600 rounded-full" style={{width: '30%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Ses Profili</h4>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h5 className="font-medium">Kişiselleştirilmiş Profil</h5>
                <p className="text-sm text-gray-600">İlgi alanlarınıza ve öğrenme tarzınıza göre uyarlanmış</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Anlatım Hızı</span>
                  <span className="text-gray-600">Normal</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{width: '50%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Detay Seviyesi</span>
                  <span className="text-gray-600">Yüksek</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{width: '80%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Ses Tonu</span>
                  <span className="text-gray-600">Sıcak</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{width: '65%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Arka Plan Müziği</span>
                  <span className="text-gray-600">Hafif</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">İlgi Alanlarınız</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Tarih
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Mimari
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Yerel Kültür
            </div>
            <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Sanat
            </div>
            <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Gastronomi
            </div>
            <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Doğa
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
            <Settings className="h-4 w-4 mr-2" />
            İlgi Alanlarını Düzenle
          </Button>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Mevcut Sesli Rehberler</h4>
          <div className="space-y-3">
            <div className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <Headphones className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h5 className="font-medium">Ayasofya'nın Tarihi</h5>
                <p className="text-sm text-gray-600 line-clamp-1">
                  Bizans ve Osmanlı dönemlerinde Ayasofya'nın değişimi...
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 mr-3">12:45 dk</span>
                  <div className="flex items-center text-xs text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>İlgi alanlarınıza göre uyarlandı</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                <Headphones className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h5 className="font-medium">Kapalıçarşı'nın Sırları</h5>
                <p className="text-sm text-gray-600 line-clamp-1">
                  Osmanlı'dan günümüze ticaretin kalbi...
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 mr-3">8:30 dk</span>
                  <div className="flex items-center text-xs text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>İlgi alanlarınıza göre uyarlandı</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-6">
          <h4 className="font-medium text-purple-800 mb-2 flex items-center">
            <Mic className="h-5 w-5 mr-2" />
            Kendi Sesli Rehberinizi Oluşturun
          </h4>
          <p className="text-sm text-gray-700 mb-3">
            Kendi bilgilerinizi ve deneyimlerinizi paylaşarak özel sesli rehberler oluşturabilirsiniz.
          </p>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 w-full">
            Sesli Rehber Oluştur
          </Button>
        </div>
        
        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          <Headphones className="h-4 w-4 mr-2" />
          Tüm Sesli Rehberleri Keşfet
        </Button>
      </div>
    </div>
  );
};

export default PersonalizedVoiceGuide;
