import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post("login")
    login(@Body() loginDto: Record<string, any>) {
        return this.authService.login(loginDto.username, loginDto.password);
    }
}