import * as use from '@tensorflow-models/universal-sentence-encoder'
import * as tf from '@tensorflow/tfjs'
import * as tfconv from '@tensorflow/tfjs-converter'

import * as path from 'path'

export class WordEmbeddings {
    model: tf.GraphModel | null
    public static instance: WordEmbeddings | null

    private constructor() {
        this.model = null
    }

    static getInstance() {
        if (!this.instance) this.instance = new WordEmbeddings()
        return this.instance
    }

    async loadModel() {
        const modelURL =
            'https://tfhub.dev/google/universal-sentence-encoder-large/5'
        this.model = await tf.loadGraphModel(modelURL, {fromTFHub: true})
    }

    async embedText(text: string): Promise<number[]> {
        if (!this.model) {
            throw new Error(
                'Model has not been loaded. Call loadModel() first.',
            )
        }

        const embeddings = (await this.model.executeAsync(
            tf.tensor(text),
        )) as tf.Tensor<tf.Rank>
        const array = (await embeddings.array()) as number[]
        return array
    }

    distance(vectorA: number[], vectorB: number[]): number {
        const tensor1 = tf.tensor(vectorA)
        const tensor2 = tf.tensor(vectorB)

        const innerProduct = tf.dot(tensor1, tensor2)
        const innerProductValue = innerProduct.arraySync() as number
        tensor1.dispose()
        tensor2.dispose()
        innerProduct.dispose()
        console.log(1 - innerProductValue)
        return 1 - innerProductValue
    }

    async main() {
        await this.loadModel()

        const restaurant1 = 'Ristorante triticum'
        const restaurant2 = 'pizzeria triticum'

        // Embed the restaurant names
        const embedding1 = await this.embedText(restaurant1)
        const embedding2 = await this.embedText(restaurant2)

        const similarity = this.distance(embedding1, embedding2)

        console.log(similarity)
    }
}
