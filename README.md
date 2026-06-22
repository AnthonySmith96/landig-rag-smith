# Guía de Inicio Rápido — Desarrollo y Pruebas Locales

Este documento detalla los pasos para levantar y probar localmente la aplicación web de **Anthony Smith**, incluyendo el frontend en Angular y el backend integrado con PocketBase con respuestas de IA.

---

## 🛠️ Requisitos Previos

Asegúrate de contar con lo siguiente instalado en tu máquina local:
*   **Node.js**: Versión `v22.22.3` / `v24.15.0` o superior (Recomendado: `v24.17.0+`).
*   **PocketBase Binary**: `pocketbase.exe` (ya se encuentra ubicado en la raíz del proyecto).
*   **Git**: Para control de versiones.

---

## ⚙️ 1. Configuración de Variables de Entorno

PocketBase requiere variables de entorno locales para conectarse con los proveedores de LLM y Embeddings.

1. En la raíz del proyecto, haz una copia de `.env.example` y cámbiala de nombre a `.env`:
   ```bash
   copy .env.example .env
   ```
2. Abre el archivo `.env` y rellena las credenciales correspondientes:
   *   `OPENROUTER_API_KEY`: API Key de OpenRouter (si deseas usar este proveedor).
   *   `GROQ_API_KEY`: API Key de Groq (si deseas usar este proveedor).
   *   `EMBEDDING_API_KEY`: API Key para generación de embeddings (por ejemplo, de OpenAI o similar).
   *   `EMBEDDING_API_BASE_URL`: URL base de la API de embeddings (ej. `https://api.openai.com/v1`).
   *   `TURNSTILE_SECRET_KEY`: **Ya está preconfigurada** con la llave de pruebas de Cloudflare (`1x0000000000000000000000000000000AA`), por lo que no es necesario modificarla para pruebas locales.

---

## 🗄️ 2. Levantar el Backend (PocketBase)

PocketBase maneja la base de datos local (SQLite) y expone la API del chatbot.

1. Abre una terminal de PowerShell en la raíz del proyecto y arranca PocketBase:
   ```powershell
   .\pocketbase serve
   ```
   *Al iniciar por primera vez, PocketBase aplicará automáticamente las migraciones localizadas en `/pb_migrations` para estructurar la base de datos.*
   
2. Abre el panel de administración en tu navegador:
   *   **URL:** [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/)
   *   Crea tu **usuario Administrador** inicial (email y contraseña).

3. **Verificación de la Configuración de la IA (`config_app`):**
   *   En la barra lateral izquierda, ve a la colección `config_app`.
   *   Verifica que exista un registro con `key = main` (se crea automáticamente en la migración inicial).
   *   Asegúrate de que los campos coincidan con tus preferencias:
       *   `active_provider`: `openrouter` o `groq`.
       *   `active_model`: El nombre del modelo que usarás (ej. `meta-llama/llama-3-8b-instruct:free` para OpenRouter, o `llama3-8b-8192` para Groq).
       *   `embedding_model`: El nombre del modelo de embeddings (ej. `text-embedding-3-small`).

---

## 🚀 3. Levantar el Frontend (Angular)

El frontend de Angular se conecta a PocketBase para leer portafolio, reels y chatear con la IA.

1. Abre otra terminal de PowerShell en la raíz del proyecto e instala dependencias (si no lo has hecho ya):
   ```powershell
   npm install
   ```
2. Arranca el servidor de desarrollo local de Angular:
   ```powershell
   npm start
   ```
3. Abre tu navegador en la dirección local del frontend:
   *   **URL:** [http://localhost:4200](http://localhost:4200)

---

## 🧪 4. Pruebas Locales del Chatbot

Para probar la respuesta inteligente de la IA con recuperación de contexto (RAG):

1. **Añade Información de Prueba:**
   *   Entra al panel de administración de PocketBase ([http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/)).
   *   Ve a la colección `knowledge_base` y añade un registro. Por ejemplo:
       *   `intent`: `saludo`
       *   `title`: `Presentación de Anthony`
       *   `content`: `Anthony Smith es un Ingeniero de Software especializado en desarrollo web utilizando Angular, Node.js y PocketBase con un fuerte foco en arquitecturas de alto rendimiento.`
       *   `is_active`: `true` (marcado por defecto)
   *   *Al guardar el registro, el Hook de PocketBase intentará automáticamente llamar a la API de embeddings configurada en tu `.env` para vectorizar la información. Una vez completado, el campo `embedding_status` cambiará a `ready`.*

2. **Chatea con el Asistente:**
   *   Ve a la página web en [http://localhost:4200](http://localhost:4200).
   *   Haz clic en el botón flotante (**FAB** con icono de terminal `>_`) en la esquina inferior derecha para abrir la sesión de IA.
   *   Escribe una pregunta que coincida con tu base de conocimientos (ej: *"¿Quién es Anthony Smith y cuál es su stack?"*).
   *   ¡El chatbot te devolverá una respuesta estructurada generada por el LLM configurado, utilizando la información que acabas de guardar!
