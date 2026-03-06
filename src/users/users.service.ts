import {
    Injectable,
    ConflictException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { User } from './entities/user.entity';
  import { CreateUserDto } from './dto/create-user.dto';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class UsersService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}
  
    async create(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;
      
        const existingUser = await this.userRepository.findOne({
          where: { email },
        });
      
        if (existingUser) {
          throw new ConflictException('Email already exists');
        }
      
        const hashedPassword = await bcrypt.hash(password, 10);
      
        const user = this.userRepository.create({
          email,
          password: hashedPassword,
        });
      
        const savedUser = await this.userRepository.save(user);
      
        return {
          id: savedUser.id,
          email: savedUser.email,
          role: savedUser.role,
          isActive: savedUser.isActive,
          createdAt: savedUser.createdAt,
          updatedAt: savedUser.updatedAt,
        };
      }

      async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({
          where: { email },
        });
      }

      async findById(id: string): Promise<User | null> {
        return this.userRepository.findOne({
          where: { id },
        });
      }
  }