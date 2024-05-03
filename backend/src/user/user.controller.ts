import { Controller, Get, Request, InternalServerErrorException } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get("me")
    async getMe(@Request() req: AuthenticatedRequest) {
        const user = await this.userService.user({ id: req.user.sub });

        if (!user)
            throw new InternalServerErrorException();

        delete user.password;
        return user;
    }
}
