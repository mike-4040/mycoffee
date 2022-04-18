import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (Number.isNaN(val)) {
      const msg = `Validation failed. "${val}" is not an integer.`;
      throw new BadRequestException(msg);
    }
    return value;
  }
}
