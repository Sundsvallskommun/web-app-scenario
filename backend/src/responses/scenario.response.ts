import ApiResponse from '@/interfaces/api-service.interface';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Scenario as _Scenario } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PublicImage } from './image.response';

export class PublicScenario implements Partial<_Scenario> {
  @IsInt()
  id: number;
  @IsString()
  name: string;
  @IsString()
  @IsNullable()
  @IsOptional()
  description: string | null;
  @IsString()
  assistantId: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => PublicImage)
  image?: PublicImage;
}

export class PublicScenariosApiResponse implements ApiResponse<PublicScenario[]> {
  @ValidateNested({ each: true })
  @Type(() => PublicScenario)
  data: PublicScenario[];
  @IsString()
  message: string;
}
export class PublicScenarioApiResponse implements ApiResponse<PublicScenario> {
  @ValidateNested()
  @Type(() => PublicScenario)
  data: PublicScenario;
  @IsString()
  message: string;
}
