

const TOKEN_KEY = 'axios_token';
const USER_KEY = 'axis_user';
const TOKEN_EXPIRY_KEY = 'axios_token_expiry';
const SESSION_DURATION = 8 * 60 * 60 * 1000; 
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; 

export class AuthService {
  private inactivityTimer: NodeJS.Timeout | null = null;
  private activityListeners: Array<{ event: string; handler: EventListener }> = [];

  
  clearAllCache(): void {
    if (typeof window === 'undefined') return;

    const keysToRemove = [
      
      TOKEN_KEY,
      'axis_token', 
      USER_KEY,
      TOKEN_EXPIRY_KEY,

      
      'usuarioId',
      'userCpf',

      
      'axis_errors',

      
      'cadastro_temp',
      'form_progress',
      'form_data',
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }

  
  setToken(token: string, rememberMe: boolean = false): void {
    if (typeof window === 'undefined') return;

    const expiryTime = Date.now() + SESSION_DURATION;

    if (rememberMe) {
      
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    } else {
      
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    }

    
    this.startInactivityMonitor();
  }

  
  getToken(): string | null {
    if (typeof window === 'undefined') return null;

    
    let token = sessionStorage.getItem(TOKEN_KEY);
    let expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

    
    if (!token) {
      token = localStorage.getItem(TOKEN_KEY);
      expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    }

    
    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10);

      if (Date.now() > expiryTime) {
        this.clearAllCache();
        return null;
      }

      return token;
    }

    return null;
  }

  
  setUser(user: any, rememberMe: boolean = false): void {
    if (typeof window === 'undefined') return;

    const userData = JSON.stringify(user);

    if (rememberMe) {
      localStorage.setItem(USER_KEY, userData);
    } else {
      sessionStorage.setItem(USER_KEY, userData);
    }

    
    if (user.cpf) {
      if (rememberMe) {
        localStorage.setItem('userCpf', user.cpf);
      } else {
        sessionStorage.setItem('userCpf', user.cpf);
      }
    }
  }

  
  getUser(): any | null {
    if (typeof window === 'undefined') return null;

    try {
      
      let userData = sessionStorage.getItem(USER_KEY);

      
      if (!userData) {
        userData = localStorage.getItem(USER_KEY);
      }

      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      
      return null;
    }
  }

  
  isSessionValid(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  
  clearCadastroData(): void {
    if (typeof window === 'undefined') return;

    
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('userCpf');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');

    sessionStorage.removeItem('usuarioId');
    sessionStorage.removeItem('userCpf');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userPassword');

    
    sessionStorage.removeItem('questionarioFoco');
    sessionStorage.removeItem('fluxoContinuo');
  }

  
  logout(): void {
    this.stopInactivityMonitor();
    this.clearAllCache();
    this.clearCadastroData(); 
  }

  
  renewSession(): void {
    const token = this.getToken();
    if (!token) return;

    const isRememberMe = !!localStorage.getItem(TOKEN_KEY);
    const newExpiryTime = Date.now() + SESSION_DURATION;

    if (isRememberMe) {
      localStorage.setItem(TOKEN_EXPIRY_KEY, newExpiryTime.toString());
    } else {
      sessionStorage.setItem(TOKEN_EXPIRY_KEY, newExpiryTime.toString());
    }
  }

  
  private startInactivityMonitor(): void {
    if (typeof window === 'undefined') return;

    
    this.stopInactivityMonitor();

    const resetTimer = () => {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
      }

      this.inactivityTimer = setTimeout(() => {
        this.logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login?reason=inactivity';
        }
      }, INACTIVITY_TIMEOUT);
    };

    
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    activityEvents.forEach(eventName => {
      const handler = () => resetTimer();
      window.addEventListener(eventName, handler);
      this.activityListeners.push({ event: eventName, handler });
    });

    
    resetTimer();
  }

  
  private stopInactivityMonitor(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }

    
    if (typeof window !== 'undefined') {
      this.activityListeners.forEach(({ event, handler }) => {
        window.removeEventListener(event, handler);
      });
      this.activityListeners = [];
    }
  }

  
  setTemporaryData(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(key, value);
  }

  
  getTemporaryData(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(key);
  }
}


const authService = new AuthService();
export default authService;
