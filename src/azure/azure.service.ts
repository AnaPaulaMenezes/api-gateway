import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AzureService {




    getBlobClient(imageName: string): BlockBlobClient {
        const blobClientService = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);
        const containerClient = blobClientService.getContainerClient(process.env.AZURE_CONTAINER_NAME);
        const blobClient = containerClient.getBlockBlobClient(imageName);
        return blobClient;
    }

    async getfileStream(fileName: string) {
        const blobClient = this.getBlobClient(fileName);
        var blobDownloaded = await blobClient.download();
        return blobDownloaded.readableStreamBody;
    }


    async upload(file: Express.Multer.File) {
        const blobClient = this.getBlobClient(file.originalname);
        await blobClient.uploadData(file.buffer);
        return blobClient.url;
    }
}
