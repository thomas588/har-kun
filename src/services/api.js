import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('harKunAuthToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('harKunAuthToken');
      localStorage.removeItem('harKunUser');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication endpoints
const auth = {
  login: (username, password) => {
    return api.post('/auth/login', { username, password });
  },
  
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  logout: () => {
    return api.post('/auth/logout');
  },
  
  forgotPassword: (email) => {
    return api.post('/auth/forgot-password', { email });
  },
  
  resetPassword: (token, password) => {
    return api.post('/auth/reset-password', { token, password });
  },
  
  changePassword: (currentPassword, newPassword) => {
    return api.post('/auth/change-password', { currentPassword, newPassword });
  },
  
  verifyToken: () => {
    return api.get('/auth/verify-token');
  }
};

// User profile endpoints
const users = {
  getProfile: () => {
    return api.get('/users/profile');
  },
  
  updateProfile: (profileData) => {
    return api.put('/users/profile', profileData);
  },
  
  updateSettings: (settings) => {
    return api.put('/users/settings', settings);
  },
  
  getSettings: () => {
    return api.get('/users/settings');
  },
  
  deleteAccount: () => {
    return api.delete('/users/account');
  },
  
  downloadData: () => {
    return api.get('/users/data-export');
  }
};

// Tasbeeh endpoints
const tasbeeh = {
  saveCounter: (counterData) => {
    return api.post('/tasbeeh/counter', counterData);
  },
  
  getCounterHistory: () => {
    return api.get('/tasbeeh/history');
  },
  
  getPrayerTimes: (date, city) => {
    return api.get('/tasbeeh/prayer-times', { params: { date, city } });
  },
  
  getIslamicCalendar: (month, year) => {
    return api.get('/tasbeeh/islamic-calendar', { params: { month, year } });
  },
  
  getImportantDates: () => {
    return api.get('/tasbeeh/important-dates');
  },
  
  shareStatistics: (chatId, statistics) => {
    return api.post('/tasbeeh/share', { chatId, statistics });
  }
};

// Hisob endpoints
const hisob = {
  getTransactions: (startDate, endDate) => {
    return api.get('/hisob/transactions', { params: { startDate, endDate } });
  },
  
  addTransaction: (transactionData) => {
    return api.post('/hisob/transactions', transactionData);
  },
  
  updateTransaction: (id, transactionData) => {
    return api.put(`/hisob/transactions/${id}`, transactionData);
  },
  
  deleteTransaction: (id) => {
    return api.delete(`/hisob/transactions/${id}`);
  },
  
  getCategories: () => {
    return api.get('/hisob/categories');
  },
  
  calculateZakat: (assets) => {
    return api.post('/hisob/zakat', assets);
  }
};

// Mashgulot endpoints
const mashgulot = {
  getActivities: () => {
    return api.get('/mashgulot/activities');
  },
  
  addActivity: (activityData) => {
    return api.post('/mashgulot/activities', activityData);
  },
  
  updateActivity: (id, activityData) => {
    return api.put(`/mashgulot/activities/${id}`, activityData);
  },
  
  deleteActivity: (id) => {
    return api.delete(`/mashgulot/activities/${id}`);
  },
  
  getRoutines: () => {
    return api.get('/mashgulot/routines');
  },
  
  addRoutine: (routineData) => {
    return api.post('/mashgulot/routines', routineData);
  },
  
  updateRoutine: (id, routineData) => {
    return api.put(`/mashgulot/routines/${id}`, routineData);
  },
  
  deleteRoutine: (id) => {
    return api.delete(`/mashgulot/routines/${id}`);
  }
};

// Talim endpoints
const talim = {
  getCourses: () => {
    return api.get('/talim/courses');
  },
  
  getCourseDetails: (id) => {
    return api.get(`/talim/courses/${id}`);
  },
  
  enrollCourse: (courseId) => {
    return api.post('/talim/enroll', { courseId });
  },
  
  getEnrolledCourses: () => {
    return api.get('/talim/enrolled');
  },
  
  getProgress: (courseId) => {
    return api.get(`/talim/progress/${courseId}`);
  },
  
  updateProgress: (courseId, lessonId, progress) => {
    return api.post('/talim/progress', { courseId, lessonId, progress });
  }
};

// Taomnoma endpoints
const taomnoma = {
  getRecipes: (filters) => {
    return api.get('/taomnoma/recipes', { params: filters });
  },
  
  getRecipeDetails: (id) => {
    return api.get(`/taomnoma/recipes/${id}`);
  },
  
  getFavoriteRecipes: () => {
    return api.get('/taomnoma/favorites');
  },
  
  addToFavorites: (recipeId) => {
    return api.post('/taomnoma/favorites', { recipeId });
  },
  
  removeFromFavorites: (recipeId) => {
    return api.delete(`/taomnoma/favorites/${recipeId}`);
  },
  
  getMealPlans: () => {
    return api.get('/taomnoma/meal-plans');
  },
  
  createMealPlan: (mealPlanData) => {
    return api.post('/taomnoma/meal-plans', mealPlanData);
  }
};

// Kutubxona endpoints
const kutubxona = {
  getBooks: (filters) => {
    return api.get('/kutubxona/books', { params: filters });
  },
  
  getBookDetails: (id) => {
    return api.get(`/kutubxona/books/${id}`);
  },
  
  getFavoriteBooks: () => {
    return api.get('/kutubxona/favorites');
  },
  
  addToFavorites: (bookId) => {
    return api.post('/kutubxona/favorites', { bookId });
  },
  
  removeFromFavorites: (bookId) => {
    return api.delete(`/kutubxona/favorites/${bookId}`);
  },
  
  getReadingProgress: (bookId) => {
    return api.get(`/kutubxona/progress/${bookId}`);
  },
  
  updateReadingProgress: (bookId, progress) => {
    return api.post('/kutubxona/progress', { bookId, progress });
  }
};

// Other mini-app endpoints can be added here...

// Export all endpoints
export default {
  auth,
  users,
  tasbeeh,
  hisob,
  mashgulot,
  talim,
  taomnoma,
  kutubxona
};
