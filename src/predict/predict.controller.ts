import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PredictService } from './predict.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('predict')
export class PredictController {
  constructor(private readonly predictService: PredictService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async predict(@UploadedFile() image: Express.Multer.File) {
    const data = await this.predictService.predict(image)

    return {
      status: "success",
      message: "Model is predicted successfully",
      data
    }
  }
}
