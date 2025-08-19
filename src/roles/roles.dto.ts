import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString({each: true})
    permissions: string[]
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}