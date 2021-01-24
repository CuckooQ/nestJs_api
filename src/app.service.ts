import { Injectable } from '@nestjs/common';
import { HOME_MESSAGE } from './const';

@Injectable()
export class AppService {
  getHome(): string {
    return HOME_MESSAGE;
  }
}
