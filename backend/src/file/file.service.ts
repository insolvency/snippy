import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { JwtBody } from 'src/types';

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

        for (const file of files) {
            await this.prismaService.file.create({
                data: {
                    fileName: file.filename,
                    originalFileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    userId: user.sub,
                }
            });
        }

        const imageUrls = await this.s3Service.uploadFiles(files);

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
