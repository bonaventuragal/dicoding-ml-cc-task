import { BadRequestException, Injectable, PayloadTooLargeException } from '@nestjs/common';
import { PredictModelService } from './predict-model.service';
import {randomUUID} from "crypto"

@Injectable()
export class PredictService {
  constructor(readonly predictModelService: PredictModelService) {}

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
  
      return {
        id: randomUUID(),
        result: label,
        suggestion,
        createdAt: new Date().toISOString()
      }
    }catch {
      throw new BadRequestException({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi"
      })
    }
  }
}
