import { Controller, UseGuards, Get, Request } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get("me")
    getMe(@Request() req) {
        return req.user;
    }
}
