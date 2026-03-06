import { IsOptional, IsInt, Min, Max, IsEnum, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskSortField } from '../enums/task-sort-field.enum';
import { SortOrder } from '../enums/sort-order.enum';

export class GetTasksQueryDto {
  @ApiPropertyOptional({
    description: 'Search tasks by title',
    example: 'meeting'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter tasks by status',
    enum: TaskStatus,
    example: TaskStatus.OPEN
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: TaskSortField,
    example: TaskSortField.CREATED_AT,
  })
  @IsOptional()
  @IsString()
  sortBy?: string;
  
  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SortOrder,
    example: SortOrder.DESC
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional({
    description: 'Number of records to skip',
    example: 0
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({
    description: 'Maximum number of records to return',
    example: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}