import React from 'react';
import { Button } from './ui/button';
import { Clock, MapPin, Users, Heart, BookOpen, UserCheck, Leaf, Headphones } from 'lucide-react';

export const InnovativeFeatures: React.FC = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Kültürel Zaman Makinesi",
      description: "Tarihi yerlerin geçmişteki halini AR teknolojisiyle görüntüleyin. Antik kentleri orijinal halleriyle keşfedin."
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      title: "Duygusal Haritalama",
      description: "Yapay zeka, ruh halinize ve tercihlerinize göre size özel rotalar oluşturur."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Sosyal Senkronizasyon",
      description: "Grup seyahatlerinde herkesin tercihlerini dengeleyen akıllı rota planlaması."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-yellow-500" />,
      title: "Yerel Hikaye Anlatıcılığı",
      description: "Yerel insanların anlattığı hikayeleri ve anıları AR ile deneyimleyin."
    },
    {
      icon: <UserCheck className="h-8 w-8 text-green-500" />,
      title: "Dinamik Kalabalık Yönetimi",
      description: "Gerçek zamanlı verilerle kalabalık alanlardan kaçınarak daha keyifli bir deneyim yaşayın."
    },
    {
      icon: <Leaf className="h-8 w-8 text-emerald-500" />,
      title: "Ekolojik Ayak İzi Takibi",
      description: "Seyahatlerinizin çevresel etkisini ölçün ve daha sürdürülebilir seçenekler keşfedin."
    },
    {
      icon: <Headphones className="h-8 w-8 text-indigo-500" />,
      title: "Kişiselleştirilmiş Sesli Rehber",
      description: "İlgi alanlarınıza ve öğrenme tarzınıza göre uyarlanan akıllı sesli rehber."
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      title: "Hibrit Gerçeklik Navigasyon",
      description: "Gerçek dünya ile dijital haritalar arasında kesintisiz geçiş yapabilen yenilikçi navigasyon."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Benzersiz Özellikler</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compass Navigator'ı dünyada eşi benzeri olmayan bir platform yapan yenilikçi teknolojilerimiz
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Button variant="outline" className="w-full">Daha Fazla</Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Tüm Özellikleri Keşfedin
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InnovativeFeatures;
