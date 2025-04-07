import React from 'react';
import { Button } from './ui/button';
import { Users, UserPlus, MessageCircle, Share2, Map, Calendar } from 'lucide-react';

export const SocialSynchronization: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center">
          <Users className="h-7 w-7 mr-3" />
          Sosyal Senkronizasyon
        </h3>
        <p className="mt-2 text-blue-100">Grup seyahatlerinizi herkes için mükemmel hale getirin</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Aktif Gruplarınız</h4>
          <div className="space-y-3">
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                      4
                    </div>
                  </div>
                  <div className="ml-3">
                    <h5 className="font-medium">İstanbul Gezisi</h5>
                    <p className="text-sm text-gray-600">15-18 Nisan 2025</p>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Görüntüle
                </Button>
              </div>
              <div className="flex -space-x-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  AY
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  MK
                </div>
                <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  SB
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  Siz
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-3/4"></div>
                </div>
                <span className="text-xs font-medium text-gray-600">75% uyumlu</span>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                      2
                    </div>
                  </div>
                  <div className="ml-3">
                    <h5 className="font-medium">Kapadokya Hafta Sonu</h5>
                    <p className="text-sm text-gray-600">5-7 Mayıs 2025</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Görüntüle
                </Button>
              </div>
              <div className="flex -space-x-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  EK
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  Siz
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-11/12"></div>
                </div>
                <span className="text-xs font-medium text-gray-600">92% uyumlu</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Grup Tercihleri Analizi</h4>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-1">İlgi Alanları</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Tarih (3/4)</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Yemek (4/4)</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">Alışveriş (1/4)</span>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-1">Aktivite Temposu</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">Rahat (1/4)</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Dengeli (3/4)</span>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-1">Bütçe</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">Ekonomik (1/4)</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Orta (3/4)</span>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-1">Konaklama</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Otel (4/4)</span>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              Grubunuzun %75 uyumlu olduğu tercihler analizi
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button className="flex items-center justify-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Grup Oluştur
          </Button>
          <Button variant="outline" className="flex items-center justify-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Gruba Katıl
          </Button>
          <Button variant="outline" className="flex items-center justify-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Grup Sohbeti
          </Button>
          <Button variant="outline" className="flex items-center justify-center">
            <Share2 className="h-4 w-4 mr-2" />
            Davet Gönder
          </Button>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
            <Map className="h-5 w-5 mr-2" />
            Önerilen Grup Rotası
          </h4>
          <p className="text-sm text-gray-700 mb-3">
            Grubunuzun tercihlerine göre optimize edilmiş, herkesin ilgi alanlarını dengeleyen bir rota oluşturduk.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium">15 Nisan, 09:00</span>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Rotayı Görüntüle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSynchronization;
