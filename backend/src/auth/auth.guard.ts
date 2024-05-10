import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ALLOW_API_KEY_KEY } from "./apikey.decorator";
import { UserService } from "src/user/user.service";
import { AuthenticatedRequest, JwtBody } from "src/types";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private userService: UserService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const allowApiKey = this.reflector.getAllAndOverride<boolean>(ALLOW_API_KEY_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            console.log("brug==");
            return true;
        }

        const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            if (allowApiKey) {
                const apiKey: string | string[] | undefined = request.headers["x-api-key"];
                if (!apiKey || Array.isArray(apiKey)) throw new UnauthorizedException();
    
                const user = await this.userService.user({ apiKey });
                if (!user) throw new UnauthorizedException();
    
                request["user"] = {
                    sub: user.id,
                };
                
                return true;
            }
            
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>("JWT_SECRET") });
            request["user"] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: AuthenticatedRequest): string | undefined {
        const [type, token] = request.headers["authorization"]?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}