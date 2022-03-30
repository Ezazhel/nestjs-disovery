import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, EventsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
