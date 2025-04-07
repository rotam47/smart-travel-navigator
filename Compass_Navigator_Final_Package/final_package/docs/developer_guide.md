# Compass Navigator - Geliştirici Dokümantasyonu

## İçindekiler

1. [Giriş](#giriş)
2. [Mimari Genel Bakış](#mimari-genel-bakış)
3. [Kurulum ve Geliştirme](#kurulum-ve-geliştirme)
4. [Bileşenler ve Modüller](#bileşenler-ve-modüller)
5. [API Referansı](#api-referansı)
6. [Yapay Zeka Entegrasyonu](#yapay-zeka-entegrasyonu)
7. [Çoklu Dil Desteği](#çoklu-dil-desteği)
8. [Dağıtım Kılavuzu](#dağıtım-kılavuzu)
9. [Katkıda Bulunma](#katkıda-bulunma)
10. [Lisans](#lisans)

## Giriş

Bu dokümantasyon, Compass Navigator uygulamasının teknik detaylarını, mimarisini ve geliştirme süreçlerini açıklamaktadır. Geliştirici ekibi için hazırlanmıştır ve uygulamanın tüm teknik yönlerini kapsamaktadır.

## Mimari Genel Bakış

Compass Navigator, modern web teknolojileri kullanılarak geliştirilmiş bir Next.js uygulamasıdır. Uygulama, aşağıdaki temel teknolojileri kullanmaktadır:

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Harita Servisleri**: OpenStreetMap, Leaflet.js
- **AR Teknolojisi**: WebXR API, AR.js, Three.js
- **Yapay Zeka**: TensorFlow.js, açık kaynak NLP modelleri
- **Veri Depolama**: LocalStorage, IndexedDB (çevrimdışı kullanım için)
- **API İletişimi**: RESTful API, GraphQL

### Mimari Diyagram

```
+----------------------------------+
|           Kullanıcı Arayüzü      |
|  +----------------------------+  |
|  |       Next.js / React      |  |
|  +----------------------------+  |
+----------------------------------+
              |       |
+-------------+       +------------+
|                                  |
v                                  v
+------------------+    +---------------------+
|  Harita Servisleri |    |   AR Servisleri     |
|  (OpenStreetMap)   |    |   (WebXR, AR.js)    |
+------------------+    +---------------------+
              |                   |
              v                   v
+----------------------------------+
|        Veri İşleme Katmanı       |
|  +----------------------------+  |
|  |     Yapay Zeka Modülleri   |  |
|  +----------------------------+  |
+----------------------------------+
              |
              v
+----------------------------------+
|        Veri Depolama Katmanı     |
|  +----------------------------+  |
|  | LocalStorage / IndexedDB   |  |
|  +----------------------------+  |
+----------------------------------+
```

## Kurulum ve Geliştirme

### Sistem Gereksinimleri

- Node.js 16.x veya üzeri
- npm 7.x veya üzeri
- Git

### Kurulum Adımları

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/compass-navigator/compass-navigator.git
   cd compass-navigator
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Tarayıcınızda `http://localhost:3000` adresine gidin.

### Ortam Değişkenleri

Uygulamanın çalışması için aşağıdaki ortam değişkenlerini `.env.local` dosyasında tanımlamanız gerekir:

```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Derleme ve Dağıtım

Üretim sürümünü derlemek için:

```bash
npm run build
```

Üretim sürümünü yerel olarak test etmek için:

```bash
npm run start
```

## Bileşenler ve Modüller

Compass Navigator, modüler bir yapıya sahiptir ve aşağıdaki ana bileşenlerden oluşur:

### ARNavigationComponent

AR navigasyon deneyimi sağlayan bileşen. WebXR API ve AR.js kullanarak gerçek dünya üzerine navigasyon bilgilerini yerleştirir.

**Dosya Yolu**: `src/components/ARNavigationComponent.tsx`

**Kullanım Örneği**:
```tsx
import { ARNavigationComponent } from '@/components/ARNavigationComponent';

function MyPage() {
  return (
    <div>
      <ARNavigationComponent 
        destination={{ lat: 41.0082, lng: 28.9784 }}
        showPOIs={true}
      />
    </div>
  );
}
```

### SmartLocationOrderingComponent

Yakından uzağa lokasyonda bulunan görülmesi gereken yerlerin optimum düzenini sağlayan bileşen.

**Dosya Yolu**: `src/components/SmartLocationOrderingComponent.tsx`

**Kullanım Örneği**:
```tsx
import { SmartLocationOrderingComponent } from '@/components/SmartLocationOrderingComponent';

function MyPage() {
  return (
    <div>
      <SmartLocationOrderingComponent className="my-4" />
    </div>
  );
}
```

### InformationCardsComponent

Lokasyonlar hakkında detaylı bilgiler, kullanıcı yorumları ve pratik bilgiler içeren kapsamlı bilgi kartları bileşeni.

**Dosya Yolu**: `src/components/InformationCardsComponent.tsx`

### LocalCulinaryComponent

Bölgeye özgü yiyecek ve içecekleri keşfetmeyi sağlayan bileşen.

**Dosya Yolu**: `src/components/LocalCulinaryComponent.tsx`

### EmotionalMapping

Kullanıcının ruh haline göre özelleştirilmiş rota ve yer önerileri sunan yapay zeka destekli bileşen.

**Dosya Yolu**: `src/components/EmotionalMapping.tsx`

### HiddenTreasuresComponent

Turistlerin genellikle kaçırdığı, yerel halkın bildiği gizli yerleri keşfetmeyi sağlayan bileşen.

**Dosya Yolu**: `src/components/HiddenTreasuresComponent.tsx`

### DynamicCrowdManagementComponent

Kalabalık yerlerden kaçınmayı ve ziyaretleri en uygun zamanlarda planlamayı sağlayan bileşen.

**Dosya Yolu**: `src/components/DynamicCrowdManagementComponent.tsx`

### AIIntegrationComponent

Yapay zeka asistanı ve sürekli öğrenme sistemi sağlayan bileşen.

**Dosya Yolu**: `src/components/AIIntegrationComponent.tsx`

## API Referansı

### Harita API'leri

#### `useMap` Hook

Harita işlevselliğine erişim sağlayan React hook.

```tsx
import { useMap } from '@/lib/map';

function MyComponent() {
  const { map, setCenter, addMarker, calculateRoute } = useMap();
  
  // Harita merkezini ayarla
  const goToIstanbul = () => {
    setCenter({ lat: 41.0082, lng: 28.9784 });
  };
  
  // Marker ekle
  const addIstanbulMarker = () => {
    addMarker({ lat: 41.0082, lng: 28.9784, title: 'İstanbul' });
  };
  
  // Rota hesapla
  const calculateRouteToIstanbul = (startPoint) => {
    calculateRoute(startPoint, { lat: 41.0082, lng: 28.9784 });
  };
  
  return (
    <div>
      <button onClick={goToIstanbul}>İstanbul'a Git</button>
      <button onClick={addIstanbulMarker}>İstanbul Marker'ı Ekle</button>
    </div>
  );
}
```

### AR API'leri

#### `useAR` Hook

AR işlevselliğine erişim sağlayan React hook.

```tsx
import { useAR } from '@/lib/ar';

function MyARComponent() {
  const { 
    initAR, 
    addARMarker, 
    showARDirections,
    arReady,
    arError
  } = useAR();
  
  useEffect(() => {
    initAR();
  }, []);
  
  if (arError) {
    return <div>AR başlatılamadı: {arError}</div>;
  }
  
  if (!arReady) {
    return <div>AR yükleniyor...</div>;
  }
  
  return (
    <div>
      <button onClick={() => addARMarker({ lat: 41.0082, lng: 28.9784, title: 'İstanbul' })}>
        AR Marker Ekle
      </button>
      <button onClick={() => showARDirections({ lat: 41.0082, lng: 28.9784 })}>
        AR Yönlendirme Göster
      </button>
    </div>
  );
}
```

### Yapay Zeka API'leri

#### `useAI` Hook

Yapay zeka işlevselliğine erişim sağlayan React hook.

```tsx
import { useAI } from '@/lib/ai';

function MyAIComponent() {
  const { 
    askQuestion, 
    generateRecommendations,
    optimizeRoute,
    loading,
    response
  } = useAI();
  
  const handleAskQuestion = async () => {
    const answer = await askQuestion('İstanbul'da görülmesi gereken yerler nereler?');
    console.log(answer);
  };
  
  const handleGetRecommendations = async () => {
    const recommendations = await generateRecommendations({
      mood: 'romantic',
      location: { lat: 41.0082, lng: 28.9784 },
      timeAvailable: 180 // dakika
    });
    console.log(recommendations);
  };
  
  return (
    <div>
      <button onClick={handleAskQuestion} disabled={loading}>
        Soru Sor
      </button>
      <button onClick={handleGetRecommendations} disabled={loading}>
        Öneriler Al
      </button>
      {response && <div>{JSON.stringify(response)}</div>}
    </div>
  );
}
```

## Yapay Zeka Entegrasyonu

Compass Navigator, çeşitli yapay zeka özelliklerini entegre eder:

### Doğal Dil İşleme (NLP)

Kullanıcı sorularını anlamak ve yanıtlamak için NLP modelleri kullanılır. Bu modeller, TensorFlow.js kullanılarak tarayıcıda çalışır.

```tsx
import { processUserQuery } from '@/lib/ai/nlp';

// Kullanıcı sorgusunu işle
const response = await processUserQuery('En yakın müze nerede?', {
  userLocation: { lat: 41.0082, lng: 28.9784 }
});
```

### Öneri Sistemi

Kullanıcı tercihlerine ve geçmiş davranışlarına göre kişiselleştirilmiş öneriler sunar.

```tsx
import { generatePersonalizedRecommendations } from '@/lib/ai/recommendations';

// Kişiselleştirilmiş öneriler oluştur
const recommendations = await generatePersonalizedRecommendations({
  userId: 'user123',
  location: { lat: 41.0082, lng: 28.9784 },
  preferences: {
    interests: ['history', 'art', 'food'],
    mood: 'adventurous',
    budget: 'medium'
  }
});
```

### Rota Optimizasyonu

Çeşitli faktörleri dikkate alarak optimum rotalar oluşturur.

```tsx
import { optimizeRoute } from '@/lib/ai/routeOptimization';

// Rotayı optimize et
const optimizedRoute = await optimizeRoute({
  startPoint: { lat: 41.0082, lng: 28.9784 },
  destinations: [
    { lat: 41.0102, lng: 28.9684, mustVisit: true },
    { lat: 41.0122, lng: 28.9784 },
    { lat: 41.0082, lng: 28.9884 }
  ],
  optimizationCriteria: {
    distance: true,
    crowdLevel: true,
    weather: true,
    openingHours: true
  }
});
```

### Sürekli Öğrenme Sistemi

Kullanıcı etkileşimlerinden öğrenen ve zamanla daha akıllı hale gelen sistem.

```tsx
import { learnFromUserInteraction } from '@/lib/ai/continuousLearning';

// Kullanıcı etkileşiminden öğren
await learnFromUserInteraction({
  userId: 'user123',
  interaction: {
    type: 'placeVisited',
    placeId: 'place456',
    rating: 4,
    timeSpent: 90 // dakika
  }
});
```

## Çoklu Dil Desteği

Compass Navigator, 10 dilde tam destek sunar. Çoklu dil desteği, `i18n.tsx` ve `translations.ts` dosyaları kullanılarak sağlanır.

### Dil Değiştirme

```tsx
import { useI18n } from '@/lib/i18n';

function LanguageSwitcher() {
  const { setLanguage, currentLanguage, supportedLanguages } = useI18n();
  
  return (
    <select 
      value={currentLanguage} 
      onChange={(e) => setLanguage(e.target.value)}
    >
      {supportedLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
```

### Çeviri Kullanımı

```tsx
import { useI18n } from '@/lib/i18n';

function MyComponent() {
  const { t } = useI18n();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
      <button>{t('common.continue')}</button>
    </div>
  );
}
```

## Dağıtım Kılavuzu

### Vercel ile Dağıtım

Compass Navigator, Vercel platformunda kolayca dağıtılabilir:

1. Vercel hesabı oluşturun (https://vercel.com)
2. Vercel CLI'yi yükleyin: `npm i -g vercel`
3. Proje dizininde oturum açın: `vercel login`
4. Projeyi dağıtın: `vercel`

### GitHub Pages ile Dağıtım

GitHub Pages kullanarak dağıtmak için:

1. `next.config.js` dosyasını güncelleyin:
   ```js
   module.exports = {
     basePath: '/compass-navigator',
     assetPrefix: '/compass-navigator/',
     images: {
       unoptimized: true,
     },
   };
   ```

2. `package.json` dosyasına export script ekleyin:
   ```json
   "scripts": {
     "export": "next build && next export"
   }
   ```

3. Projeyi derleyin ve export edin:
   ```bash
   npm run export
   ```

4. `out` dizinini GitHub Pages'e dağıtın.

## Katkıda Bulunma

Compass Navigator'a katkıda bulunmak için aşağıdaki adımları izleyin:

1. Depoyu forklayın
2. Yeni bir branch oluşturun: `git checkout -b feature/amazing-feature`
3. Değişikliklerinizi commit edin: `git commit -m 'Add amazing feature'`
4. Branch'inizi push edin: `git push origin feature/amazing-feature`
5. Pull Request oluşturun

### Kod Standartları

- TypeScript tip güvenliği sağlayın
- ESLint ve Prettier kurallarına uyun
- Bileşenler için birim testleri yazın
- Yorum ve dokümantasyon ekleyin

## Lisans

Compass Navigator, MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

---

© 2025 Compass Navigator. Tüm hakları saklıdır.
