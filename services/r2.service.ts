import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Cloudflare R2 configuration
const r2Client = new S3Client({
  region: 'auto',
  endpoint: 'https://603cdeb5c9b9c8faedcdec45863bb3b1.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '5682a17b2985c0d93486071efaefa330',
    secretAccessKey: '813ad423d799ef35ec9dd729926848c3de9c3507f8df50375c30b58a8f407c70',
  },
});

const BUCKET_NAME = 'ysolar-data';
const PUBLIC_URL = 'https://pub-4315e933e6e445138c2fb694e184c15a.r2.dev';

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

export interface DeleteResult {
  success: boolean;
  error?: string;
}

export class R2Service {
  /**
   * Upload file to R2
   */
  static async uploadFile(
    file: Buffer | Uint8Array | string,
    key: string,
    contentType: string
  ): Promise<UploadResult> {
    try {
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: contentType,
      });

      await r2Client.send(command);
      
      return {
        success: true,
        url: `${PUBLIC_URL}/${key}`,
        key: key,
      };
    } catch (error) {
      console.error('R2 upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Upload image file with optimized settings
   */
  static async uploadImage(
    file: Buffer | Uint8Array | string,
    filename: string,
    folder: string = 'images'
  ): Promise<UploadResult> {
    const timestamp = Date.now();
    const key = `${folder}/${timestamp}-${filename}`;
    
    return this.uploadFile(file, key, 'image/jpeg');
  }

  /**
   * Upload document file
   */
  static async uploadDocument(
    file: Buffer | Uint8Array | string,
    filename: string,
    folder: string = 'documents'
  ): Promise<UploadResult> {
    const timestamp = Date.now();
    const key = `${folder}/${timestamp}-${filename}`;
    
    return this.uploadFile(file, key, 'application/pdf');
  }

  /**
   * Delete file from R2
   */
  static async deleteFile(key: string): Promise<DeleteResult> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });

      await r2Client.send(command);
      
      return {
        success: true,
      };
    } catch (error) {
      console.error('R2 delete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Generate presigned URL for private file access
   */
  static async getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string | null> {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });

      const url = await getSignedUrl(r2Client, command, { expiresIn });
      return url;
    } catch (error) {
      console.error('R2 presigned URL error:', error);
      return null;
    }
  }

  /**
   * Extract key from public URL
   */
  static extractKeyFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.substring(1); // Remove leading slash
    } catch {
      return null;
    }
  }

  /**
   * Get public URL from key
   */
  static getPublicUrl(key: string): string {
    return `${PUBLIC_URL}/${key}`;
  }
}
