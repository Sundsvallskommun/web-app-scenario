import { ScenarioIntroText } from '@prisma/client';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateScenarioIntroTextDto implements Partial<Pick<ScenarioIntroText, 'text' | 'sortOrder'>> {
  @IsString()
  text!: string;

  @IsInt()
  @Min(1)
  sortOrder!: number;
}

export class UpdateScenarioIntroTextDto implements Partial<Pick<ScenarioIntroText, 'text' | 'sortOrder'>> {
  @IsString()
  @IsOptional()
  text?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  sortOrder?: number;
}
