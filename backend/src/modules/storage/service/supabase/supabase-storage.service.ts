import { Injectable } from '@nestjs/common';
import { StorageInterface } from '../../storage.interface';
import { SupabaseProvider } from './supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseStorageService implements StorageInterface {
  private readonly supabaseProvider: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    this.supabaseProvider = SupabaseProvider.getInstance(); // Correctly initializing the supabase client
  }

  async uploadFile(
    file: Express.Multer.File,
    prefix: string,
    path: string,
  ): Promise<string> {
    const updatedPath = `${prefix}/${path}`; // Make sure to create a unique path for the file
    const bucketName = this.configService.getOrThrow<string>('BUCKET_NAME');
    const { error } = await this.supabaseProvider.storage
      .from(bucketName)
      .upload(updatedPath, file.buffer, {
        contentType: file?.mimetype,
      });

    if (error) throw error;

    const { data } = this.supabaseProvider.storage
      .from(bucketName)
      .getPublicUrl(updatedPath);

    return data.publicUrl;
  }
}
