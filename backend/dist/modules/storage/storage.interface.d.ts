export interface StorageInterface {
    uploadFile(file: Express.Multer.File, prefix: string, path: string): Promise<string>;
}
