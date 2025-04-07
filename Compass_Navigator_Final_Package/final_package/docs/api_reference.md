# Compass Navigator - API Referansı

## İçindekiler

1. [Giriş](#giriş)
2. [Kimlik Doğrulama](#kimlik-doğrulama)
3. [Harita API'leri](#harita-apileri)
4. [AR API'leri](#ar-apileri)
5. [Yapay Zeka API'leri](#yapay-zeka-apileri)
6. [Lokasyon API'leri](#lokasyon-apileri)
7. [Kullanıcı API'leri](#kullanıcı-apileri)
8. [Hata Kodları](#hata-kodları)
9. [Sınırlamalar ve Kotalar](#sınırlamalar-ve-kotalar)
10. [Örnekler](#örnekler)

## Giriş

Bu dokümantasyon, Compass Navigator uygulamasının API'lerini detaylı bir şekilde açıklamaktadır. Bu API'ler, uygulamanın çeşitli özelliklerine programatik erişim sağlar ve üçüncü taraf geliştiricilerin Compass Navigator'ın işlevselliğini kendi uygulamalarına entegre etmelerine olanak tanır.

## Kimlik Doğrulama

Compass Navigator API'lerine erişmek için JWT (JSON Web Token) tabanlı kimlik doğrulama kullanılır.

### Token Alma

```
POST /api/auth/token
```

**İstek Gövdesi:**

```json
{
  "email": "kullanici@ornek.com",
  "password": "guclu-sifre"
}
```

**Başarılı Yanıt:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

### Token Yenileme

```
POST /api/auth/refresh
```

**İstek Gövdesi:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Başarılı Yanıt:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

### API İsteklerinde Kimlik Doğrulama

Tüm API isteklerinde, alınan token'ı `Authorization` başlığında `Bearer` şeması ile göndermeniz gerekir:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Harita API'leri

### Harita Veri Noktaları Alma

```
GET /api/map/points-of-interest
```

**Sorgu Parametreleri:**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| lat | number | Merkez noktanın enlem değeri |
| lng | number | Merkez noktanın boylam değeri |
| radius | number | Arama yarıçapı (metre cinsinden) |
| types | string | Virgülle ayrılmış POI tipleri (ör. "museum,restaurant,park") |
| limit | number | Döndürülecek maksimum sonuç sayısı (varsayılan: 20) |

**Başarılı Yanıt:**

```json
{
  "points": [
    {
      "id": "poi123",
      "name": "Hagia Sophia",
      "type": "museum",
      "location": {
        "lat": 41.0086,
        "lng": 28.9802
      },
      "description": "Ayasofya, İstanbul'da yer alan eski bir Ortodoks kilisesi, daha sonra cami, şimdi ise müze olan tarihi bir yapıdır.",
      "rating": 4.8,
      "photos": ["https://example.com/photos/hagia-sophia-1.jpg"],
      "openingHours": {
        "monday": "09:00-17:00",
        "tuesday": "09:00-17:00",
        "wednesday": "09:00-17:00",
        "thursday": "09:00-17:00",
        "friday": "09:00-17:00",
        "saturday": "09:00-17:00",
        "sunday": "09:00-17:00"
      },
      "crowdLevel": "medium",
      "distance": 350
    }
  ],
  "total": 1,
  "nextPage": null
}
```

### Rota Hesaplama

```
POST /api/map/route
```

**İstek Gövdesi:**

```json
{
  "origin": {
    "lat": 41.0082,
    "lng": 28.9784
  },
  "destination": {
    "lat": 41.0086,
    "lng": 28.9802
  },
  "waypoints": [
    {
      "lat": 41.0084,
      "lng": 28.9790
    }
  ],
  "transportMode": "walking",
  "optimizationCriteria": {
    "distance": true,
    "crowdLevel": true,
    "weather": true,
    "openingHours": true
  }
}
```

**Başarılı Yanıt:**

```json
{
  "route": {
    "distance": 450,
    "duration": 600,
    "polyline": "ew~|F_ulpEjAkB...",
    "steps": [
      {
        "instruction": "Kuzeye doğru yürüyün",
        "distance": 100,
        "duration": 120,
        "polyline": "ew~|F_ulpEjA..."
      }
    ]
  },
  "alternativeRoutes": [
    {
      "distance": 500,
      "duration": 650,
      "polyline": "ew~|F_ulpEhCiD...",
      "optimizedFor": "weather"
    }
  ]
}
```

### Çevrimdışı Harita İndirme

```
POST /api/map/offline-download
```

**İstek Gövdesi:**

```json
{
  "boundingBox": {
    "northEast": {
      "lat": 41.1,
      "lng": 29.1
    },
    "southWest": {
      "lat": 40.9,
      "lng": 28.9
    }
  },
  "zoomLevels": [13, 14, 15, 16],
  "includePointsOfInterest": true
}
```

**Başarılı Yanıt:**

```json
{
  "downloadId": "download123",
  "estimatedSize": 25600000,
  "estimatedTiles": 1024,
  "downloadUrl": "https://example.com/api/map/offline-download/download123"
}
```

## AR API'leri

### AR Marker Oluşturma

```
POST /api/ar/markers
```

**İstek Gövdesi:**

```json
{
  "location": {
    "lat": 41.0086,
    "lng": 28.9802
  },
  "title": "Hagia Sophia",
  "description": "Historical museum",
  "icon": "museum",
  "color": "#FF5733",
  "scale": 1.2
}
```

**Başarılı Yanıt:**

```json
{
  "id": "armarker123",
  "location": {
    "lat": 41.0086,
    "lng": 28.9802
  },
  "title": "Hagia Sophia",
  "description": "Historical museum",
  "icon": "museum",
  "color": "#FF5733",
  "scale": 1.2,
  "arModel": {
    "url": "https://example.com/ar-models/marker123.glb",
    "size": 256000
  }
}
```

### AR Yönlendirme Alma

```
POST /api/ar/directions
```

**İstek Gövdesi:**

```json
{
  "origin": {
    "lat": 41.0082,
    "lng": 28.9784
  },
  "destination": {
    "lat": 41.0086,
    "lng": 28.9802
  },
  "transportMode": "walking",
  "arMode": "full"
}
```

**Başarılı Yanıt:**

```json
{
  "id": "ardirection123",
  "steps": [
    {
      "instruction": "Kuzeye doğru yürüyün",
      "distance": 100,
      "duration": 120,
      "arElements": [
        {
          "type": "arrow",
          "position": {
            "lat": 41.0083,
            "lng": 28.9785
          },
          "rotation": 0,
          "scale": 1.0,
          "color": "#3366FF"
        }
      ]
    }
  ],
  "arModels": {
    "arrow": "https://example.com/ar-models/arrow.glb",
    "destination": "https://example.com/ar-models/destination.glb"
  }
}
```

### AR Kalibrasyon

```
POST /api/ar/calibrate
```

**İstek Gövdesi:**

```json
{
  "deviceOrientation": {
    "alpha": 45,
    "beta": 0,
    "gamma": 0
  },
  "deviceLocation": {
    "lat": 41.0082,
    "lng": 28.9784,
    "accuracy": 5
  },
  "compassHeading": 45
}
```

**Başarılı Yanıt:**

```json
{
  "calibrationId": "calib123",
  "adjustments": {
    "headingOffset": 2.5,
    "positionOffset": {
      "lat": 0.0001,
      "lng": -0.0002
    }
  },
  "accuracy": "high"
}
```

## Yapay Zeka API'leri

### Kullanıcı Sorusu İşleme

```
POST /api/ai/query
```

**İstek Gövdesi:**

```json
{
  "query": "İstanbul'da görülmesi gereken yerler nereler?",
  "userLocation": {
    "lat": 41.0082,
    "lng": 28.9784
  },
  "preferences": {
    "interests": ["history", "art", "food"],
    "language": "tr"
  }
}
```

**Başarılı Yanıt:**

```json
{
  "answer": "İstanbul'da görülmesi gereken başlıca yerler şunlardır: Ayasofya, Topkapı Sarayı, Sultanahmet Camii (Mavi Cami), Kapalı Çarşı, Galata Kulesi...",
  "suggestedPlaces": [
    {
      "id": "poi123",
      "name": "Hagia Sophia",
      "type": "museum",
      "location": {
        "lat": 41.0086,
        "lng": 28.9802
      },
      "distance": 350
    }
  ],
  "suggestedActions": [
    {
      "type": "createRoute",
      "title": "Bu yerleri içeren bir rota oluştur",
      "params": {
        "places": ["poi123", "poi124", "poi125"]
      }
    }
  ]
}
```

### Kişiselleştirilmiş Öneriler Alma

```
POST /api/ai/recommendations
```

**İstek Gövdesi:**

```json
{
  "location": {
    "lat": 41.0082,
    "lng": 28.9784
  },
  "preferences": {
    "interests": ["history", "art", "food"],
    "mood": "adventurous",
    "budget": "medium",
    "timeAvailable": 180
  },
  "history": {
    "visitedPlaces": ["poi123", "poi124"],
    "likedCategories": ["museum", "restaurant"]
  }
}
```

**Başarılı Yanıt:**

```json
{
  "recommendations": [
    {
      "id": "poi125",
      "name": "Basilica Cistern",
      "type": "historical",
      "location": {
        "lat": 41.0084,
        "lng": 28.9779
      },
      "description": "Yerebatan Sarnıcı, İstanbul'un en büyük kapalı sarnıcıdır.",
      "rating": 4.6,
      "matchScore": 0.92,
      "matchReason": "Tarihe olan ilginiz ve maceraperest ruh halinizle uyumlu"
    }
  ],
  "suggestedRoute": {
    "duration": 150,
    "distance": 1200,
    "places": ["poi125", "poi126", "poi127"]
  }
}
```

### Rota Optimizasyonu

```
POST /api/ai/optimize-route
```

**İstek Gövdesi:**

```json
{
  "startPoint": {
    "lat": 41.0082,
    "lng": 28.9784
  },
  "destinations": [
    {
      "id": "poi123",
      "mustVisit": true
    },
    {
      "id": "poi124",
      "mustVisit": false
    },
    {
      "id": "poi125",
      "mustVisit": false
    }
  ],
  "optimizationCriteria": {
    "distance": true,
    "crowdLevel": true,
    "weather": true,
    "openingHours": true
  },
  "transportMode": "walking",
  "timeAvailable": 240
}
```

**Başarılı Yanıt:**

```json
{
  "optimizedRoute": {
    "duration": 220,
    "distance": 1800,
    "places": [
      {
        "id": "poi123",
        "name": "Hagia Sophia",
        "arrivalTime": "10:30",
        "suggestedDuration": 60
      },
      {
        "id": "poi125",
        "name": "Basilica Cistern",
        "arrivalTime": "11:45",
        "suggestedDuration": 45
      },
      {
        "id": "poi124",
        "name": "Blue Mosque",
        "arrivalTime": "12:45",
        "suggestedDuration": 45
      }
    ]
  },
  "alternativeRoutes": [
    {
      "optimizedFor": "weather",
      "duration": 240,
      "distance": 2000,
      "places": ["poi123", "poi124", "poi125"]
    }
  ]
}
```

### Duygusal Haritalama

```
POST /api/ai/emotional-mapping
```

**İstek Gövdesi:**

```json
{
  "location": {
    "lat": 41.0082,
    "lng": 28.9784
  },
  "mood": "romantic",
  "timeOfDay": "evening",
  "preferences": {
    "interests": ["scenery", "dining"],
    "budget": "medium"
  }
}
```

**Başarılı Yanıt:**

```json
{
  "places": [
    {
      "id": "poi128",
      "name": "Galata Tower",
      "type": "viewpoint",
      "location": {
        "lat": 41.0256,
        "lng": 28.9741
      },
      "description": "Galata Kulesi'nden İstanbul'un panoramik manzarasını izleyebilirsiniz.",
      "moodScore": 0.95,
      "moodReason": "Gün batımında romantik bir manzara sunar",
      "bestTimeToVisit": "sunset"
    }
  ],
  "route": {
    "duration": 180,
    "distance": 1500,
    "places": ["poi128", "poi129", "poi130"],
    "moodEnhancingTips": [
      "Galata Kulesi'nde gün batımını izleyin",
      "Ardından Karaköy'deki romantik bir restoranda akşam yemeği yiyin"
    ]
  }
}
```

## Lokasyon API'leri

### Gizli Hazineler Alma

```
GET /api/locations/hidden-treasures
```

**Sorgu Parametreleri:**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| lat | number | Merkez noktanın enlem değeri |
| lng | number | Merkez noktanın boylam değeri |
| radius | number | Arama yarıçapı (metre cinsinden) |
| interests | string | Virgülle ayrılmış ilgi alanları |
| limit | number | Döndürülecek maksimum sonuç sayısı (varsayılan: 10) |

**Başarılı Yanıt:**

```json
{
  "treasures": [
    {
      "id": "treasure123",
      "name": "Pierre Loti Café",
      "type": "cafe",
      "location": {
        "lat": 41.0294,
        "lng": 28.9419
      },
      "description": "Haliç'in muhteşem manzarasına sahip tarihi bir kafe.",
      "localTips": [
        "Gün batımından hemen önce gidin",
        "Türk kahvesi sipariş edin"
      ],
      "photos": ["https://example.com/photos/pierre-loti-1.jpg"],
      "discoveryRate": 0.15,
      "distance": 2800
    }
  ],
  "total": 1,
  "nextPage": null
}
```

### Yerel Lezzetler Alma

```
GET /api/locations/culinary
```

**Sorgu Parametreleri:**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| lat | number | Merkez noktanın enlem değeri |
| lng | number | Merkez noktanın boylam değeri |
| radius | number | Arama yarıçapı (metre cinsinden) |
| category | string | Kategori (restaurants, cafes, street-food, desserts) |
| priceLevel | string | Fiyat seviyesi (low, medium, high) |
| limit | number | Döndürülecek maksimum sonuç sayısı (varsayılan: 10) |

**Başarılı Yanıt:**

```json
{
  "places": [
    {
      "id": "food123",
      "name": "Sultanahmet Köftecisi",
      "type": "restaurant",
      "category": "Turkish",
      "location": {
        "lat": 41.0086,
        "lng": 28.9775
      },
      "description": "1920'den beri hizmet veren meşhur köfteci.",
      "specialty": "Köfte (Turkish meatballs)",
      "priceLevel": 2,
      "rating": 4.7,
      "reviews": 1243,
      "photos": ["https://example.com/photos/sultanahmet-koftecisi-1.jpg"],
      "openingHours": {
        "monday": "09:00-22:00",
        "tuesday": "09:00-22:00",
        "wednesday": "09:00-22:00",
        "thursday": "09:00-22:00",
        "friday": "09:00-22:00",
        "saturday": "09:00-22:00",
        "sunday": "09:00-22:00"
      },
      "distance": 250
    }
  ],
  "total": 1,
  "nextPage": null
}
```

### Kalabalık Verileri Alma

```
GET /api/locations/crowd
```

**Sorgu Parametreleri:**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| placeIds | string | Virgülle ayrılmış yer kimlikleri |
| type | string | Veri tipi (realtime, forecast, weekly) |

**Başarılı Yanıt:**

```json
{
  "crowdData": [
    {
      "placeId": "poi123",
      "name": "Hagia Sophia",
      "realtime": {
        "crowdLevel": "high",
        "waitTime": 45,
        "currentVisitors": 850,
        "capacity": 1000,
        "trend": "increasing",
        "lastUpdated": "2025-04-07T13:15:00Z"
      },
      "forecast": {
        "today": [
          {
            "hour": "09:00",
            "crowdLevel": "medium"
          },
          {
            "hour": "10:00",
            "crowdLevel": "high"
          }
        ],
        "bestTimeToday": "17:00"
      },
      "weekly": {
        "days": [
          {
            "day": "Monday",
            "crowdLevel": "medium"
          },
          {
            "day": "Tuesday",
            "crowdLevel": "low"
          }
        ],
        "bestDay": "Tuesday"
      }
    }
  ]
}
```

## Kullanıcı API'leri

### Kullanıcı Profili Alma

```
GET /api/users/profile
```

**Başarılı Yanıt:**

```json
{
  "id": "user123",
  "name": "Ahmet Yılmaz",
  "email": "ahmet@ornek.com",
  "preferences": {
    "interests": ["history", "art", "food"],
    "transportMode": "walking",
    "language": "tr",
    "currency": "TRY"
  },
  "stats": {
    "placesVisited": 27,
    "totalDistance": 42500,
    "countries": 3,
    "cities": 5
  }
}
```

### Kullanıcı Tercihlerini Güncelleme

```
PUT /api/users/preferences
```

**İstek Gövdesi:**

```json
{
  "interests": ["history", "art", "food", "nature"],
  "transportMode": "transit",
  "language": "en",
  "currency": "USD"
}
```

**Başarılı Yanıt:**

```json
{
  "preferences": {
    "interests": ["history", "art", "food", "nature"],
    "transportMode": "transit",
    "language": "en",
    "currency": "USD"
  },
  "updated": true
}
```

### Ziyaret Geçmişi Alma

```
GET /api/users/history
```

**Sorgu Parametreleri:**

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| limit | number | Döndürülecek maksimum sonuç sayısı (varsayılan: 20) |
| offset | number | Atlanacak sonuç sayısı (sayfalama için) |

**Başarılı Yanıt:**

```json
{
  "history": [
    {
      "placeId": "poi123",
      "name": "Hagia Sophia",
      "visitDate": "2025-04-05T14:30:00Z",
      "duration": 75,
      "rating": 5,
      "notes": "Muhteşem bir mimari",
      "photos": ["https://example.com/user-photos/hagia-sophia-1.jpg"]
    }
  ],
  "total": 1,
  "nextPage": null
}
```

### Kaydetme ve Planlama

```
POST /api/users/saved-places
```

**İstek Gövdesi:**

```json
{
  "placeId": "poi123",
  "listType": "wishlist",
  "notes": "Bir sonraki İstanbul ziyaretimde mutlaka görmeliyim"
}
```

**Başarılı Yanıt:**

```json
{
  "id": "saved123",
  "placeId": "poi123",
  "name": "Hagia Sophia",
  "listType": "wishlist",
  "notes": "Bir sonraki İstanbul ziyaretimde mutlaka görmeliyim",
  "savedAt": "2025-04-07T13:30:00Z"
}
```

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| 400 | Bad Request - İstek parametreleri geçersiz |
| 401 | Unauthorized - Kimlik doğrulama başarısız |
| 403 | Forbidden - Yetkisiz erişim |
| 404 | Not Found - Kaynak bulunamadı |
| 429 | Too Many Requests - İstek limiti aşıldı |
| 500 | Internal Server Error - Sunucu hatası |

**Hata Yanıtı Örneği:**

```json
{
  "error": {
    "code": 400,
    "message": "Invalid parameters",
    "details": "The 'lat' parameter must be between -90 and 90"
  }
}
```

## Sınırlamalar ve Kotalar

- Standart kullanıcılar için dakikada 60 istek
- Premium kullanıcılar için dakikada 300 istek
- Çevrimdışı harita indirmeleri için günde 5 istek
- AR yönlendirme için günde 50 istek
- Yapay zeka sorguları için günde 100 istek

## Örnekler

### JavaScript ile Harita Noktaları Alma

```javascript
async function getPointsOfInterest() {
  const token = 'your-jwt-token';
  const response = await fetch('https://api.compass-navigator.com/api/map/points-of-interest?lat=41.0082&lng=28.9784&radius=1000&types=museum,restaurant', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  return data.points;
}
```

### Python ile Rota Hesaplama

```python
import requests
import json

def calculate_route(origin, destination, waypoints=None, transport_mode="walking"):
    token = "your-jwt-token"
    url = "https://api.compass-navigator.com/api/map/route"
    
    payload = {
        "origin": origin,
        "destination": destination,
        "transportMode": transport_mode
    }
    
    if waypoints:
        payload["waypoints"] = waypoints
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    return response.json()

# Kullanım örneği
origin = {"lat": 41.0082, "lng": 28.9784}
destination = {"lat": 41.0086, "lng": 28.9802}
route = calculate_route(origin, destination)
print(route)
```

### Swift ile Yapay Zeka Sorgusu

```swift
import Foundation

func askAIQuestion(query: String, location: [String: Double], completion: @escaping (Result<[String: Any], Error>) -> Void) {
    let token = "your-jwt-token"
    let url = URL(string: "https://api.compass-navigator.com/api/ai/query")!
    
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.addValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    
    let body: [String: Any] = [
        "query": query,
        "userLocation": location,
        "preferences": [
            "interests": ["history", "art", "food"],
            "language": "en"
        ]
    ]
    
    do {
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
    } catch {
        completion(.failure(error))
        return
    }
    
    URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            completion(.failure(error))
            return
        }
        
        guard let data = data else {
            completion(.failure(NSError(domain: "No data", code: 0)))
            return
        }
        
        do {
            if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                completion(.success(json))
            } else {
                completion(.failure(NSError(domain: "Invalid JSON", code: 0)))
            }
        } catch {
            completion(.failure(error))
        }
    }.resume()
}

// Kullanım örneği
let query = "İstanbul'da görülmesi gereken yerler nereler?"
let location = ["lat": 41.0082, "lng": 28.9784]

askAIQuestion(query: query, location: location) { result in
    switch result {
    case .success(let response):
        print(response)
    case .failure(let error):
        print("Error: \(error)")
    }
}
```

---

© 2025 Compass Navigator. Tüm hakları saklıdır.
