import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { JwtBody, NamedFile } from 'src/types';
import { extname } from 'path';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class FileService {
    constructor(
        private configService: ConfigService,
        private prismaService: PrismaService,
        private s3Service: S3Service,
    ) {}

    async uploadFiles(user: JwtBody, files: Array<Express.Multer.File>) {
        if (!files)
            throw new InternalServerErrorException();

        const namedFiles: NamedFile[] = files.map(v => ({
            name: `${uuidv4()}${extname(v.originalname)}`,
            file: v,
        }));

        for (const namedFile of namedFiles) {
            await this.prismaService.file.create({
                data: {
                    fileName: namedFile.name,
                    originalFileName: namedFile.file.originalname,
                    mimeType: namedFile.file.mimetype,
                    size: namedFile.file.size,
                    userId: user.sub,
                }
            });
        }

        const imageUrls = await this.s3Service.uploadFiles(namedFiles);

        // const fileNames = files.map((v) => ({
        //     imageUrl: this.configService.get<string>("BASE_URL") + "/file/view/" + v.filename,
        //     deleteUrl: this.configService.get<string>("BASE_URL") + "/file/delete/" + v.filename,
        // }));

        const fileNames = imageUrls.map((v) => ({
            imageUrls: v
        }));

        return { files: fileNames };
    }
}
