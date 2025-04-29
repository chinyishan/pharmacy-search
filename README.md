# 【Side Project】全台藥局口罩地圖查詢

![pharmacy](https://github.com/user-attachments/assets/976281db-1491-4da1-967c-d530c101165f)

## 專案簡介

測試
本專案旨在練習前端框架整合地圖應用，並實作實際資料渲染與互動操作功能。
透過串接藥局口罩庫存公開資料，使用者可以在地圖上快速查詢各地藥局的地理位置與即時口罩存量資訊。
專案以 Vite 作為開發建構工具，提升開發與打包效能。

## 使用技術與工具

- Vite：現代化前端建構工具
- Vue 3：前端框架，使用 Composition API 開發模式
- Leaflet.js：地圖套件，負責地圖渲染與標記管理
- fetch：資料請求與 API 串接
- SCSS：版面設計與樣式管理

## 專案功能

- 全台灣藥局位置地圖呈現
- 標記 (Marker) 顯示各藥局地點
- 點擊標記查看藥局詳細資訊與口罩庫存量
- 支援搜尋與定位附近藥局
- 地圖縮放、拖曳功能，提升使用體驗

## 專案啟動方式

```sh
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 編譯正式版
npm run build
```

## 資料來源

- 公開藥局口罩庫存資料（依據實際使用的政府或第三方 API）
- Leaflet 官方文件：https://leafletjs.com/
