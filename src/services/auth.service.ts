import fetch from 'node-fetch'
import { API_CONFIG } from '../config/index.js'
import type { AuthResponse } from '../types/index.js'
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js'

export class AuthService {
  async getAccessToken (): Promise<string> {
    try {
      const response = await fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: API_CONFIG.auth.clientId,
          client_secret: API_CONFIG.auth.clientSecret
        })
      })

      if (!response.ok) {
        const errorData = await response.json() as { message?: string }
        throw new McpError(
          ErrorCode.InternalError,
          `MercadoLibre Auth error: ${errorData.message ?? response.statusText}`
        )
      }

      const data = await response.json() as AuthResponse
      return data.access_token
    } catch (error) {
      if (error instanceof McpError) {
        throw error
      }
      throw new McpError(
        ErrorCode.InternalError,
        `MercadoLibre Auth error: ${(error as Error).message}`
      )
    }
  }
}
