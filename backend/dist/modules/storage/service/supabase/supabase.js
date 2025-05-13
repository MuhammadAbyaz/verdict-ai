"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseProvider = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("@nestjs/config");
class SupabaseProvider {
    constructor() { }
    static getInstance() {
        const configService = new config_1.ConfigService();
        if (!SupabaseProvider.instance) {
            const anonKey = configService.getOrThrow('SUPABASE_ANON_KEY');
            const supabaseUrl = configService.getOrThrow('SUPABASE_URL');
            SupabaseProvider.instance = (0, supabase_js_1.createClient)(supabaseUrl, anonKey);
        }
        return SupabaseProvider.instance;
    }
}
exports.SupabaseProvider = SupabaseProvider;
//# sourceMappingURL=supabase.js.map