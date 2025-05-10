import { Module } from '@nestjs/common';
import { SupabaseStorageService } from './service/supabase/supabase-storage.service';
import { STORAGE_SERVICE } from './storage.constanst';

@Module({
  providers: [
    {
      provide: STORAGE_SERVICE,
      useClass: SupabaseStorageService,
    },
  ],
  exports: [STORAGE_SERVICE],
})
export class StorageModule {}
