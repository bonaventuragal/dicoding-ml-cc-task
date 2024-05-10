import { BadRequestException, Injectable, PayloadTooLargeException } from '@nestjs/common';
import { PredictModelService } from './predict-model.service';
import {randomUUID} from "crypto"
import { PredictStoreService } from './predict-store.service';

@Injectable()
export class PredictService {
  constructor(readonly predictModelService: PredictModelService, readonly predictStoreService: PredictStoreService) {}

  async predict(image: Express.Multer.File) {
    if(image.size > 1000000 ) {
      throw new PayloadTooLargeException({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000"
      })
    }

    try{
      const {label} = await this.predictModelService.predict(image.buffer)
      const suggestion = label === "Cancer" ? "Segera periksa ke dokter!" : "Anda tidak terkena kanker!"
  
      const data = {
        id: randomUUID(),
        result: label,
        suggestion,
        createdAt: new Date().toISOString()
      }

      await this.predictStoreService.store(data.id, data)

      return data
    }catch (e) {
      throw new BadRequestException({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi"
      })
    }
  }

  async histories() {
    return this.predictStoreService.histories()
  }
}
