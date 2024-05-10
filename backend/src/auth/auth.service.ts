import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(username: string, pass: string): Promise<any> {
        const user = await this.userService.user({ username });

        if (!user)
            throw new UnauthorizedException();

        if (!bcrypt.compareSync(pass, user?.password))
            throw new UnauthorizedException();

        const payload = { sub: user.id };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        }
    }

    async resetApiKey(userId: string): Promise<any> {
        const user = await this.userService.updateUser({
            where: {
                id: userId,
            },
            data: {
                apiKey: uuidv4(),
            },
        });

        return {
            apiKey: user.apiKey
        }
    }
}
