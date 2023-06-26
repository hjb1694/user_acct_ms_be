import { Context, Next } from 'https://deno.land/x/oak/mod.ts';
import { ResponseError } from '../../../util/errors.ts';
import { ERR_SHORT_MSG } from '../../../util/short_msg.ts';
import { logger } from '../../../config/logger.ts';

export default async function(ctx: Context, next: Next){

    try{

        let body = await ctx.request.body({type: 'json'});
        body = await body.value;

        if(!body){
            throw new ResponseError(
                ctx, 
                422, 
                ERR_SHORT_MSG.MISSING_FIELDS,
                {
                    msg: 'Missing fields.'
                }
            );
        }

        await next();

    }catch(e){
        logger.error(e);
        if(e instanceof ResponseError){
            return e;
        }else{
            return new ResponseError(
                ctx, 
                500,
                ERR_SHORT_MSG.GEN_SVR,
                {
                    msg: 'A server error has occurred.'
                }
            );
        }
    }

}