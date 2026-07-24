import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Curriculo Online API')
    .setDescription(
      'API de Gerenciamento de currciculos'
    )
    .setVersion('1.0.0')
    //.addBearerAuth(
    //  {
    //    type: 'http',
    //    scheme: 'bearer',
    //    bearerFormat: 'JWT'
    //  },
    //  'JWT'
   // )
   // .addServer('/api')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })
}