import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role } from 'src/common/enums/role.enum';
import { GetTasksQueryDto } from './dto/get-tasks-query.dto';
import { SortOrder } from './enums/sort-order.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      user,
    });

    return this.taskRepository.save(task);
  }

  async getTasks(query: GetTasksQueryDto, user: User) {
  const { search, status, sortBy, order, offset = 0, limit = 10 } = query;

  const queryBuilder = this.taskRepository
    .createQueryBuilder('task')
    .where('task.userId = :userId', { userId: user.id });

  if (status) {
    queryBuilder.andWhere('task.status = :status', { status });
  }

  if (search) {
    queryBuilder.andWhere('task.title ILIKE :search', {
      search: `%${search}%`,
    });
  }

  queryBuilder.orderBy(`task.${sortBy ?? 'createdAt'}`, order ?? 'DESC');

  queryBuilder.skip(offset).take(limit);

  const [tasks, total] = await queryBuilder.getManyAndCount();

  return {
    items: tasks,
    total,
  };
}

  async updateTask(id: string, dto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    if (user.role !== Role.ADMIN && task.user.id !== user.id) {
      throw new ForbiddenException('You cannot modify this task');
    }
  
    Object.assign(task, dto);
  
    return this.taskRepository.save(task);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    if (user.role !== Role.ADMIN && task.user.id !== user.id) {
      throw new ForbiddenException('You cannot delete this task');
    }
  
    await this.taskRepository.delete(id);
  }
}