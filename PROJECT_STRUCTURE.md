# Har Kun Project Structure

This document provides an overview of the project structure and how different components interact with each other.

## Directory Structure

```
har-kun/
│
├── public/                    # Static files
│   ├── index.html            # Main HTML file
│   └── manifest.json         # Web app manifest
│
├── src/                       # Source code
│   ├── components/           # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   │   ├── AppHeader.js  # Application header
│   │   │   ├── AppSidebar.js # Application sidebar
│   │   │   └── AppFooter.js  # Application footer
│   │   │
│   │   └── tasbeeh/          # Tasbeeh-specific components
│   │       ├── Counter.js    # Prayer counter component
│   │       ├── PrayerTimes.js # Prayer times component
│   │       └── IslamicCalendar.js # Islamic calendar component
│   │
│   ├── contexts/             # React contexts
│   │   └── AuthContext.js    # Authentication context
│   │
│   ├── firebase/             # Firebase configuration
│   │   └── config.js         # Firebase setup
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useTelegramWebApp.js # Telegram WebApp integration
│   │
│   ├── i18n/                 # Internationalization
│   │   ├── index.js          # i18n configuration
│   │   └── locales/          # Translation files
│   │       ├── en.json       # English translations
│   │       ├── ru.json       # Russian translations
│   │       └── uz.json       # Uzbek translations
│   │
│   ├── pages/                # Application pages
│   │   ├── auth/             # Authentication pages
│   │   │   ├── Login.js      # Login page
│   │   │   └── Register.js   # Registration page
│   │   │
│   │   ├── Dashboard.js      # Dashboard page
│   │   ├── Tasbeeh.js        # Tasbeeh page
│   │   ├── Hisob.js          # Hisob page
│   │   ├── Mashgulot.js      # Mashgulot page
│   │   ├── Talim.js          # Talim page
│   │   ├── Taomnoma.js       # Taomnoma page
│   │   ├── Kutubxona.js      # Kutubxona page
│   │   ├── Intizom.js        # Intizom page
│   │   ├── Tabobat.js        # Tabobat page
│   │   ├── Fayllar.js        # Fayllar page
│   │   ├── Settings.js       # Settings page
│   │   └── NotFound.js       # 404 page
│   │
│   ├── services/             # API and service integration
│   │   └── api.js            # API service for backend communication
│   │
│   ├── App.js                # Main application component
│   ├── index.js              # Application entry point
│   └── index.css             # Global styles
│
├── .env                       # Environment variables
├── .gitignore                 # Git ignore configuration
├── package.json               # npm configuration
├── README.md                  # Project overview and documentation
└── PROJECT_STRUCTURE.md       # This file
```

## Component Interactions

1. **App Flow**:
   - `index.js` loads the application and sets up providers
   - `App.js` handles routing and layout structure
   - Layout components (`AppHeader`, `AppSidebar`, `AppFooter`) provide the visual framework
   - Pages (like `Dashboard`, `Tasbeeh`, etc.) render specific content

2. **Authentication Flow**:
   - `AuthContext` manages user authentication state
   - Auth pages (`Login`, `Register`) handle user credentials
   - `api.js` services contain authentication API calls

3. **Telegram Integration**:
   - `useTelegramWebApp` hook provides access to Telegram WebApp functionality
   - This hook is used throughout the application to interact with Telegram features

4. **Mini-App Pages**:
   - Each mini-app has its own page component (`Tasbeeh.js`, `Hisob.js`, etc.)
   - Some mini-apps have specific components in the `components/` directory

5. **Internationalization**:
   - `i18n/index.js` sets up translations
   - Translation files in `locales/` provide language-specific text
   - Components use the `useTranslation` hook to access translations

6. **API and Backend Communication**:
   - `services/api.js` provides structured API calls to the backend
   - Each mini-app has its own section of API endpoints

## Main Features Implementation

1. **Prayer Counter (Tasbeeh)**:
   - `components/tasbeeh/Counter.js` - Main counter functionality
   - `components/tasbeeh/PrayerTimes.js` - Prayer times display
   - `components/tasbeeh/IslamicCalendar.js` - Islamic calendar display

2. **Settings and Preferences**:
   - `pages/Settings.js` - User preferences and account settings
   - Settings are stored both locally and on the backend

3. **User Authentication**:
   - `contexts/AuthContext.js` - Authentication state management
   - `pages/auth/Login.js` and `pages/auth/Register.js` - Authentication forms
   - `services/api.js` (auth section) - Authentication API calls

## Development Workflow

1. Start with developing the Tasbeeh mini-app as it's the initial focus
2. Create reusable components that can be shared across mini-apps
3. Implement authentication and user profile management
4. Add internationalization support from the beginning
5. Build additional mini-apps one by one, following the roadmap

## Deployment Strategy

1. Set up CI/CD pipeline for automated testing and deployment
2. Configure Firebase hosting for frontend deployment
3. Set up backend deployment on appropriate server infrastructure
4. Configure Telegram Bot API integration for the mini WebApp

## Expansion and Maintenance

- New mini-apps can be added by creating new page components
- Shared functionality should be extracted into reusable components
- API endpoints for new features should be added to `services/api.js`
- Translations for new features should be added to all language files
