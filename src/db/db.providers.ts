import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './db.config';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize(databaseConfig);
            sequelize.addModels([User]);
            await sequelize.sync({ force: false });
            return sequelize;
        },
    },
];