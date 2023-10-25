import { ApiProperty } from '@nestjs/swagger';
import { LoginResult } from '../types';

export class LoginResultDto implements LoginResult {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'dasddkm34edoSMDKf324eoasdamdAD@dasdd230dasd0',
  })
  public readonly access_token!: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
