import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'

export class ValidationPipeParameters implements PipeTransform {
    
    transform(value: any, metadata: ArgumentMetadata) {
        
        if(!value) {
            throw new BadRequestException(`tha parameter ${metadata.data} is empty.`)
        }
        return value;
    }
}