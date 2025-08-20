// src/auth/dto/login.dto.ts
import { IsIn, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3, { message: 'El identificador debe tener al menos 3 caracteres' })
  // no espacios
  @Matches(/^\S+$/, { message: 'El identificador no debe contener espacios' })
  identificador: string;

  @IsString()
  @MinLength(4)
  password: string;

  // opcional: si viene, forzamos el modo; si no, lo inferimos
  @IsOptional()
  @IsIn(['email', 'username'])
  mode?: 'email' | 'username';
}

