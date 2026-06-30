export const environment = {
  production: true,
  pocketBaseUrl: (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port === '4200')
    ? 'http://127.0.0.1:8090'
    : 'https://anthonysmith.org',
  turnstileSiteKey: '0x4AAAAAADtEWqxV9_k_mbhG'
};
