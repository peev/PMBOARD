export interface Feature {
  id: string
  title: string
  description: string
  votes: number
  status: 'proposed' | 'backlog' | 'in-progress' | 'completed'
  created_at: string
  updated_at: string
}

export type FeatureStatus = Feature['status']

export interface Database {
  public: {
    Tables: {
      features: {
        Row: Feature
        Insert: Omit<Feature, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Feature, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 