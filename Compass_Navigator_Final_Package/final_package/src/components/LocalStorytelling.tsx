import React from 'react';
import { Button } from './ui/button';
import { BookOpen, MapPin, Star, MessageCircle, User, ThumbsUp } from 'lucide-react';

export const LocalStorytelling: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center">
          <BookOpen className="h-7 w-7 mr-3" />
          Yerel Hikaye Anlatıcılığı
        </h3>
        <p className="mt-2 text-yellow-100">Yerel insanların gözünden yerleri keşfedin</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
            {/* Placeholder for story image/video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Hikaye Görünümü</p>
              </div>
            </div>
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            
            {/* Location tag */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
              <MapPin className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm font-medium">Kapalıçarşı, İstanbul</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <User className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h5 className="font-medium">Ahmet Yılmaz</h5>
                <p className="text-xs text-gray-600">Yerel Rehber, 15 yıldır İstanbul'da</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="ml-1 font-medium">4.8</span>
              <span className="text-sm text-gray-600 ml-1">(124)</span>
            </div>
          </div>
          
          <h4 className="text-lg font-semibold mb-2">Kapalıçarşı'nın Gizli Köşeleri</h4>
          <p className="text-gray-700 mb-4">
            "Turistlerin bilmediği, sadece yerel halkın alışveriş yaptığı bu gizli köşelerde, İstanbul'un gerçek ruhunu hissedebilirsiniz. 40 yıldır burada çalışan bir halı satıcısı olarak, size pazarlık sanatının inceliklerini ve en iyi Türk kahvesinin nerede içileceğini anlatacağım..."
          </p>
          
          <div className="flex space-x-3 mb-6">
            <Button variant="outline" className="flex-1 flex items-center justify-center">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Beğen (56)
            </Button>
            <Button variant="outline" className="flex-1 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Yorum (12)
            </Button>
            <Button variant="outline" className="flex-1 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              Paylaş
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Yakındaki Diğer Hikayeler</h4>
          <div className="space-y-3">
            <div className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 mr-3 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h5 className="font-medium mr-2">Balık Pazarının Sırları</h5>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-3 w-3" />
                    <span className="text-xs ml-1">4.6</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  "40 yıllık balıkçı olarak size en taze balığı nasıl seçeceğinizi göstereceğim..."
                </p>
                <div className="flex items-center mt-1">
                  <MapPin className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-xs text-gray-600">Eminönü, 0.8 km</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 mr-3 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h5 className="font-medium mr-2">Ayasofya'nın Efsaneleri</h5>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-3 w-3" />
                    <span className="text-xs ml-1">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  "Dedem bu yapının inşaatında çalışan ustaların torunuydu ve bana anlatılan hikayeleri sizinle paylaşmak istiyorum..."
                </p>
                <div className="flex items-center mt-1">
                  <MapPin className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-xs text-gray-600">Sultanahmet, 1.2 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
          <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Hikaye Anlatıcısı Olun
          </h4>
          <p className="text-sm text-gray-700 mb-3">
            Yaşadığınız yerin hikayelerini paylaşın, diğer gezginlere ilham verin ve ekstra gelir elde edin.
          </p>
          <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 w-full">
            Hikaye Anlatıcısı Başvurusu
          </Button>
        </div>
        
        <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
          <BookOpen className="h-4 w-4 mr-2" />
          Tüm Hikayeleri Keşfet
        </Button>
      </div>
    </div>
  );
};

export default LocalStorytelling;
