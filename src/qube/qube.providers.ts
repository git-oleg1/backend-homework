import { QUBE_REPOSITORY } from 'src/constants';
import { Qube } from './entities/qube.entity';

export const qubeProviders = [
  {
    provide: QUBE_REPOSITORY,
    useValue: Qube,
  },
];
