import { Module } from '@nestjs/common';
import { RealtimeModule } from '../app/realtime/realtime.module';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [RealtimeModule],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
