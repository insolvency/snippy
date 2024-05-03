import { Controller, FileTypeValidator, InternalServerErrorException, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
    @Post("upload")
    @UseInterceptors(FilesInterceptor("file"))
    uploadFile(@UploadedFiles(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 8000000 }),
                new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)/ }),
            ],
        }),
    ) file: Array<Express.Multer.File>) {
        if (!file)
            throw new InternalServerErrorException();

        console.log(file);
    }
}
