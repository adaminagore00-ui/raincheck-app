# RainCheck - Electron Desktop App (Windows) - Scaffold

Bu proje, modern bir Electron uygulaması içinde React arayüzü ve Python (FastAPI) backend'i barındıracak şekilde hazırlanmıştır.
Bu scaffold **exe** oluşturmak için gerekli dosyaları içerir fakat son paketi (Windows .exe) senin bilgisayarında derlemen gerekir.
Aşağıda adım adım Windows için "tam paket" oluşturma rehberi yer alır.

## Özet
- Frontend: React + Vite (build -> `frontend/dist`)
- Backend: FastAPI (`backend/app`) -> üretimde `backend/backend.exe` olarak PyInstaller ile paketlenecek
- Electron: `electron` klasörü içinde ana süreç; üretimde frontend dist'i yükler ve backend.exe'i başlatır
- Paketleme aracı: `electron-builder` (Windows installer/EXE üretir)

---
## 1) Ön koşullar (Windows)
- Node.js (LTS) kurulu (https://nodejs.org)
- Python 3.10+ kurulu (https://www.python.org) ve PATH'e ekli
- PyInstaller: `pip install pyinstaller`
- electron-builder için Windows'ta gerekli: `npm install -g electron-builder` (veya proje bağımlılığı olarak kullan)
- Git (opsiyonel)

## 2) Adım adım: Uygulamayı derle ve .exe oluştur (Windows)
Aşağıdaki komutları *proje kökünden* (electron-raincheck) çalıştır.

### 2.1 Frontend'i build et
```bash
cd frontend
npm install
npm run build
# çıktı -> frontend/dist
cd ..
```

### 2.2 Backend'i tek bir `.exe` haline getir (PyInstaller)
Backend Python paketlerini yükle, .env dosyasını ayarla, sonra PyInstaller ile paketle.
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
# .env dosyasını oluştur: OPENWEATHER_API_KEY=senin_api_anahtarın
pyinstaller --onefile -n backend.exe app\main.py
# Oluşan dosya -> backend\dist\backend.exe
cd ..
```

> NOT: PyInstaller komutu backend'deki yol yapısına göre ayarlanmıştır. Eğer sorun olursa README'deki ek notlara bak.

### 2.3 Electron paketini hazırla ve derle
Örnek olarak aşağıdakiları yap:
```bash
cd electron
npm install
# electron-builder ile paketle (Windows için)
npm run build:win
# veya global electron-builder yüklüyse:
# electron-builder --win nsis
```

`electron` projesi `resources` içine `frontend/dist` ve `backend/dist/backend.exe` koyduğunda, oluşturulan installer/EXE backend.exe'i başlatacak.

---
## 3) Test (derlenmemiş halde çalıştırma, geliştirme)
Geliştirme aşamasında aşağıları kullanabilirsin:
1. Backend (dev): `cd backend` -> sanal ortam -> `uvicorn app.main:app --reload --port 8000`
2. Frontend (dev): `cd frontend` -> `npm install` -> `npm run dev`
3. Electron (dev): `cd electron` -> `npm install` -> `npm run start`

Bu durumda Electron, frontend dev sunucusuna (`http://localhost:5173`) bağlanacak. Üretimde Electron build'i `file://` üzerinden `frontend/dist/index.html` yükler.

---
## 4) Önemli notlar
- Son .exe paketini oluşturmak için Windows ortamında PyInstaller (backend) ve electron-builder (frontend+electron) çalıştırılması gerekir.
- Ben bu scaffold'u hazırladım; eğer istersen ben adım adım terminal komutlarını çalıştırmana rehberlik ederim ya da uzaktan ekran paylaşımı yapmadan komutları sırayla verebilirim.
