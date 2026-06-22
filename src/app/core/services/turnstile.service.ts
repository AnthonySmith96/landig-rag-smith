import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

type TurnstileRenderOptions = {
  sitekey: string;
  size: 'invisible' | 'normal' | 'compact' | 'flexible';
  action?: string;
  callback: (token: string) => void;
  'error-callback': () => void;
  'expired-callback': () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  execute: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

@Injectable({ providedIn: 'root' })
export class TurnstileService {
  private scriptPromise: Promise<TurnstileApi> | null = null;

  execute(container: HTMLElement): Promise<string> {
    if (!environment.turnstileSiteKey) {
      return Promise.reject(new Error('Turnstile site key is not configured.'));
    }

    return this.loadApi().then((api) => new Promise<string>((resolve, reject) => {
      let widgetId = '';

      const cleanup = (): void => {
        if (widgetId) {
          api.remove(widgetId);
        }
      };

      widgetId = api.render(container, {
        sitekey: environment.turnstileSiteKey,
        size: 'invisible',
        action: 'portfolio_chat',
        callback: (token: string) => {
          cleanup();
          resolve(token);
        },
        'error-callback': () => {
          cleanup();
          reject(new Error('Turnstile validation failed.'));
        },
        'expired-callback': () => {
          cleanup();
          reject(new Error('Turnstile token expired.'));
        }
      });

      api.execute(widgetId);
    }));
  }

  private loadApi(): Promise<TurnstileApi> {
    if (window.turnstile) {
      return Promise.resolve(window.turnstile);
    }

    if (this.scriptPromise) {
      return this.scriptPromise;
    }

    this.scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.turnstile) {
          resolve(window.turnstile);
          return;
        }
        reject(new Error('Turnstile API did not initialize.'));
      };
      script.onerror = () => reject(new Error('Turnstile API failed to load.'));
      document.head.appendChild(script);
    });

    return this.scriptPromise;
  }
}
