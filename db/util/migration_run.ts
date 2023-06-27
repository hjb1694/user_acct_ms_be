let runFiles = []
let arg = Deno.args[0];

for await(const file of Deno.readDir('./db/migrations')) {
    if(!file.isFile) continue;

    const fileName = file.name;

    runFiles.push(`./db/migrations/${fileName}`);
   
}


for(let f of runFiles){
    const run = Deno.run({
        cmd: ['deno', 'run', '--allow-run', '--allow-read', '--allow-env', '--allow-net', f, arg], 
        stderr: 'piped',
        stdout: 'piped'
    });
    
    const [{ code }, rawOutput, rawError] = await Promise.all([
        run.status(),
        run.output(),
        run.stderrOutput()
    ]);

    if (code === 0) {
        await Deno.stdout.write(rawOutput);
      } else {
        const errorString = new TextDecoder().decode(rawError);
        console.log(errorString);
      }
      
}

Deno.exit(1);

