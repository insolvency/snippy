import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";
import { LoginDto } from "./dtos/login.dto";
import { AllowApiKey } from "./apikey.decorator";
import { AuthenticatedRequest } from "src/types";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post("login")
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.username, loginDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @AllowApiKey()
    @Patch("reset")
    resetApiKey(@Req() request: AuthenticatedRequest) {
        return this.authService.resetApiKey(request.user.sub);
    }
}