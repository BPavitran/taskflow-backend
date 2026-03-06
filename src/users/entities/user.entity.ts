import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from '../../common/enums/role.enum';
import { Task } from '../../tasks/entities/task.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}