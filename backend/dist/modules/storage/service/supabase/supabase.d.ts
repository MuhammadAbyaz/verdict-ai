import { SupabaseClient } from '@supabase/supabase-js';
declare class SupabaseProvider {
    private static instance;
    private constructor();
    static getInstance(): SupabaseClient;
}
export { SupabaseProvider };
