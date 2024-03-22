export const CONFIG = {
    NEW_RELIC_LICENSE_KEY: process.env.NEXT_PUBLIC_NEW_RELIC_APP_NAME || 'NRBR-d57304e816a4043fbfb',
    NEW_RELIC_ACCOUNT_ID: process.env.NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID || '4170314',
    // Default to portal-2-local App ID
    NEW_RELIC_APP_ID: process.env.NEXT_PUBLIC_NEW_RELIC_APP_ID || '1134393025'
};

// ODE uses API_BASE_URL from globals
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-dev.carbonmapper.org/api/v1';
export const MS_ENTRA_CLIENT_ID = process.env.NEXT_PUBLIC_MS_ENTRA_CLIENT_ID;
export const MS_ENTRA_TENANT_ID = process.env.NEXT_PUBLIC_MS_ENTRA_TENANT_ID;
export const MS_ENTRA_REDIRECT_URL = process.env.NEXT_PUBLIC_MS_ENTRA_REDIRECT_URL;
export const MS_SESSION_STORAGE_KEY = `msal.token.keys.${MS_ENTRA_CLIENT_ID}`;
