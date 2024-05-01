import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(username: string, pass: string): Promise<any> {
        const user = await this.userService.user({ username });

        if (!bcrypt.compareSync(pass, user?.password))
            throw new UnauthorizedException();

        const payload = { sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
