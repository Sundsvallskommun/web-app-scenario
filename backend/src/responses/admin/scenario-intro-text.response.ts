import ApiResponse from '@/interfaces/api-service.interface';
import { ScenarioIntroText as _ScenarioIntroText } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt, IsString, ValidateNested } from 'class-validator';

export class ScenarioIntroText implements _ScenarioIntroText {
  @IsInt()
  id: number;

  @IsString()
  text: string;

  @IsInt()
  sortOrder: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

export class ScenarioIntroTextsApiResponse implements ApiResponse<ScenarioIntroText[]> {
  @ValidateNested({ each: true })
  @Type(() => ScenarioIntroText)
  data: ScenarioIntroText[];

  @IsString()
  message: string;
}

export class ScenarioIntroTextApiResponse implements ApiResponse<ScenarioIntroText> {
  @ValidateNested()
  @Type(() => ScenarioIntroText)
  data: ScenarioIntroText;

  @IsString()
  message: string;
}

export class ScenarioIntroTextDeleteApiResponse implements ApiResponse<boolean> {
  @IsBoolean()
  data: boolean;

  @IsString()
  message: string;
}
