import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js'
import { ApiService } from '../services/api.service.js'

export class ToolsHandler {
  private readonly apiService: ApiService

  constructor () {
    this.apiService = new ApiService()
  }

  listTools () {
    return {
      tools: [
        {
          name: 'search_products',
          description: 'Busca productos en MercadoLibre',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Consulta de búsqueda'
              },
              limit: {
                type: 'number',
                description: 'Cantidad de resultados a devolver',
                default: 10
              },
              offset: {
                type: 'number',
                description: 'Cantidad de resultados a saltar',
                default: 0
              }
            },
            required: ['query']
          }
        },
        {
          name: 'seller_reputation',
          description: 'Obtiene la reputación de un vendedor',
          inputSchema: {
            type: 'object',
            properties: {
              sellerId: {
                type: 'string',
                description: 'ID del vendedor'
              }
            }
          }
        },
        {
          name: 'product_reviews',
          description: 'Obtiene las reseñas de un producto',
          inputSchema: {
            type: 'object',
            properties: {
              productId: { type: 'string', description: 'ID del producto' }
            }
          }
        },
        {
          name: 'product_description',
          description: 'Obtiene la descripción de un producto',
          inputSchema: { type: 'object', properties: { productId: { type: 'string', description: 'ID del producto' } } }
        }
      ]
    }
  }

  async callTool (name: string, args: any) {
    try {
      switch (name) {
        case 'search_products': {
          const { query, limit, offset } = args
          const products = await this.apiService.searchProducts({ query, limit, offset })
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(products, null, 2)
            }]
          }
        }

        case 'seller_reputation': {
          const { sellerId } = args as { sellerId: string }
          const reputation = await this.apiService.sellerReputation(sellerId)
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(reputation, null, 2)
            }]
          }
        }

        case 'product_reviews': {
          const { productId } = args as { productId: string }
          const reviews = await this.apiService.productReviews(productId)
          return {
            content: [{ type: 'text', text: JSON.stringify(reviews, null, 2) }]
          }
        }

        case 'product_description': {
          const { productId } = args as { productId: string }
          const description = await this.apiService.productDescription(productId)
          return {
            content: [{ type: 'text', text: JSON.stringify(description, null, 2) }]
          }
        }

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${name}`
          )
      }
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `MercadoLibre Tool API error: ${JSON.stringify(error, null, 2)}`
        }]
      }
    }
  }
}
