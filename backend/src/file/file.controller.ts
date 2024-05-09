import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileService } from './file.service';
import { AuthenticatedRequest } from 'src/types';

const storage = diskStorage({
    destination: process.env.FILES_DESTINATION,
    filename: (_, file, cb) => {
        const fileType = extname(file.originalname);
        const randomHex = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomHex}${fileType}`);
    },
});

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post("upload")
    @UseInterceptors(FilesInterceptor("files", 100, { storage: storage }))
    uploadFile(
        @Req() req: AuthenticatedRequest,
        @UploadedFiles(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 8000000 }),
                new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)/ }),
            ],
        }),
    ) files: Array<Express.Multer.File>) {
        return this.fileService.uploadFiles(req.user, files);
    }
}
