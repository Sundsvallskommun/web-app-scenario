import { ConversationRequest } from '@/data-contracts/eneo-sundsvall/data-contracts';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ConversationRequestDto implements ConversationRequest {
  @IsString()
  @IsOptional()
  assistant_id?: string;
  @IsString()
  @IsOptional()
  group_chat_id?: string;
  @IsString()
  @IsOptional()
  session_id?: string;
  @IsString()
  question: string;
  @IsBoolean()
  @IsOptional()
  stream?: boolean;
}
