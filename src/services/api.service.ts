import fetch from 'node-fetch'
import type { Response } from 'node-fetch'
import { API_CONFIG } from '../config/index.js'
import { AuthService } from './auth.service.js'
import { type MercadoLibreSearchResponse } from '../types/index.js'

export class ApiService {
  private readonly baseURL: string
  private readonly authService: AuthService

  constructor () {
    this.baseURL = 'https://api.mercadolibre.com/'
    this.authService = new AuthService()
  }

  private async getHeaders () {
    const token = await this.authService.getAccessToken()
    return {
      Authorization: `Bearer ${token}`
    }
  }

  async searchProducts (args: {
    query: string
    limit?: number
    offset?: number
  }) {
    const headers = await this.getHeaders()
    const queryParams = new URLSearchParams()
    queryParams.set('q', args.query)
    queryParams.set('limit', args.limit?.toString() ?? '')
    queryParams.set('offset', args.offset?.toString() ?? '')

    const response = await fetch(
      `${this.baseURL}sites/${API_CONFIG.siteId}/search?${queryParams.toString()}`,
      { headers }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json() as MercadoLibreSearchResponse
    return {
      paging: data.paging,
      results: data.results
    }
  }

  async sellerReputation (sellerId: string) {
    const headers = await this.getHeaders()
    const response = await fetch(`${this.baseURL}users/${sellerId}`, { headers })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }

  async productReviews (productId: string) {
    const headers = await this.getHeaders()
    const response = await fetch(`${this.baseURL}reviews/item/${productId}`, { headers })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }

  async productDescription (productId: string) {
    const headers = await this.getHeaders()
    const response = await fetch(`${this.baseURL}items/${productId}/description`, { headers })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }
}
