import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'
import { port } from '@app/config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(port)
}

await bootstrap()
