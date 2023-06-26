import { Context, Next } from 'https://deno.land/x/oak/mod.ts';
import { ERR_SHORT_MSG } from '../../util/short_msg.ts';
import { config } from '../../config/index.ts';
import { ResponseError } from '../../util/errors.ts';

export const apiKeyCheck = async (ctx: Context, next: Next) => {

    const apiKeyHeader = ctx.request.headers.get('X-API-KEY');

    if(!apiKeyHeader){
        return new ResponseError(
            ctx, 
            403, 
            ERR_SHORT_MSG.MISSING_KEY,
            {
                msg: 'Missing API Key'
            }
        );
    }

    if(config.api_key !== apiKeyHeader){
        return new ResponseError(
            ctx, 
            403, 
            ERR_SHORT_MSG.KEY_MISMATCH,
            {
                msg: 'API Key Mismatch'
            }
        );
    }

    await next();

}