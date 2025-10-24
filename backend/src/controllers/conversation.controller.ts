import { APIS, ENEO_API_KEY } from '@/config';
import {
  AskResponse as AskResponseInterface,
  ConversationRequest,
} from '@/data-contracts/eneo-sundsvall/data-contracts';
import { ConversationRequestDto } from '@/dtos/conversation.dto';
import { AskResponse } from '@/responses/eneo/query.response';
import ApiService from '@/services/api.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Body, Controller, HttpError, Post, Res } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Stream } from 'node:stream';

@Controller()
export class ConversationController {
  private readonly apiService = new ApiService();
  private readonly api = APIS.find(api => api.name === 'eneo-sundsvall');
  private readonly basePath = `${this.api.name}/${this.api.version}`;
  private readonly apikey = ENEO_API_KEY.replaceAll(/[\r\n]/g, '').trim();

  @Post('/conversations')
  @OpenAPI({
    summary: 'Chat with an assistant or group chat',
    description: `Provide either an assistant_id or a group_chat_id to start a new conversation with an assistant or group chat.\n
      Provide session_id to continue a conversation.`,
  })
  @ResponseSchema(AskResponse)
  async conversation(
    @Body() body: ConversationRequestDto,
    @Res() response: Response<AskResponseInterface | Stream>,
  ): Promise<Response<AskResponseInterface> | Stream> {
    if (!body.assistant_id && !body.group_chat_id && !body.session_id) {
      throw new HttpError(400, 'No assistant id, group chat id, or session id provided');
    }

    const url = `${this.basePath}/conversations/`;
    const responseType = body?.stream ? 'stream' : 'json';
    const data: ConversationRequest = body;
    try {
      if (responseType === 'json') {
        const res = await this.apiService.post<AskResponseInterface, ConversationRequest>(url, data, {
          headers: { 'api-key': this.apikey },
          responseType,
        });
        return response.send(res.data);
      } else {
        const res = await this.apiService.post<Stream, ConversationRequest>(url, data, {
          headers: { 'api-key': this.apikey },
          responseType,
        });
        const datastream = res.data;
        datastream.on('data', (buf: Buffer) => {
          return buf;
        });

        datastream.on('end', () => {
          return response.end();
        });
        return res.data;
      }
    } catch (e) {
      logger.error('Error sending question to conversation.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Error sending question to conversation.');
    }
  }
}
