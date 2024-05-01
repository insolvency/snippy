import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard)
    @Get("me")
    getMe(@Request() req) {
        return req.user;
    }
}
