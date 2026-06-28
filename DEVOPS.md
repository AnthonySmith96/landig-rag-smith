# Guía de Despliegue en Producción (DevOps Runbook)

Este documento detalla las instrucciones, consideraciones y arquitectura para desplegar **Landing RAG Smith** en un entorno de producción.

## 1. Arquitectura a Alto Nivel

El proyecto es un monolito que utiliza **PocketBase** como motor de base de datos, backend y servidor web integrado, y **Angular** como cliente (Single Page Application).

- **Frontend**: Angular 22, compilado estáticamente. Los archivos se sirven directamente desde el directorio `backend/pb_public/`.
- **Backend**: PocketBase extendido mediante hooks de Javascript (`pb_hooks`) que corren en un entorno Goja (V8).
- **Lanzador**: Se utiliza un script de Node.js (`start_pb.cjs`) para leer las variables de entorno de un archivo `.env` y levantar el binario de PocketBase (`pocketbase` o `pocketbase.exe`).

## 2. Requisitos del Servidor (Host)

- **Node.js**: `v24.18.0` o superior (para ejecutar el script lanzador).
- **PM2 / Systemd**: Para gestionar el proceso en segundo plano y auto-reinicio.
- **Nginx o Caddy**: Actuando como Proxy Inverso para proveer certificados SSL/TLS y manejar terminación HTTPS.
- **Almacenamiento**: Permisos de lectura/escritura en la carpeta `backend/pb_data/` para la persistencia de la base de datos SQLite.

## 3. Variables de Entorno (`.env`)

En la raíz del proyecto, debes crear un archivo `.env` utilizando `.env.example` como plantilla.

```env
# Claves de acceso a los LLMs (requeridas para el Chatbot)
OPENROUTER_API_KEY=sk-or-v1-...
GROQ_API_KEY=gsk_...

# Modelo de Embeddings
EMBEDDING_API_KEY=sk-or-v1-...
EMBEDDING_API_BASE_URL=https://openrouter.ai/api/v1

# Cloudflare Turnstile (Anti-Spam)
TURNSTILE_SECRET_KEY=1x00...

# URL Pública de la Aplicación (Usada para CORS y cabeceras de OpenRouter)
APP_PUBLIC_URL=https://tudominio.com

# Rate Limit Config (Opcional, por defecto 60s / 20 reqs)
CHAT_RATE_LIMIT_WINDOW_MS=60000
CHAT_RATE_LIMIT_MAX_REQUESTS=20
```

> [!CAUTION]
> Asegúrate de que el `.env` no sea rastreado por tu gestor de control de versiones. Las claves del LLM tienen impacto financiero directo.

## 4. Pasos de Despliegue (CI/CD o Manual)

El ciclo de vida de un despliegue limpio consta de los siguientes pasos:

1. **Clonar/Actualizar Repositorio:**
   ```bash
   git pull origin main
   ```
2. **Instalar Dependencias de Node:**
   ```bash
   npm ci
   ```
3. **Construir el Frontend de Producción:**
   ```bash
   npm run build
   ```
   *Nota: Esto eliminará y regenerará los archivos en `backend/pb_public`*.
4. **Permisos del Binario:**
   Asegúrate de que PocketBase sea ejecutable en tu servidor Linux:
   ```bash
   chmod +x backend/pocketbase
   ```
5. **Reinicio de la Aplicación (con PM2):**
   ```bash
   pm2 restart landing-rag
   ```

## 5. Configuración del Administrador de Procesos (PM2)

Para mantener la aplicación viva en producción, se recomienda `pm2`. Inicia el proceso por primera vez con:

```bash
pm2 start start_pb.cjs --name "landing-rag"
pm2 save
pm2 startup
```

El script `start_pb.cjs` se encargará de inyectar las variables de entorno de tu archivo `.env` antes de spawnear el subproceso de PocketBase.

## 6. Configuración del Proxy Inverso (Nginx)

PocketBase correrá por defecto en el puerto `8090`. Tu proxy inverso debe apuntar a este puerto y soportar Server-Sent Events (SSE) si llegaras a necesitar suscripciones en tiempo real en el futuro.

**Ejemplo de bloque de servidor para Nginx:**

```nginx
server {
    server_name tudominio.com;

    location / {
        proxy_pass http://127.0.0.1:8090;
        
        # Headers estándar
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_addressee;
        
        # Opcional: Requerido si alguna vez usas el realtime de PB
        proxy_set_header Connection "keep-alive";
        proxy_set_header Upgrade $http_upgrade;
    }

    # Resto de configuración SSL (Certbot)...
}
```

## 7. Volúmenes y Respaldos (Persistencia)

Todo el estado del sistema, historiales de chat, esquemas de bases de datos, configuraciones guardadas e imágenes de proyectos viven dentro del directorio `backend/pb_data/`.

> [!IMPORTANT]
> **Estrategia de Backup:** Configura un `cron job` que respalde periódicamente el directorio `backend/pb_data/`. PocketBase utiliza SQLite (WAL mode), por lo que puedes respaldarlo copiando el directorio completo o utilizando la funcionalidad de autómata de respaldos nativa en el panel de admin de PocketBase. No respaldes los binarios, solo `pb_data/`.

## 8. Verificaciones Post-Despliegue (Sanity Checks)

Una vez desplegada la aplicación, el DevOps debe confirmar que los siguientes puntos funcionen correctamente:

1. **Carga de UI:** Entra a `https://tudominio.com` y verifica que cargue el frontend sin errores en consola.
2. **Panel de Admin:** Navega a `https://tudominio.com/_/` para verificar el acceso a PocketBase. (Cambia la contraseña por defecto de administrador si el proyecto está virgen).
3. **Flujo de Chats y RAG:** Envía un mensaje desde la UI para confirmar que las variables de entorno de OpenRouter/Groq estén funcionando y la base de datos se lea adecuadamente.
4. **Health Check (Monitoreo):** Para integrar la app a sistemas como Uptime Kuma o Datadog, puedes hacer un simple request `GET` a `https://tudominio.com/api/health` o a `https://tudominio.com/api/custom/site-config` y esperar un HTTP `200`.

## 9. Monitoreo de Colecciones de Alto Crecimiento

El comportamiento actual en el backend insertará cada interacción de chat en la colección `chat_logs` de PocketBase para propósitos analíticos. Esta colección crecerá de manera continua. Asegúrate de configurar las retenciones de disco necesarias o un proceso de purga externa si el volumen de visitas se vuelve excepcionalmente alto. Las memorias temporales (`chat_memory`) ya se auto-purgan a un límite de 3 filas por usuario automáticamente.
