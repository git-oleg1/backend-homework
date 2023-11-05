import { WhereOptions } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import { QUBE_REPOSITORY } from 'src/constants';
import { Qube } from './entities/qube.entity';
import { CreateQubeDto } from './dto/create-qube.dto';
import { UpdateQubeDto } from './dto/update-qube.dto';
import { User } from 'src/user/entities/user.entity';
import { basename, extname } from 'path';

@Injectable()
export class QubeService {
  constructor(
    @Inject(QUBE_REPOSITORY)
    private repository: typeof Qube,
  ) {}

  create(createQubeDto: CreateQubeDto, file: Express.Multer.File, owner: User) {
    return this.repository.sequelize.transaction(async (transaction) => {
      if (!createQubeDto.name) {
        createQubeDto.name = basename(
          file.originalname,
          extname(file.originalname),
        );
      }
      const qube = await this.repository.create(
        {
          ...createQubeDto,
          size: file.size,
          path: file.path,
        },
        { transaction },
      );
      await qube.$set('user', owner, { transaction });
    });
  }

  findAll(): Promise<Qube[]> {
    return this.repository.findAll();
  }

  findOne(
    options: WhereOptions<Qube>,
    associations: string[] = [],
  ): Promise<Qube | null> {
    return this.repository.findOne({
      where: options,
      include: associations,
    });
  }

  findByPk(id: number, associations: string[] = []): Promise<Qube | null> {
    return this.repository.findByPk(id, {
      include: associations,
    });
  }

  async update(id: number, updateQubeDto: UpdateQubeDto) {
    const qube = await this.findByPk(id);
    qube.set(updateQubeDto);
    return await qube.save();
  }

  async remove(id: number) {
    const n = await this.repository.destroy({ where: { id } });
    return n === 1;
  }
}
