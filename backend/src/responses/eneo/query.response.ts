import { AskResponse as AskResponseInterface } from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsString } from 'class-validator';

export class AskResponse implements Partial<AskResponseInterface> {
  @IsString()
  session_id: string;
  @IsString()
  question: string;
  @IsString()
  answer: string;
}
