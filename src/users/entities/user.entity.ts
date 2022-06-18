import {
    Table,
    Column,
    Model,
    Unique,
    IsEmail,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'user',
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column
    name: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}