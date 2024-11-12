import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'

export class PlayersValidationPipeParameters implements PipeTransform {
    
    transform(value: any, metadata: ArgumentMetadata) {
        
        if(!value) {
            throw new BadRequestException(`tha parameter ${metadata.data} is empty.`)
        }
        return value;
    }
}