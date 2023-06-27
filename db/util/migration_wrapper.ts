export default async function(up: Function, down: Function){

    if(Deno.args.length){
        if(Deno.args[0] === 'migrate'){
            await up();
            console.log('Migration ran.');
        }else if(Deno.args[0] === 'rollback'){
            down();
            console.log('Rollback ran.');
        }else{
            console.log('invalid arg');
        }
    }   

}