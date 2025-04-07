# Compass Navigator - Dağıtım Rehberi

## İçindekiler

1. [Giriş](#giriş)
2. [Sistem Gereksinimleri](#sistem-gereksinimleri)
3. [Kurulum Adımları](#kurulum-adımları)
4. [Yapılandırma](#yapılandırma)
5. [Dağıtım Seçenekleri](#dağıtım-seçenekleri)
   - [Vercel ile Dağıtım](#vercel-ile-dağıtım)
   - [GitHub Pages ile Dağıtım](#github-pages-ile-dağıtım)
   - [Kendi Sunucunuzda Dağıtım](#kendi-sunucunuzda-dağıtım)
6. [SSL Sertifikası](#ssl-sertifikası)
7. [Domain Ayarları](#domain-ayarları)
8. [Bakım ve Güncellemeler](#bakım-ve-güncellemeler)
9. [Sorun Giderme](#sorun-giderme)
10. [Destek](#destek)

## Giriş

Bu rehber, Compass Navigator uygulamasının kurulum ve dağıtım sürecini adım adım açıklamaktadır. Rehber, geliştirme ortamının kurulumundan başlayarak, uygulamanın canlı ortama dağıtılmasına kadar tüm aşamaları kapsamaktadır.

## Sistem Gereksinimleri

### Geliştirme Ortamı

- Node.js 16.x veya üzeri
- npm 7.x veya üzeri
- Git

### Üretim Ortamı

- Node.js 16.x veya üzeri (sunucu dağıtımı için)
- HTTPS desteği
- 1 GB RAM (minimum)
- 10 GB disk alanı

## Kurulum Adımları

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/compass-navigator/compass-navigator.git
   cd compass-navigator
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Ortam değişkenlerini yapılandırın:
   - `.env.local.example` dosyasını `.env.local` olarak kopyalayın
   - Gerekli API anahtarlarını ve yapılandırma değerlerini girin

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

5. Tarayıcınızda `http://localhost:3000` adresine gidin.

## Yapılandırma

Compass Navigator, çeşitli ortam değişkenleri kullanarak yapılandırılabilir. Bu değişkenler `.env.local` dosyasında tanımlanmalıdır:

```
# Temel Yapılandırma
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Harita Servisleri
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Analitik
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Yapay Zeka Servisleri
NEXT_PUBLIC_AI_API_KEY=your_ai_api_key

# Dil Ayarları
NEXT_PUBLIC_DEFAULT_LANGUAGE=tr
```

## Dağıtım Seçenekleri

Compass Navigator, çeşitli platformlarda dağıtılabilir. En yaygın dağıtım seçenekleri aşağıda açıklanmıştır.

### Vercel ile Dağıtım

Vercel, Next.js uygulamaları için en kolay ve önerilen dağıtım platformudur.

1. [Vercel](https://vercel.com) hesabı oluşturun
2. Vercel CLI'yi yükleyin:
   ```bash
   npm i -g vercel
   ```
3. Proje dizininde oturum açın:
   ```bash
   vercel login
   ```
4. Projeyi dağıtın:
   ```bash
   vercel
   ```
5. Üretim dağıtımı için:
   ```bash
   vercel --prod
   ```

### GitHub Pages ile Dağıtım

GitHub Pages, statik web siteleri için ücretsiz bir hosting hizmetidir.

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

4. `out` dizinini GitHub Pages'e dağıtın:
   ```bash
   git checkout -b gh-pages
   git add out/ -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix out origin gh-pages
   ```

### Kendi Sunucunuzda Dağıtım

Kendi sunucunuzda dağıtım için Node.js sunucusu veya Docker kullanabilirsiniz.

#### Node.js Sunucusu ile Dağıtım

1. Projeyi derleyin:
   ```bash
   npm run build
   ```

2. Sunucuyu başlatın:
   ```bash
   npm run start
   ```

3. Sürekli çalışması için PM2 kullanabilirsiniz:
   ```bash
   npm install -g pm2
   pm2 start npm --name "compass-navigator" -- start
   ```

#### Docker ile Dağıtım

1. Dockerfile oluşturun:
   ```dockerfile
   FROM node:16-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. Docker imajı oluşturun:
   ```bash
   docker build -t compass-navigator .
   ```

3. Docker konteynerini çalıştırın:
   ```bash
   docker run -p 3000:3000 -d compass-navigator
   ```

## SSL Sertifikası

Compass Navigator, AR özellikleri için HTTPS gerektirir. SSL sertifikası edinmek için aşağıdaki seçenekleri kullanabilirsiniz:

### Let's Encrypt ile Ücretsiz SSL

1. Certbot'u yükleyin:
   ```bash
   sudo apt-get update
   sudo apt-get install certbot
   ```

2. SSL sertifikası alın:
   ```bash
   sudo certbot certonly --standalone -d your-domain.com
   ```

3. Nginx veya Apache yapılandırmanızda SSL sertifikasını kullanın.

### Cloudflare ile SSL

1. [Cloudflare](https://cloudflare.com) hesabı oluşturun
2. Domain'inizi Cloudflare'e ekleyin
3. SSL/TLS ayarlarından "Flexible" veya "Full" seçeneğini seçin

## Domain Ayarları

Özel bir domain adı kullanmak için aşağıdaki adımları izleyin:

1. Domain adı satın alın (örn. GoDaddy, Namecheap)
2. DNS ayarlarını dağıtım platformunuza yönlendirin:

   **Vercel için:**
   - A kaydı: @ -> 76.76.21.21
   - CNAME kaydı: www -> cname.vercel-dns.com

   **GitHub Pages için:**
   - CNAME kaydı: @ -> username.github.io
   - CNAME dosyası oluşturun ve `out` dizinine ekleyin

   **Kendi sunucunuz için:**
   - A kaydı: @ -> Sunucu IP adresi
   - CNAME kaydı: www -> your-domain.com

3. DNS değişikliklerinin yayılması için 24-48 saat bekleyin

## Bakım ve Güncellemeler

Compass Navigator'ı güncel tutmak için aşağıdaki adımları düzenli olarak uygulayın:

1. Bağımlılıkları güncelleyin:
   ```bash
   npm update
   ```

2. Güvenlik denetimi yapın:
   ```bash
   npm audit
   ```

3. Güvenlik açıklarını düzeltin:
   ```bash
   npm audit fix
   ```

4. Yeni özellikleri ve hata düzeltmelerini entegre edin:
   ```bash
   git pull origin main
   npm install
   npm run build
   ```

5. Düzenli yedekleme yapın:
   ```bash
   tar -czvf compass-navigator-backup-$(date +%Y%m%d).tar.gz .
   ```

## Sorun Giderme

### Yaygın Sorunlar ve Çözümleri

#### Derleme Hataları

**Sorun:** `npm run build` komutu hata veriyor.

**Çözüm:**
1. Node.js ve npm sürümlerini kontrol edin
2. Bağımlılıkları temizleyin ve yeniden yükleyin:
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

#### AR Özellikleri Çalışmıyor

**Sorun:** AR özellikleri tarayıcıda çalışmıyor.

**Çözüm:**
1. HTTPS kullandığınızdan emin olun
2. Tarayıcı konsolunda hataları kontrol edin
3. Cihazın AR desteğini kontrol edin (ARCore/ARKit)
4. Kamera izinlerini kontrol edin

#### API Bağlantı Hataları

**Sorun:** API istekleri başarısız oluyor.

**Çözüm:**
1. API URL'sini kontrol edin
2. API anahtarlarını kontrol edin
3. CORS ayarlarını kontrol edin
4. Ağ bağlantısını kontrol edin

### Hata Günlükleri

Hata günlüklerini kontrol etmek için:

- **Geliştirme ortamında:** Tarayıcı konsolunu ve terminal çıktısını kontrol edin
- **Üretim ortamında:** Sunucu günlüklerini kontrol edin:
  ```bash
  pm2 logs compass-navigator
  ```
  veya
  ```bash
  docker logs container_id
  ```

## Destek

Sorunlarınız veya sorularınız için:

- **E-posta:** support@compass-navigator.com
- **Web Sitesi:** www.compass-navigator.com/support
- **GitHub:** https://github.com/compass-navigator/compass-navigator/issues

---

© 2025 Compass Navigator. Tüm hakları saklıdır.
