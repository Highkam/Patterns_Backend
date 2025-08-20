import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ValidadorPorEmail, ValidadorPorUsername, ValidadorSesion } from '../bridges/auth.bridge';

@Injectable() 
export class AuthValidatorFactory {

  constructor(private readonly prisma: PrismaService) {}

  //Determina si el identificador recibido es un email o un username
  
  inferMode(identificador: string): 'email' | 'username' {
    return identificador.includes('@') ? 'email' : 'username';
  }


  create(mode: 'email' | 'username'): ValidadorSesion {
    if (mode === 'email') return new ValidadorPorEmail(this.prisma);
    return new ValidadorPorUsername(this.prisma);
  }
}
