import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    providers: [PrismaService, UserService, AuthService],
})
export class AppModule {}
