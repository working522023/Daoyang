import { IsUUID, IsOptional, IsEnum } from "class-validator";
import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { EntityStatus } from "../utils";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id!: string;

    @Column({ type: "enum", enum: EntityStatus, default: EntityStatus.ACTIVE })
    @IsEnum(EntityStatus)
    status!: EntityStatus;

    @CreateDateColumn({ type: 'datetime', nullable: true })
    @IsOptional()
    createdAt?: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    @IsOptional()
    updatedAt?: Date;

    @Column({ type: 'varchar', length: 36, nullable: true, default: null })
    @IsOptional()
    @IsUUID()
    createdBy?: string | null;
}
