import React from 'react';
import { Button } from './ui/button';
import { Leaf, BarChart, Wind, Droplet, Thermometer, Car, Plane, Train } from 'lucide-react';

export const EcologicalFootprintTracking: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center">
          <Leaf className="h-7 w-7 mr-3" />
          Ekolojik Ayak İzi Takibi
        </h3>
        <p className="mt-2 text-emerald-100">Seyahatlerinizin çevresel etkisini ölçün ve azaltın</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Mevcut Seyahatinizin Ekolojik Ayak İzi</h4>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <BarChart className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h5 className="font-medium">İstanbul Gezisi</h5>
                  <p className="text-sm text-gray-600">15-18 Nisan 2025</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">Toplam CO₂</div>
                <div className="text-lg font-bold text-emerald-600">127 kg</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Ulaşım</span>
                  <span className="text-gray-600">85 kg CO₂</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{width: '67%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Konaklama</span>
                  <span className="text-gray-600">28 kg CO₂</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{width: '22%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Yemek</span>
                  <span className="text-gray-600">14 kg CO₂</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{width: '11%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Çevresel Etki Karşılaştırması</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <Wind className="h-4 w-4 text-blue-600" />
                </div>
                <h5 className="font-medium">Hava Kalitesi</h5>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500" style={{width: '60%'}}></div>
                </div>
                <span className="ml-2 text-sm font-medium">Orta</span>
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <Droplet className="h-4 w-4 text-blue-600" />
                </div>
                <h5 className="font-medium">Su Tüketimi</h5>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500" style={{width: '45%'}}></div>
                </div>
                <span className="ml-2 text-sm font-medium">Düşük</span>
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <Thermometer className="h-4 w-4 text-blue-600" />
                </div>
                <h5 className="font-medium">Karbon Ayak İzi</h5>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-red-500" style={{width: '75%'}}></div>
                </div>
                <span className="ml-2 text-sm font-medium">Yüksek</span>
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <Leaf className="h-4 w-4 text-blue-600" />
                </div>
                <h5 className="font-medium">Biyoçeşitlilik</h5>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500" style={{width: '30%'}}></div>
                </div>
                <span className="ml-2 text-sm font-medium">Düşük</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Daha Sürdürülebilir Alternatifler</h4>
          <div className="space-y-3">
            <div className="p-3 border border-emerald-200 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Train className="h-5 w-5 text-emerald-600 mr-2" />
                  <h5 className="font-medium">Tren ile Seyahat</h5>
                </div>
                <div className="text-sm font-medium text-emerald-700">-65% CO₂</div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Uçak yerine tren kullanarak karbon ayak izinizi önemli ölçüde azaltabilirsiniz.
              </p>
              <Button size="sm" variant="outline" className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-50">
                Tren Rotalarını Görüntüle
              </Button>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                  <h5 className="font-medium">Eko-Dostu Konaklama</h5>
                </div>
                <div className="text-sm font-medium text-emerald-700">-40% CO₂</div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Sürdürülebilir sertifikalı oteller ve konaklama yerleri seçin.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Eko-Dostu Otelleri Görüntüle
              </Button>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <h5 className="font-medium">Yerel Yemekler</h5>
                </div>
                <div className="text-sm font-medium text-emerald-700">-25% CO₂</div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Yerel ve mevsimsel yiyecekleri tercih ederek karbon ayak izinizi azaltın.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Yerel Restoranları Görüntüle
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg mb-6">
          <h4 className="font-medium text-emerald-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Karbon Dengeleme
          </h4>
          <p className="text-sm text-gray-700 mb-3">
            Seyahatinizin karbon ayak izini dengelemek için ağaç dikimi veya yenilenebilir enerji projelerine katkıda bulunabilirsiniz.
          </p>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 w-full">
            Karbon Ayak İzini Dengele (15€)
          </Button>
        </div>
        
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          <Leaf className="h-4 w-4 mr-2" />
          Sürdürülebilir Rota Oluştur
        </Button>
      </div>
    </div>
  );
};

export default EcologicalFootprintTracking;
