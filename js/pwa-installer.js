// PWA Installation and Management Script
class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.installButton = null;
    this.isInstalled = false;
    
    this.init();
  }

  init() {
    console.log('PWA: Initializing PWA Installer...');
    
    // Check if already installed
    this.checkInstallStatus();
    
    // Register service worker
    this.registerServiceWorker();
    
    // Setup install prompt
    this.setupInstallPrompt();
    
    // Setup install button
    this.createInstallButton();
    
    // Show install button after delay for testing
    setTimeout(() => {
      console.log('PWA: Checking install status after delay...');
      if (!this.isInstalled) {
        console.log('PWA: App not installed, showing install button');
        this.showInstallButton();
        
        // Force show for debugging - remove in production
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
          console.log('PWA: Development mode - forcing install button visibility');
          this.forceShowInstallButton();
        }
      } else {
        console.log('PWA: App already installed');
      }
    }, 2000);
    
    // Setup update mechanism
    this.setupUpdateMechanism();
    
    // Debug info
    this.logDebugInfo();
  }

  checkInstallStatus() {
    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
      console.log('PWA: App is running in standalone mode');
    }
    
    // Check for iOS Safari standalone mode
    if (window.navigator.standalone === true) {
      this.isInstalled = true;
      console.log('PWA: App is running in iOS standalone mode');
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('PWA: Service Worker registered successfully', registration);
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          console.log('PWA: New service worker found');
          this.handleServiceWorkerUpdate(registration);
        });
        
      } catch (error) {
        console.error('PWA: Service Worker registration failed', error);
      }
    }
  }

  setupInstallPrompt() {
    console.log('PWA: Setting up install prompt listeners...');
    
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA: Install prompt triggered');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA: App installed successfully');
      this.isInstalled = true;
      this.hideInstallButton();
      this.showInstalledMessage();
    });
  }

  createInstallButton() {
    console.log('PWA: Creating install button...');
    
    // Create install button if not already installed
    if (!this.isInstalled && !document.querySelector('#pwa-install-button')) {
      console.log('PWA: Creating new install button');
      
      const installButton = document.createElement('button');
      installButton.id = 'pwa-install-button';
      installButton.innerHTML = '📱 Uygulamayı Yükle';
      installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: block;
        opacity: 1;
        transition: all 0.3s ease;
      `;
      
      installButton.addEventListener('click', () => this.installApp());
      installButton.addEventListener('mouseenter', () => {
        installButton.style.transform = 'scale(1.05)';
      });
      installButton.addEventListener('mouseleave', () => {
        installButton.style.transform = 'scale(1)';
      });
      
      document.body.appendChild(installButton);
      this.installButton = installButton;
      
      console.log('PWA: Install button created and added to DOM');
    } else {
      console.log('PWA: Install button not created - already installed or exists');
    }
  }

  showInstallButton() {
    if (this.installButton && !this.isInstalled) {
      this.installButton.style.display = 'block';
      
      // Animate in
      setTimeout(() => {
        this.installButton.style.opacity = '1';
        this.installButton.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  hideInstallButton() {
    if (this.installButton) {
      this.installButton.style.display = 'none';
    }
  }

  async installApp() {
    console.log('PWA: Install button clicked');
    
    if (!this.deferredPrompt) {
      console.log('PWA: No install prompt available - showing manual instructions');
      this.showManualInstallInstructions();
      return;
    }

    try {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA: User accepted the install prompt');
      } else {
        console.log('PWA: User dismissed the install prompt');
      }
      
      this.deferredPrompt = null;
    } catch (error) {
      console.error('PWA: Install failed', error);
    }
  }

  showManualInstallInstructions() {
    const instructions = document.createElement('div');
    instructions.id = 'pwa-manual-instructions';
    instructions.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        color: #333;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 1001;
        max-width: 400px;
        text-align: center;
      ">
        <h3 style="margin: 0 0 16px 0; color: #667eea;">📱 Uygulamayı Yükleyin</h3>
        <p style="margin: 0 0 16px 0; font-size: 14px;">
          Chrome menüsünden (⋮) "Uygulama yükle" seçeneğini kullanın
        </p>
        <p style="margin: 0 0 16px 0; font-size: 12px; color: #666;">
          Veya adres çubuğundaki yükleme iconuna tıklayın
        </p>
        <button onclick="document.body.removeChild(document.getElementById('pwa-manual-instructions'))" style="
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        ">Tamam</button>
      </div>
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
      " onclick="document.body.removeChild(document.getElementById('pwa-manual-instructions'))"></div>
    `;
    
    document.body.appendChild(instructions);
  }

  showInstalledMessage() {
    // Show a temporary success message
    const message = document.createElement('div');
    message.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1001;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      ">
        ✅ Uygulama başarıyla yüklendi!
      </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      document.body.removeChild(message);
    }, 3000);
  }

  handleServiceWorkerUpdate(registration) {
    const newWorker = registration.installing;
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New update available
        this.showUpdateAvailable();
      }
    });
  }

  showUpdateAvailable() {
    const updateBanner = document.createElement('div');
    updateBanner.id = 'pwa-update-banner';
    updateBanner.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff9800;
        color: white;
        padding: 12px;
        text-align: center;
        z-index: 1002;
        font-weight: bold;
      ">
        🔄 Yeni güncelleme mevcut! 
        <button onclick="window.location.reload()" style="
          background: white;
          color: #ff9800;
          border: none;
          padding: 4px 12px;
          border-radius: 4px;
          margin-left: 10px;
          cursor: pointer;
          font-weight: bold;
        ">Güncelle</button>
      </div>
    `;
    
    document.body.appendChild(updateBanner);
  }

  setupUpdateMechanism() {
    // Check for updates every 30 minutes
    setInterval(() => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
      }
    }, 30 * 60 * 1000);
  }

  logDebugInfo() {
    console.group('PWA Debug Information');
    console.log('User Agent:', navigator.userAgent);
    console.log('Protocol:', window.location.protocol);
    console.log('Hostname:', window.location.hostname);
    console.log('Display Mode:', window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser');
    console.log('iOS Standalone:', window.navigator.standalone);
    console.log('Is Installed:', this.isInstalled);
    console.log('Deferred Prompt Available:', !!this.deferredPrompt);
    
    // Check manifest
    const manifestLink = document.querySelector('link[rel="manifest"]');
    console.log('Manifest Link:', manifestLink ? manifestLink.href : 'Not found');
    
    // Check service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        console.log('Service Worker Registration:', registration ? 'Active' : 'Not registered');
      });
    }
    
    console.groupEnd();
  }

  forceShowInstallButton() {
    console.log('PWA: Force showing install button for development/testing');
    if (this.installButton) {
      this.installButton.style.display = 'block';
      this.installButton.style.opacity = '1';
      this.installButton.style.pointerEvents = 'auto';
      
      // Add development indicator
      if (!this.installButton.querySelector('.dev-indicator')) {
        const devIndicator = document.createElement('span');
        devIndicator.className = 'dev-indicator';
        devIndicator.textContent = ' (DEV)';
        devIndicator.style.fontSize = '0.8em';
        devIndicator.style.opacity = '0.7';
        this.installButton.appendChild(devIndicator);
      }
    }
  }

  // Public methods for manual control
  async checkForUpdates() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.update();
      }
    }
  }

  async unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.unregister();
      }
    }
  }
}

// Initialize PWA functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.pwaInstaller = new PWAInstaller();
});

// iOS Safari specific handling
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  document.addEventListener('DOMContentLoaded', () => {
    // Show iOS install instructions if not already installed
    if (!window.navigator.standalone && !sessionStorage.getItem('iosInstallPromptShown')) {
      setTimeout(() => {
        const iosPrompt = document.createElement('div');
        iosPrompt.innerHTML = `
          <div style="
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #667eea;
            color: white;
            padding: 16px;
            text-align: center;
            z-index: 1003;
          ">
            <div style="margin-bottom: 8px;">📱 Bu uygulamayı ana ekranınıza ekleyin!</div>
            <div style="font-size: 12px; opacity: 0.9;">
              Safari'de ⬆️ paylaş butonuna basın ve "Ana Ekrana Ekle"yi seçin
            </div>
            <button onclick="this.parentElement.style.display='none'; sessionStorage.setItem('iosInstallPromptShown', 'true');" style="
              position: absolute;
              top: 8px;
              right: 12px;
              background: none;
              border: none;
              color: white;
              font-size: 18px;
              cursor: pointer;
            ">×</button>
          </div>
        `;
        
        document.body.appendChild(iosPrompt);
        
        // Auto hide after 10 seconds
        setTimeout(() => {
          if (iosPrompt.parentElement) {
            iosPrompt.style.display = 'none';
            sessionStorage.setItem('iosInstallPromptShown', 'true');
          }
        }, 10000);
        
      }, 2000);
    }
  });
}
