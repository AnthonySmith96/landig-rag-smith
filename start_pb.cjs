const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const envPath = path.resolve(__dirname, '.env');
console.log('Cargando variables de entorno desde:', envPath);

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split(/\r?\n/).forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  });
} else {
  console.error('¡Archivo .env no encontrado! Por favor, crea uno.');
}

console.log('Iniciando PocketBase...');
const isWindows = process.platform === 'win32';
const pbExecutable = isWindows ? 'pocketbase.exe' : 'pocketbase';
const backendPath = path.join(__dirname, 'backend');
const pb = spawn(path.join(backendPath, pbExecutable), ['serve'], {
  stdio: 'inherit',
  env: process.env,
  cwd: backendPath
});

pb.on('close', (code) => {
  console.log(`PocketBase finalizó con código ${code}`);
});
