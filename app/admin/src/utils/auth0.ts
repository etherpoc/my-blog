import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  secret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || '',
  baseURL: process.env.AUTH0_BASE_URL || '',
  clientID: process.env.AUTH0_CLIENT_ID || '',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
  authorizationParams: {
    audience: process.env.AUTH0_AUDIENCE || '',
  },
});
