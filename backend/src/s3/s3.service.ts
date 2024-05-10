import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AWSError } from 'aws-sdk';
import * as S3 from "aws-sdk/clients/s3";
import { NamedFile } from 'src/types';

@Injectable()
export class S3Service {
    constructor (private configService: ConfigService) {}

    private s3_connect(path: string | null = ""): S3 {
        return new S3({
            apiVersion: "latest",
            endpoint: this.configService.get<string>("S3_ENDPOINT"),
            credentials: {
                accessKeyId: this.configService.get<string>("S3_ACCESS_KEY"),
                secretAccessKey: this.configService.get<string>("S3_SECRET_KEY")
            }
        });
    }

    private s3_upload(bucket: string, file: Express.Multer.File, objectName: string, path: string | null = null): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const s3: S3 = this.s3_connect(path);
            const params: S3.PutObjectRequest = {
                Bucket: bucket,
                Key: objectName,
                Body: file.buffer,
                ACL: "public-read",
                ContentType: file.mimetype,
            };

            s3.putObject(params, (err: AWSError, data: S3.PutObjectRequest) => {
                if (err) reject(err);
                resolve(`${s3.endpoint.href}${bucket}${path ? `/${path}` : ""}/${objectName}`);
            });
        });
    }

    private s3_delete(bucket: string, objectName: string, path: string | null = null): Promise<S3.DeleteObjectOutput> {
        return new Promise<S3.DeleteObjectOutput>((resolve, reject) => {
            const s3: S3 = this.s3_connect(path);
            const params: S3.DeleteObjectRequest = {
                Bucket: bucket,
                Key: objectName,
            };

            s3.deleteObject(params, (err: AWSError, data: S3.DeleteObjectOutput) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    async uploadFiles(namedFiles: NamedFile[]): Promise<string[]> {
        const imageUrls: string[] = [];

        for (const namedFile of namedFiles) {
            const imageUrl = await this.s3_upload(this.configService.get<string>("S3_BUCKET_NAME"), namedFile.file, namedFile.name);
            imageUrls.push(imageUrl);
        }

        return imageUrls;
    }
}
