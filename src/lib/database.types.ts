export interface Database {
  public: {
    Tables: {
      mood_entries: {
        Row: {
          id: string;
          name: string;
          mood: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          mood: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          mood?: string;
          created_at?: string;
        };
      };
    };
  };
}