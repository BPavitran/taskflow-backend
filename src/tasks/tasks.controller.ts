import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Patch,
    Param,
    Delete,
    HttpCode,
    Query,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth } from '@nestjs/swagger';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksQueryDto } from './dto/get-tasks-query.dto';
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
      return this.tasksService.create(createTaskDto, req.user);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    getTasks(
      @Query() query: GetTasksQueryDto,
      @Request() req
    ) {
      return this.tasksService.getTasks(query, req.user);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    updateTask(
      @Param('id') id: string,
      @Body() dto: UpdateTaskDto,
      @Request() req
    ) {
      return this.tasksService.updateTask(id, dto, req.user);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    deleteTask(
      @Param('id') id: string,
      @Request() req,
    ) {
      return this.tasksService.deleteTask(id, req.user);
    }
  }