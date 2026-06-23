export const environment = {
  production: true,
  pocketBaseUrl: (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port === '4200')
    ? 'http://127.0.0.1:8090'
    : '',
  turnstileSiteKey: '1x00000000000000000000BB'
};
