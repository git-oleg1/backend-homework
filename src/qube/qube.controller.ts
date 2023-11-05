import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { QubeService } from './qube.service';
import { CreateQubeDto } from './dto/create-qube.dto';
import { UpdateQubeDto } from './dto/update-qube.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { Qube } from './entities/qube.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IMG_UPLOAD_DIRECTORY } from 'src/constants';

@Controller('qubes')
export class QubeController {
  constructor(private readonly qubeService: QubeService) {}

  @ApiOperation({
    summary: 'Создание куба',
    description: 'Создание куба',
  })
  @ApiCreatedResponse({
    description: 'Куб успешно создан',
    type: Qube,
  })
  @ApiBadRequestResponse({ description: 'Ошибка валидации' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateQubeDto })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: IMG_UPLOAD_DIRECTORY,
        filename: (req, file, cb) => {
          cb(null, uuidv4().toLowerCase().concat(extname(file.originalname)));
        },
      }),
    }),
  )
  create(
    @Body() createQubeDto: CreateQubeDto,
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() user: User,
  ) {
    return this.qubeService.create(createQubeDto, file, user);
  }

  @Get()
  findAll() {
    return this.qubeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qubeService.findByPk(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQubeDto: UpdateQubeDto) {
    return this.qubeService.update(+id, updateQubeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qubeService.remove(+id);
  }
}
