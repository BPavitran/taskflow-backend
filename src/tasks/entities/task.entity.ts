import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  import { TaskStatus } from '../enums/task-status.enum';
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column({ nullable: true })
    description: string;
  
    @Column({
      type: 'enum',
      enum: TaskStatus,
      default: TaskStatus.OPEN,
    })
    status: TaskStatus;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.tasks, {
      onDelete: 'CASCADE',
    })
    user: User;
  }