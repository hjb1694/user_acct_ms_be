import { Router } from "https://deno.land/x/oak/mod.ts";
import fieldsExist from '../middleware/register/validation/fields_exist.ts';

const router = new Router({prefix: '/api/v1'});

router.post(
    '/register', 
    fieldsExist
);

export default router;