import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
    constructor (private configService: ConfigService) {}

    s3 = new AWS.S3({
        endpoint: this.configService.get<string>("S3_ENDPOINT"),
        accessKeyId: this.configService.get<string>("S3_ACCESS_KEY"),
        secretAccessKey: this.configService.get<string>("S3_SECRET_KEY")
    })

    async uploadFiles(files: Array<Express.Multer.File>) {
        // Uploads the files lol
    }
}
