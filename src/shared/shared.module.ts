import { HttpModule } from '@nestjs/axios';
import type { Provider } from '@nestjs/common';
import { Global, Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { ApiConfigService } from './services/api-config.service';

const providers: Provider[] = [Logger, ApiConfigService, ConfigService];

@Global()
@Module({
  providers,
  imports: [CqrsModule, HttpModule],
  exports: [...providers, CqrsModule, HttpModule],
})
export class SharedModule {}
