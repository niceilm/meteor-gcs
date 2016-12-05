declare module 'meteor/flynn:gcs' {
  interface GCSUploadOptions {
    destination: string;
    gzip?: boolean;
    validation?: boolean|'crc32c'|'md5';
    metadata?: {
      [key: string]: string|number|boolean;
      contentType: string;
    }
  }

  interface GCSOptions {
    projectId: string;
    credentials: Object;
    bucketId: string
  }

  class GoogleCloudStorage {
    constructor(option: GCSOptions);

    private uploadByBuffer(buffer: any, options: GCSUploadOptions): any;

    public aclDefaultAdd(): void;

    public uploadByRequest(req: any): string;

    public deleteFile(imageUrl: string): void;
  }
}