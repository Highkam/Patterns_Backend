import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator"

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsBoolean()
    permission_enabled: boolean
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}