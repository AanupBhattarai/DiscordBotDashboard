import { Module } from '@nestjs/common';
import { WebSocketHandler } from './socket';

@Module({
  providers: [WebSocketHandler],
  exports: [WebSocketHandler],
})
export class WebSocketModule {}
