import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { AuthenticatedRequest } from 'src/types';
import { AllowApiKey } from 'src/auth/apikey.decorator';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post("upload")
    @AllowApiKey()
    @UseInterceptors(FilesInterceptor("files"))
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
