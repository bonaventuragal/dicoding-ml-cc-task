import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node'

@Injectable()
export class PredictModelService {
  private model: tf.GraphModel

  async predict(image: Buffer) {
    if(this.model === undefined) {
      this.model = await tf.loadGraphModel(process.env.MODEL_URL)
    }

    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat()

    const prediction = this.model.predict(tensor) as tf.Tensor;

    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const label = confidenceScore > 50 ? "Cancer" : "Non-cancer";

    return {label, confidenceScore}
  }
}
