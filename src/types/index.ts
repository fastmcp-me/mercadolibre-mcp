export interface MercadoLibreSearchResponse {
  site_id: string
  country_default_time_zone: string
  query: string
  paging: {
    total: number
    primary_results: number
    offset: number
    limit: number
  }
  results: any[]
  sort: {
    id: string
    name: string
  }
  available_sorts: Array<{
    id: string
    name: string
  }>
  filters: Array<{
    id: string
    name: string
    type: string
    values: Array<{
      id: string
      name: string
    }>
  }>
  available_filters: Array<{
    id: string
    name: string
    type: string
    values: Array<{
      id: string
      name: string
    }>
  }>
  sort_filters: Array<{
    id: string
    name: string
    type: string
    values: Array<{
      id: string
      name: string
    }>
  }>
}

export interface AuthResponse {
  access_token: string
}
