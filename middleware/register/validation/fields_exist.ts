import { Context, Next } from 'https://deno.land/x/oak/mod.ts';
import { ResponseError } from '../../../util/errors.ts';
import { ERR_SHORT_MSG } from '../../../util/short_msg.ts';
import { logger } from '../../../config/logger.ts';

export default async function(ctx: Context, next: Next){

    try{

        let body = await ctx.request.body({type: 'json'});
        let {
            email, 
            dob, 
            password, 
            account_name, 
            personal_username
        } = await body.value;

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

        let errors = [];

        if(!email){
            errors.push({
                field: 'email', 
                msg: 'Missing email field.'
            });
        }

        if(!dob){
            errors.push({
                field: 'dob', 
                msg: 'Missing dob field.'
            });
        }

        if(!password){
            errors.push({
                field: 'password', 
                msg: 'Missing password field.'
            });
        }

        if(!account_name){
            errors.push({
                field: 'account_name', 
                msg: 'Missing account_name field.'
            });
        }

        if(!personal_username){
            errors.push({
                field: 'personal_username', 
                msg: 'Missing personal_username field.'
            });
        }

        if(errors.length){
            throw new ResponseError(
                ctx, 
                422, 
                ERR_SHORT_MSG.MISSING_FIELDS,
                {
                    msg: 'Missing specific fields.', 
                    fields: errors
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