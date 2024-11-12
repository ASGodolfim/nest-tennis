import { ArgumentMetadata, PipeTransform } from '@nestjs/common'

export class PlayersValidationPipeParameters implements PipeTransform {
    
    transform(value: any, metadata: ArgumentMetadata) {
        
    }
}