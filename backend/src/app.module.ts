import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { S3Service } from './s3/s3.service';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        FileModule,
    ],
    providers: [PrismaService, UserService, AuthService, S3Service],
})
export class AppModule {}
