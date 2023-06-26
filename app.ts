import { config } from './config/index.ts';
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { ExpressBootstrapError } from './util/errors.ts';
import { logger } from './config/logger.ts';
import { apiKeyCheck } from './middleware/global/api_key_check.ts';

//Routers
import {
    authRouter
} from './routers/index.ts';

const app = new Application();

app.use(apiKeyCheck);

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());


const handleConnectionError = (err: any) => {
    const bootstrapError = new ExpressBootstrapError(err);
    logger.error(bootstrapError.details);
    Deno.exit(1);
}

try{
    await app.listen({port: config.port})
    logger.info(`Listening on port ${config.port}!`);
}catch(e){
    handleConnectionError(e);
}
