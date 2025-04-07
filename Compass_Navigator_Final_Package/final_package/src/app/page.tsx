import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MapComponent } from '@/components/MapComponent';
import { ARNavigationComponent } from '@/components/ARNavigationComponent';
import { InformationCardsComponent } from '@/components/InformationCardsComponent';
import { EmotionalMapping } from '@/components/EmotionalMapping';
import { HiddenTreasuresComponent } from '@/components/HiddenTreasuresComponent';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 gap-8">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Compass Navigator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Keşfedin, deneyimleyin ve seyahatlerinizi dönüştürün. Yapay zeka destekli, 
              artırılmış gerçeklik navigasyon ile yeni yerler keşfedin.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Harita Görünümü</h2>
            <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
              <MapComponent />
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">AR Navigasyon</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <ARNavigationComponent />
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Duygusal Haritalama</h2>
            <EmotionalMapping />
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gizli Hazineler</h2>
            <HiddenTreasuresComponent />
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Yer Bilgileri</h2>
            <InformationCardsComponent />
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dil Seçenekleri</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <LanguageSwitcher />
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
