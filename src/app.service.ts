import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Aqui la logica general en proyectos pequeños, para grandes mejor dividirlos en modulos!';
  }
}
