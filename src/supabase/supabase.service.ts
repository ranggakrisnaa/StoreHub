import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private readonly supabase: SupabaseClient;
    private supabaseUrl: string = process.env.SUPABASE_URL;
    private supabaseKey: string = process.env.SUPABASE_KEY;

    constructor() {
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    getClient(): SupabaseClient {
        return this.supabase;
    }
}
