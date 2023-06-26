import { Context } from 'https://deno.land/x/oak/mod.ts';
import { ERR_SHORT_MSG } from './short_msg.ts';

interface ErrorDetails {
    statusCode: number; 
    message: string; 
    body: any;
}

interface BootstrapError {
    details: ErrorDetails; 
    status: number;
    message: string;
}


export class ExpressBootstrapError extends Error implements BootstrapError {
    constructor(
      private readonly errDetails: string
    ) {
        super();
        this.details.body.msg = errDetails
    }

    status = 500;
    message = 'Failed to bootstrap Express.';
    details = {
            statusCode: this.status, 
            message: this.message, 
            body: {msg: ''}
    }
}

export class ResponseError extends Error {
    constructor(
        private ctx: Context, 
        private readonly status: number,
        private readonly shortMsg: ERR_SHORT_MSG, 
        private readonly body: any
    
    ){
        super();
        ctx.response.status = status;
        ctx.response.body = {
            status, 
            short_msg: shortMsg, 
            body
        }
    }
  
}