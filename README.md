# Har Kun

Har Kun is an ecosystem of mini-applications designed to be used daily through Telegram Mini-WebApp platform.

## Project Overview

The main idea of this ecosystem is to create a network of mini-applications that users will use throughout the day, every day. These mini-applications operate on the Telegram Mini-WebApp platform and are presented as a Telegram bot.

Each mini-application performs a specific task within a limited scope, making the user experience streamlined and focused.

## Architecture

All mini-applications work with a centralized database that stores basic user information, global configurations, and subscription information. For their specific tasks, each mini-application works with a dedicated table that references the centralized tables.

The structure of the application relationship includes one unified application that provides access to each mini-application, while each mini-application also maintains autonomy from the unified application.

## Features

### Community Features
- Anonymous leaderboards to track user progress without exposing personal information
- Option to show/hide user from leaderboards and other lists

### Data Sharing
- Ability to share statistical data in Telegram chats
- Privacy controls for sharing features

### Stories
- Auto-creation of Telegram stories with user statistics
- User maintains control over publishing and customizing the stories

### User Guides
- Step-by-step guides for using mini-applications
- Visual instructions with screenshots and descriptions

### Monetization
- Donation system for free services
- Subscription plans for premium features
- Digital content marketplace with partner programs

## Payment Systems
- Direct payments through Telegram Stars
- Local payment systems (e.g., Payme) for UZS payments
- Future support for international payment systems (Visa/MasterCard)

## Mini Applications

1. **Har Kun: Tasbeeh** - Prayer counter, Islamic calendar, prayer times
2. **Har Kun: Hisob** - Financial tracking and management
3. **Har Kun: Mashg'ulot** - Exercise and activity planning
4. **Har Kun: Ta'lim** - Educational materials and courses
5. **Har Kun: Taomnoma** - Recipes and meal planning
6. **Har Kun: Kutubxona** - Digital library and reading materials
7. **Har Kun: Intizom** - Task and habit management
8. **Har Kun: Tabobat** - Health and wellness tracking
9. **Har Kun: Fayllar** - File storage and management

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
1. Clone the repository:
```
git clone https://github.com/your-username/har-kun.git
cd har-kun
```

2. Install dependencies:
```
npm install
# or
yarn install
```

3. Create a `.env` file with the following variables:
```
REACT_APP_API_URL=http://localhost:8000/api
```

4. Start the development server:
```
npm start
# or
yarn start
```

## Development Roadmap

1. Phase 1: Develop and release Har Kun: Tasbeeh
2. Phase 2: Add Har Kun: Hisob and Har Kun: Mashg'ulot
3. Phase 3: Add remaining mini-applications
4. Phase 4: Enhance community features and monetization

## Tech Stack

- React
- Ant Design
- Telegram Mini App API
- Axios for API calls
- i18next for internationalization
- Firebase for backend (optional)

## License

This project is proprietary and confidential. Unauthorized copying, use, distribution, or modification is strictly prohibited.

## Contact

For any inquiries, please contact [your-email@example.com](mailto:your-email@example.com)
