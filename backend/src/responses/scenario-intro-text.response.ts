import ApiResponse from '@/interfaces/api-service.interface';
import { ScenarioIntroText as _ScenarioIntroText } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';

export class PublicScenarioIntroText implements Pick<_ScenarioIntroText, 'id' | 'text' | 'sortOrder'> {
  @IsInt()
  id!: number;

  @IsString()
  text!: string;

  @IsInt()
  sortOrder!: number;
}

export class PublicScenarioIntroTextsApiResponse implements ApiResponse<PublicScenarioIntroText[]> {
  @ValidateNested({ each: true })
  @Type(() => PublicScenarioIntroText)
  data!: PublicScenarioIntroText[];

  @IsString()
  message!: string;
}
