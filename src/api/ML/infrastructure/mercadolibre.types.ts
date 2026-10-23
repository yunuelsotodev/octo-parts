export interface Root {
  keywords: string
  paging: Paging
  results: Result[]
  used_attributes: any[]
  query_type: string
}

export interface Paging {
  total: number
  limit: number
  offset: number
}

export interface Result {
  id: string
  date_created: string
  catalog_product_id: string
  pdp_types: any[]
  status: string
  domain_id: string
  settings: Settings
  name: string
  main_features: any[]
  attributes: Attribute[]
  pictures: Picture[]
  children_ids: any[]
  quality_type: string
  priority: string
  last_updated: string
  type: string
  site_id: string
  keywords: string
  variations: any[]
  buying_mode: string
  channels: any[]
  description: string
}

export interface Settings {
  listing_strategy: string
  exclusive: boolean
  content: string
}

export interface Attribute {
  id: string
  name: string
  value_id: string
  value_name: string
}

export interface Picture {
  id: string
  url: string
}
