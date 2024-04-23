export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-dev.carbonmapper.org/api/v1';
export const MS_ENTRA_CLIENT_ID = process.env.NEXT_PUBLIC_MS_ENTRA_CLIENT_ID;
export const MS_ENTRA_TENANT_ID = process.env.NEXT_PUBLIC_MS_ENTRA_TENANT_ID;
export const MS_ENTRA_REDIRECT_URL = process.env.NEXT_PUBLIC_MS_ENTRA_REDIRECT_URL;
export const MS_SESSION_STORAGE_KEY = `msal.token.keys.${MS_ENTRA_CLIENT_ID}`;
