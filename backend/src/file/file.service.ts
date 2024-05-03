import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtBody } from 'src/types';

@Injectable()
export class FileService {
    constructor(
        private configService: ConfigService,
        private prismaService: PrismaService
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

        const fileNames = files.map((v) => ({
            imageUrl: this.configService.get<string>("BASE_URL") + "/file/view/" + v.filename,
            deleteUrl: this.configService.get<string>("BASE_URL") + "/file/delete/" + v.filename,
        }));

        return { files: fileNames };
    }
}
