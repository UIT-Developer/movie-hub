//api-gateway\src\app\module\realtime\gateway\realtime.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../service/redis.service';

@WebSocketGateway({ cors: true })
export class RealtimeGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly redis: RedisService) {
    // Subscribing to Redis channel
    this.redis.subscribe('cinema.seat_held', (msg) => this.onSeatHeld(msg));
    this.redis.subscribe('cinema.seat_released', (msg) =>
      this.onSeatReleased(msg)
    );
    this.redis.subscribe('cinema.seat_expired', (msg) =>
      this.onSeatExpired(msg)
    );
    this.redis.subscribe('cinema.seat_booked', (msg) => this.onSeatBooked(msg));
  }

  handleConnection(client: Socket) {
    const { showtimeId, userId } = client.handshake.query;

    (client as any).userId = userId;

    if (showtimeId) client.join(showtimeId.toString());
  }

  // FE emits "hold_seats"
  @SubscribeMessage('hold_seats')
  async handleHold(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ) {
    const payload = {
      ...data,
      clientKey: (client as any).userId,
    };
    await this.redis.publish('gateway.hold_seats', JSON.stringify(payload));
  }

  @SubscribeMessage('release_seats')
  async handleRelease(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ) {
    const payload = {
      ...data,
      clientKey: (client as any).userId,
    };
    await this.redis.publish('gateway.release_seats', JSON.stringify(payload));
  }

  // ===== HANDLERS for redis messages =====
  private onSeatHeld(msg: string) {
    const data = JSON.parse(msg);
    this.server.to(data.showtimeId).emit('seat_held', data);
  }

  private onSeatReleased(msg: string) {
    const data = JSON.parse(msg);
    this.server.to(data.showtimeId).emit('seat_released', data);
  }

  private onSeatExpired(msg: string) {
    const data = JSON.parse(msg);
    this.server.to(data.showtimeId).emit('seat_expired', data);
  }

  private onSeatBooked(msg: string) {
    const data = JSON.parse(msg);
    this.server.to(data.showtimeId).emit('seat_booked', data);
  }
}
