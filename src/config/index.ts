import dotenv from 'dotenv'
dotenv.config()

export const SERVER_CONFIG = {
  name: 'mercadolibre-mcp',
  version: '0.1.1',
  capabilities: {
    tools: {}
  }
}

export const API_CONFIG = {
  siteId: process.env.SITE_ID ?? 'MLA',
  auth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }
}
