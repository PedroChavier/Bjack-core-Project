import { spawn } from 'child_process';
import { rm } from 'fs/promises';
import path from 'path';

const projectPath = process.cwd();
const distPath = path.join(projectPath, 'dist');
import chalk from 'chalk';

async function run() {
    try {
        await rm(distPath, { recursive: true, force: true });
        console.log(chalk.green('Pasta dist removida com sucesso.'))

        const child = spawn('npm', ['run', 'build'], {
            cwd: projectPath,
            shell: true,
            stdio: 'inherit'
        });

        child.on('close', (code) => {
            console.log(`Processo finalizado com código ${code}`);
        });

        child.on('error', (err) => {
            console.error('Erro ao iniciar processo:', err);
        });

    } catch (error) {
        console.error('Erro:', error);
    }
}

run();
