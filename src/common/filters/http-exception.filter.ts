import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { error, timeStamp } from "console";

@Catch() 
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.getResponse() : exception;

        response.status(status).json({
            timestamp: Date.now().toString(),
            path: request.url,
            error: message
        })
    }
 }