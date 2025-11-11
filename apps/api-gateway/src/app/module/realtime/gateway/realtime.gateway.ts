//api-gateway\src\app\module\realtime\gateway\realtime.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisPubSubService } from '@movie-hub/shared-redis';
import { Inject, Logger } from '@nestjs/common';
import {
  LimitReachedEvent,
  SeatActionDto,
  SeatEvent,
  SeatExpiredEvent,
} from '@movie-hub/shared-types';
import { clerkWsMiddleware } from '../middleware/clerk-ws.middleware';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
})
export class RealtimeGateway
  implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit
{
  private readonly logger = new Logger(RealtimeGateway.name);
  @WebSocketServer() server: Server;

  constructor(
    @Inject('REDIS_GATEWAY') private readonly redis: RedisPubSubService
  ) {}

  async onModuleInit() {
    await Promise.all([
      this.redis.subscribe('cinema.seat_held', (msg) => this.onSeatHeld(msg)),
      this.redis.subscribe('cinema.seat_released', (msg) =>
        this.onSeatReleased(msg)
      ),
      this.redis.subscribe('cinema.seat_expired', (msg) =>
        this.onSeatExpired(msg)
      ),
      this.redis.subscribe('cinema.seat_booked', (msg) =>
        this.onSeatBooked(msg)
      ),
      this.redis.subscribe('cinema.seat_limit_reached', (msg) =>
        this.onLimitReached(msg)
      ),
    ]);

    this.logger.log('✅ Subscribed to cinema events via Redis');
  }

  afterInit(server: Server) {
    server.use(clerkWsMiddleware);
    this.logger.log('✅ Clerk WS middleware initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log('Connecting... ... ...');
    const userId = client.user?.id;
    if (!userId) {
      this.logger.warn('❌ Unauthorized client attempted to connect');
      client.disconnect(true);
      return;
    }

    const { showtimeId } = client.handshake.query;
    if (showtimeId) client.join(showtimeId.toString());

    this.logger.log(`✅ Client connected: ${userId}`);
  }

  handleDisconnect(client: Socket) {
    client.disconnect();
  }

  // FE emits "hold_seats"
  @SubscribeMessage('hold_seat')
  async handleHold(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SeatActionDto
  ) {
    const payload = {
      ...data,
      userId: client.user?.id,
    };
    this.logger.log('Held seat: ', payload);
    await this.redis.publish('gateway.hold_seat', JSON.stringify(payload));
  }

  @SubscribeMessage('release_seat')
  async handleRelease(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SeatActionDto
  ) {
    const payload: SeatEvent = {
      ...data,
      userId: client.user?.id,
    };
    this.logger.log('Release seat: ', payload);
    await this.redis.publish('gateway.release_seat', JSON.stringify(payload));
  }

  // ===== HANDLERS for redis messages =====
  private onSeatHeld(msg: string) {
    const data = JSON.parse(msg) as SeatEvent;
    this.logger.log(data);
    this.server.to(data.showtimeId).emit('seat_held', data);
    this.logger.log('Held seat: ', data);
  }

  private onSeatReleased(msg: string) {
    const data = JSON.parse(msg) as SeatEvent;
    this.logger.log(data);
    this.server.to(data.showtimeId).emit('seat_released', data);
    this.logger.log('Held seat: ', data);
  }

  private onSeatExpired(msg: string) {
    const data = JSON.parse(msg) as SeatExpiredEvent;
    this.server.to(data.showtimeId).emit('seat_expired', data);
  }

  // tạm chưa có
  private onSeatBooked(msg: string) {
    const data = JSON.parse(msg);
    this.server.to(data.showtimeId).emit('seat_booked', data);
  }
  private onLimitReached(msg: string) {
    const data = JSON.parse(msg) as LimitReachedEvent;
    this.server.to(data.showtimeId).emit('limit_reached', data);
    this.logger.warn('🎯 Limit reached: ', data);
  }
}
