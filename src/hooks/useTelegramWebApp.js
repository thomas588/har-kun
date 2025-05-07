import { useState, useEffect } from 'react';

// Custom hook for interacting with the Telegram WebApp
export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState(null);
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [themeParams, setThemeParams] = useState(null);
  
  useEffect(() => {
    // Initialize the hook and try to access the Telegram WebApp
    const initWebApp = () => {
      try {
        // Check if the Telegram WebApp is available in the window
        if (window.Telegram && window.Telegram.WebApp) {
          const tgWebApp = window.Telegram.WebApp;
          
          // Initialize the WebApp
          tgWebApp.ready();
          
          // Get user data if available
          const initData = tgWebApp.initData || '';
          let userData = null;
          
          if (initData) {
            try {
              // In a real app, we would verify and parse the initData
              // For now, just try to extract user data
              const initDataUnsafe = tgWebApp.initDataUnsafe || {};
              userData = initDataUnsafe.user || null;
            } catch (error) {
              console.error('Error parsing initData:', error);
            }
          }
          
          // Set theme params
          const themeParams = tgWebApp.themeParams || null;
          
          // Update state
          setWebApp(tgWebApp);
          setUser(userData);
          setThemeParams(themeParams);
          setInitialized(true);
          
          // Expand the Web App to full height
          tgWebApp.expand();
          
          console.log('Telegram WebApp initialized:', tgWebApp);
        } else {
          console.log('Telegram WebApp not available. Running in browser mode.');
          setInitialized(true); // Mark as initialized anyway to continue app flow
        }
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
        setInitialized(true); // Mark as initialized anyway to continue app flow
      }
    };
    
    initWebApp();
  }, []);
  
  // Methods for interacting with the Telegram WebApp
  const methods = {
    // Show a popup in the Telegram app
    showPopup: (title, message, buttons = []) => {
      if (webApp) {
        webApp.showPopup({ title, message, buttons });
      } else {
        alert(`${title}: ${message}`);
      }
    },
    
    // Show an alert in the Telegram app
    showAlert: (message) => {
      if (webApp) {
        webApp.showAlert(message);
      } else {
        alert(message);
      }
    },
    
    // Show a confirmation dialog in the Telegram app
    showConfirm: (message, callback) => {
      if (webApp) {
        webApp.showConfirm(message, callback);
      } else {
        const result = window.confirm(message);
        if (callback) callback(result);
        return result;
      }
    },
    
    // Close the Web App
    close: () => {
      if (webApp) {
        webApp.close();
      }
    },
    
    // Enable/disable the back button
    enableBackButton: (enabled) => {
      if (webApp) {
        if (enabled) {
          webApp.enableBackButton();
        } else {
          webApp.disableBackButton();
        }
      }
    },
    
    // Set the main button parameters
    setMainButton: (params) => {
      if (webApp && webApp.MainButton) {
        const { text, color, textColor, isVisible, isActive, isProgressVisible } = params;
        
        if (text) webApp.MainButton.setText(text);
        if (color) webApp.MainButton.setBackgroundColor(color);
        if (textColor) webApp.MainButton.setTextColor(textColor);
        
        if (isVisible) {
          webApp.MainButton.show();
        } else {
          webApp.MainButton.hide();
        }
        
        if (isActive) {
          webApp.MainButton.enable();
        } else {
          webApp.MainButton.disable();
        }
        
        if (isProgressVisible) {
          webApp.MainButton.showProgress();
        } else {
          webApp.MainButton.hideProgress();
        }
      }
    },
    
    // Set a callback for the main button
    onMainButtonClick: (callback) => {
      if (webApp && webApp.MainButton) {
        webApp.MainButton.onClick(callback);
      }
    },
    
    // Haptic feedback methods
    haptic: {
      // Impact feedback
      impact: (style = 'medium') => {
        if (webApp && webApp.HapticFeedback) {
          switch (style) {
            case 'light':
              webApp.HapticFeedback.impactOccurred('light');
              break;
            case 'medium':
              webApp.HapticFeedback.impactOccurred('medium');
              break;
            case 'heavy':
              webApp.HapticFeedback.impactOccurred('heavy');
              break;
            case 'rigid':
              webApp.HapticFeedback.impactOccurred('rigid');
              break;
            case 'soft':
              webApp.HapticFeedback.impactOccurred('soft');
              break;
            default:
              webApp.HapticFeedback.impactOccurred('medium');
          }
        }
      },
      
      // Notification feedback
      notification: (type = 'success') => {
        if (webApp && webApp.HapticFeedback) {
          switch (type) {
            case 'error':
              webApp.HapticFeedback.notificationOccurred('error');
              break;
            case 'success':
              webApp.HapticFeedback.notificationOccurred('success');
              break;
            case 'warning':
              webApp.HapticFeedback.notificationOccurred('warning');
              break;
            default:
              webApp.HapticFeedback.notificationOccurred('success');
          }
        }
      },
      
      // Selection changed feedback
      selectionChanged: () => {
        if (webApp && webApp.HapticFeedback) {
          webApp.HapticFeedback.selectionChanged();
        }
      }
    }
  };
  
  return {
    webApp,
    user,
    initialized,
    themeParams,
    ...methods
  };
};
