import { Module } from '@nestjs/common';
import { PredictService } from './predict.service';
import { PredictController } from './predict.controller';
import { PredictModelService } from './predict-model.service';

@Module({
  controllers: [PredictController],
  providers: [PredictService, PredictModelService],
})
export class PredictModule {}
