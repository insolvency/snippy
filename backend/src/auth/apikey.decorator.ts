import { SetMetadata } from "@nestjs/common";

export const ALLOW_API_KEY_KEY = "allowApiKey";
export const AllowApiKey = () => SetMetadata(ALLOW_API_KEY_KEY, true);