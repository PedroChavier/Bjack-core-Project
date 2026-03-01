import { spawn } from 'child_process'
import { rm } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectPath = process.cwd()
const nodeModulesPath = path.join(projectPath, 'node_modules')
const lockFilePath = path.join(projectPath, 'package-lock.json')

async function run() {
    try {
        console.log('Removendo node_modules...')
        await rm(nodeModulesPath, { recursive: true, force: true })

        console.log('Removendo package-lock.json...')
        await rm(lockFilePath, { force: true })

        console.log('Instalando dependências...')

        const child = spawn('npm', ['install'], {
            cwd: projectPath,
            shell: true,
            stdio: 'inherit'
        })

        child.on('close', (code) => {
            console.log(`Instalação finalizada com código ${code}`)
        })

        child.on('error', (err) => {
            console.error('Erro ao iniciar npm install:', err)
        })

    } catch (error) {
        console.error('Erro:', error)
    }
}

run()