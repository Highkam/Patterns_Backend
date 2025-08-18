import { Injectable } from '@nestjs/common';

// Aqui la logica general en proyectos pequeños, para grandes mejor dividirlos en modulos
@Injectable()
export class AppService {
  getHello(): string {
    return '🚀 App corriendo';
  }
}
