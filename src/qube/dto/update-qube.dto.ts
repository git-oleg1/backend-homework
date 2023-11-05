import { PartialType } from '@nestjs/swagger';
import { CreateQubeDto } from './create-qube.dto';

export class UpdateQubeDto extends PartialType(CreateQubeDto) {}
