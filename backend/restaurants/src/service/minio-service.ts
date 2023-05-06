import Minio, {
    Client,
    LockConfig,
    ResultCallback,
    UploadedObjectInfo,
} from 'minio'
import {Readable} from 'stream'

class MinioService {
    client: Client
    bucketName: string

    constructor() {
        if (process.env.USE_MINIO_LOCAL) {
            if (
                process.env.MINIO_ACCESS_KEY == undefined ||
                process.env.MINIO_SECRET_KEY == undefined
            )
                throw new Error('Local MINIO credentials not found')

            this.client = new Minio.Client({
                endPoint: 'localhost',
                port: 9002,
                accessKey: process.env.MINIO_ACCESS_KEY,
                secretKey: process.env.MINIO_SECRET_KEY,
            })
            this.bucketName = 'images'
        } else {
            if (
                process.env.AWS_ACCESS_KEY == undefined ||
                process.env.AWS_SECRET_KEY == undefined ||
                process.env.AWS_SESSION_TOKEN == undefined
            )
                throw new Error('AWS credentials not found')

            this.client = new Minio.Client({
                endPoint: 's3.amazonaws.com',
                accessKey: process.env.AWS_ACCESS_KEY,
                secretKey: process.env.AWS_SECRET_KEY,
                sessionToken: process.env.AWS_SESSION_TOKEN,
            })
            this.bucketName = 'voicefork-restaurants-images'
        }
    }

    async putObject(objectName: string, object: string | Readable | Buffer) {
        return this.client.putObject(
            this.bucketName,
            objectName,
            object,
            (err: Error, objInfo: UploadedObjectInfo) => {
                if (err) {
                    console.log(err)
                }
                console.log('Object successfully stored. Object info:', objInfo)
                return objInfo
            },
        )
    }

    async getObject(objectName: string): Promise<Buffer> {
        const chunks: Buffer[] = []

        const dataStream = await this.client.getObject(
            this.bucketName,
            objectName,
        )

        dataStream.on('data', (chunk: Buffer) => {
            chunks.push(chunk)
        })

        return new Promise<Buffer>((resolve, reject) => {
            dataStream.on('end', () => {
                const objectData = Buffer.concat(chunks)
                console.log('Object successfully retrieved:', objectData)
                resolve(objectData)
            })

            dataStream.on('error', (error: Error) => {
                console.error('Error reading object data stream:', error)
                reject(error)
            })
        })
    }
}

export default MinioService
