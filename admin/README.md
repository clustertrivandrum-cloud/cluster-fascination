# 🎛️ Cluster Fascination - Admin Dashboard

> Production-ready admin panel for managing your e-commerce platform

[![Deployment Status](https://img.shields.io/badge/deployment-ready-brightgreen)](./DEPLOYMENT_SUMMARY.md)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.13-purple)](https://mui.com/)

---

## 🚨 Quick Deployment Fix

**If your admin dashboard is not loading on Render**, follow these steps:

### 🔥 Immediate Fix (Choose One)

#### Option A: Update Existing Service (5 min)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Find your admin service → **Settings**
3. Update:
   - Build: `npm install && npm run build && npm install -g serve`
   - Start: `serve -s build -p $PORT`
4. Environment → Add: `REACT_APP_API_URL = https://www.clusterfascination.com`
5. Click **"Manual Deploy"**

#### Option B: Create Static Site (10 min) ⭐ RECOMMENDED

1. [Render Dashboard](https://dashboard.render.com) → **New +** → **Static Site**
2. Configure:
   - Root Directory: `admin`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
3. Environment: `REACT_APP_API_URL = https://www.clusterfascination.com`
4. **Create Static Site**

📖 **Detailed Instructions**: See [`QUICK_FIX.md`](./QUICK_FIX.md)

---

## 📁 Project Structure

```
admin/
├── public/
│   ├── _redirects           # SPA routing (Render/Netlify)
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/              # CSS, themes, images
│   ├── components/          # Reusable UI components
│   ├── context/             # React context providers
│   ├── examples/            # Example components
│   ├── layouts/             # Page layouts
│   ├── pages/               # Page components
│   │   ├── Auth/            # Login/Register
│   │   ├── Banner/          # Banner management
│   │   ├── Blogs/           # Blog management
│   │   ├── Category/        # Category management
│   │   ├── Dashboard/       # Main dashboard
│   │   ├── Orders/          # Order management
│   │   ├── Products/        # Product management
│   │   └── Settings/        # Settings
│   ├── queries/             # React Query hooks
│   ├── utils/               # Helper functions
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   └── routes.js            # Route configuration
├── .env.production          # Production environment
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── render.yaml              # Render deployment config
├── netlify.toml             # Netlify deployment config
└── README.md                # This file
```

---

## 🚀 Quick Start

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (copy from .env.example)
cp .env.example .env.local

# 3. Update .env.local with your backend URL
REACT_APP_API_URL=http://localhost:3000

# 4. Start development server
npm start

# 5. Open browser
# http://localhost:3001
```

### Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm install -g serve
serve -s build
```

---

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
REACT_APP_API_URL=http://localhost:3000
```

For production (set in Render/Netlify):

```env
REACT_APP_API_URL=https://www.clusterfascination.com
```

⚠️ **Important**:

- Variable must start with `REACT_APP_`
- No trailing slash in URL
- Changes require rebuild

---

## 📦 Tech Stack

| Category             | Technology                 |
| -------------------- | -------------------------- |
| **Framework**        | React 18                   |
| **UI Library**       | Material-UI 5.13           |
| **Styling**          | Emotion, Styled Components |
| **Routing**          | React Router 6             |
| **State Management** | React Query, Context API   |
| **HTTP Client**      | Axios                      |
| **Charts**           | Chart.js, React-ChartJS-2  |
| **File Upload**      | Dropzone                   |
| **Notifications**    | React Hot Toast            |
| **Build Tool**       | Create React App           |

---

## 🎨 Features

### ✅ Core Functionality

- 🔐 Admin authentication (JWT)
- 📊 Dashboard analytics
- 🛍️ Product management (CRUD)
- 📦 Order management
- 👥 User management
- 📝 Blog management
- 🏷️ Category management
- 🎨 Banner management
- ⚙️ Settings configuration

### ✅ Technical Features

- 📱 Responsive design
- 🌗 Dark/Light theme support
- 🔄 Real-time data updates
- 📊 Interactive charts
- 🖼️ Image upload with preview
- 📄 Pagination
- 🔍 Search & filters
- ✨ Toast notifications
- 🔒 Protected routes
- 🌐 CORS-ready API integration

---

## 🌐 Deployment

### Render (Recommended)

**Full Guide**: [`RENDER_DEPLOYMENT_GUIDE.md`](./RENDER_DEPLOYMENT_GUIDE.md)

#### Using Static Site

```yaml
Type: Static Site
Build Command: npm install && npm run build
Publish Directory: build
Root Directory: admin
Environment:
  REACT_APP_API_URL: https://www.clusterfascination.com
```

#### Using Blueprint (render.yaml)

```bash
# Commit changes
git add .
git commit -m "Deploy admin dashboard"
git push

# In Render: Blueprints → New Blueprint Instance
```

### Netlify (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Configuration in [`netlify.toml`](./netlify.toml)

---

## 🔒 Backend CORS Setup

Your backend must allow the admin domain:

```javascript
// server/app.js
const allowedOrigins = [
  "https://www.admin.clusterfascination.com",
  "https://admin.clusterfascination.com",
  // ... other origins
];
```

Environment variable:

```env
ADMIN_URL=https://www.admin.clusterfascination.com
```

📖 **Backend CORS Guide**: [`/server/CORS_FIX_DEPLOYMENT_GUIDE.md`](../server/CORS_FIX_DEPLOYMENT_GUIDE.md)

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Build Test

```bash
npm run build
# Verify no errors in build output
```

### API Connection Test

```javascript
// In browser console after login
console.log(process.env.REACT_APP_API_URL);
// Should output your backend URL
```

---

## 📖 Documentation

| Document                                                       | Purpose               |
| -------------------------------------------------------------- | --------------------- |
| [`QUICK_FIX.md`](./QUICK_FIX.md)                               | Fast deployment fix   |
| [`DEPLOYMENT_SUMMARY.md`](./DEPLOYMENT_SUMMARY.md)             | Executive summary     |
| [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md)         | Complete checklist    |
| [`RENDER_DEPLOYMENT_GUIDE.md`](./RENDER_DEPLOYMENT_GUIDE.md)   | Render-specific guide |
| [`THEME_FIX_COMPLETE_GUIDE.md`](./THEME_FIX_COMPLETE_GUIDE.md) | Theme customization   |

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### CORS Errors

1. Check `REACT_APP_API_URL` is correct
2. Verify backend CORS allows admin domain
3. Check backend logs for blocked origins

### 404 on Page Refresh

- Verify `_redirects` file exists in `public/`
- Content: `/* /index.html 200`

### Environment Variables Not Working

- Must start with `REACT_APP_`
- Rebuild after changing env vars
- Check Render/Netlify environment settings

---

## 📊 Performance

### Build Output

```
File sizes after gzip:
  50 KB   build/static/js/main.xxxxx.js
  2 KB    build/static/css/main.xxxxx.css
```

### Optimization

- ✅ Code splitting enabled
- ✅ Production build minified
- ✅ Assets optimized
- ✅ CDN delivery (via Render/Netlify)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

Private - Cluster Fascination © 2025

---

## 🆘 Support

### Issues?

1. **Check documentation** above
2. **Review logs** in Render/Netlify dashboard
3. **Test locally** to isolate issue
4. **Verify backend** is running
5. **Check CORS** configuration

### Common Issues

| Issue            | Solution                                   |
| ---------------- | ------------------------------------------ |
| Site not loading | Follow [`QUICK_FIX.md`](./QUICK_FIX.md)    |
| CORS errors      | Check backend `ADMIN_URL` env var          |
| Build failing    | Run `npm install && npm run build` locally |
| API 404          | Verify `REACT_APP_API_URL`                 |

---

## 🎯 Quick Links

- 🚀 [Quick Fix Guide](./QUICK_FIX.md)
- 📋 [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- 🔧 [Render Guide](./RENDER_DEPLOYMENT_GUIDE.md)
- 📊 [Deployment Summary](./DEPLOYMENT_SUMMARY.md)
- 🌐 [Production Site](https://www.admin.clusterfascination.com)
- 🔙 [Backend Repo](../server)

---

**Built with ❤️ for Cluster Fascination**

_Last Updated: 2025-10-23_
