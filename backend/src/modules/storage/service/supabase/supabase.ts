import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

class SupabaseProvider {
  private static instance: SupabaseClient;

  private constructor() {}

  static getInstance(): SupabaseClient {
    const configService = new ConfigService();
    if (!SupabaseProvider.instance) {
      const anonKey = configService.getOrThrow<string>('SUPABASE_ANON_KEY');
      const supabaseUrl = configService.getOrThrow<string>('SUPABASE_URL');
      SupabaseProvider.instance = createClient(supabaseUrl, anonKey);
    }
    return SupabaseProvider.instance;
  }
}

export { SupabaseProvider };
