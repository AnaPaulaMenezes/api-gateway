import { Module } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { AzureService } from './azure.service';

@Module({
  providers: [AzureService],
  exports: [AzureService]
})
export class AzureModule { }
