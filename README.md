# 🚀 Anthony Smith's AI Agent & Portfolio (Forkable Edition)

[![Angular](https://img.shields.io/badge/Angular-22.0-DD0031.svg?logo=angular)](https://angular.dev/)
[![PocketBase](https://img.shields.io/badge/PocketBase-0.22.x-black.svg?logo=sqlite)](https://pocketbase.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **💡 Nota del creador:** Originalmente construí este sistema exclusivamente para ser mi portafolio personal y mi agente de IA para responder dudas en redes sociales. Decidí abrir el código y hacerlo 100% configurable porque muchos me lo pidieron. Lo libero a la comunidad "tal cual" (as-is); si te sirve, ¡date vuelo y úsalo! Solo recuerda que es un proyecto personal open-source, así que no ofrezco soporte técnico 24/7 😅.

Un portafolio interactivo y chatbot RAG (Retrieval-Augmented Generation) completamente configurable desde una interfaz gráfica. **Construido para ser forkeado**. 

Este sistema te permite tener un sitio web personal ultra-rápido y un asistente de Inteligencia Artificial que **habla como tú y sabe lo que tú sabes**, sin necesidad de contenedores pesados ni bases de datos vectoriales dedicadas.

---

## ✨ Características

- **Cero Código para Personalizar:** Todo el branding, textos, colores y personalidad del asistente se configuran desde el panel de administración de PocketBase.
- **Asistente RAG Autónomo:** Tu bot responde basado en la información que subas a tu base de conocimientos (proyectos, artículos, currículum).
- **Memoria Conversacional:** El bot recuerda el contexto de la charla con cada usuario.
- **Rendimiento Extremo:** Angular 22 con Signals en el Frontend, y PocketBase (Go) + SQLite en el Backend. Ideal para VPS de $5 USD/mes.

---

## 🚀 Quick Start (Fork & Run)

### 1. Requisitos Previos

*   **Node.js**: Versión `v24.15.0` o superior (usa NVM si es necesario).
*   **PocketBase**: Descarga el ejecutable desde [pocketbase.io/docs/](https://pocketbase.io/docs/) y colócalo en la raíz del repositorio.

### 2. Variables de Entorno

```bash
cp .env.example .env
```
Edita `.env` con tus credenciales:
*   `OPENROUTER_API_KEY`: API Key de OpenRouter (LLM primario).
*   `GROQ_API_KEY`: API Key de Groq (LLM de fallback rápido).
*   `EMBEDDING_API_KEY`: API Key para vectorizar texto (ej. OpenAI).
*   `EMBEDDING_API_BASE_URL`: Endpoint de embeddings.
*   `TURNSTILE_SECRET_KEY`: Llave de Cloudflare Turnstile (Anti-bot).

### 3. Iniciar el Backend (PocketBase)

Ejecuta el script que carga las variables e inicia PocketBase:

```bash
node start_pb.cjs
```
> **Nota:** La primera vez que lo corras, PocketBase aplicará las migraciones automáticamente, creando las tablas necesarias y sembrando configuración por defecto.

Crea tu cuenta de Administrador entrando a: [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/)

### 4. Iniciar el Frontend (Angular)

```bash
npm install
npm run start
```
Abre tu navegador en [http://localhost:4200](http://localhost:4200). 

---

## 🎨 Configure Your Brand (No Code)

Desde el panel de PocketBase ([http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/)), ve a la colección `config_app` y edita el registro `main`. Podrás cambiar:

| Campo | Descripción |
|---|---|
| `brand_name` | Tu nombre o el nombre de tu marca (Navbar, Header). |
| `hero_line_1, 2, 3` | Las tres líneas principales del título de la página. |
| `hero_paragraph` | La biografía corta debajo del título. |
| `avatar` | Sube tu foto (JPEG, PNG, WebP) para el chat. |
| `welcome_message` | Con qué mensaje recibe tu bot a los usuarios. |
| `contact_email` | Si el bot no sabe la respuesta, sugerirá este correo. |
| `persona_name` | El nombre con el que el bot se identificará ("Soy {persona_name}"). |
| `system_prompt` | (Opcional) Instrucciones detalladas de la personalidad de tu bot. |

¡El Frontend se actualizará automáticamente sin necesidad de recompilar!

---

## 📚 Add Your Knowledge (RAG)

Tu bot no sabrá de qué hablar hasta que le enseñes. Llena estas colecciones desde PocketBase:

1. **`portfolio`**: Tus proyectos. El bot podrá recomendarlos ("Te sugiero ver mi proyecto X...").
2. **`knowledge_base`**: Datos sueltos, tu currículum, artículos, preguntas frecuentes. 
3. **`reels`**: Enlaces a tus videos de YouTube/TikTok/Instagram con transcripciones.

**Reindexación Automática:** Cada vez que creas o editas un registro, el sistema genera sus *Embeddings Vectoriales* en segundo plano. Si necesitas forzarlo, puedes hacer un POST a `/api/custom/reindex` como Admin.

---

## 🧠 Customize Your Personality

Si quieres que el bot tenga un tono muy específico (ej. pirata, muy corporativo, sarcástico), edita el campo `system_prompt` en `config_app`. 

Ejemplo:
```text
Eres {persona_name}. Eres un experto en C++ muy sarcástico.
Regla: Siempre bromea sobre la lentitud de JavaScript.
Regla: Si no sabes algo, activa out_of_bounds.
```

---

## 🏗️ Architecture

```mermaid
graph TD
    A[Angular 22 Client] -->|GET /api/custom/site-config| B[PocketBase Backend]
    A -->|POST /api/custom/chat| B
    B -->|Hooks Goja / JS| C[Hybrid Retrieval Engine]
    C -->|Vector Similarity| D[(SQLite - Vector Embeddings)]
    C -->|Lexical Match| E[(SQLite - Text)]
    C -->|API Embeddings| F[Embedding Provider]
    B -->|System Prompt Inject| G[LLM API (OpenRouter/Groq)]
    G -->|JSON Contract| B
    B -->|Sanitized Result| A
```

## 🔒 Security

* **Rate Limiting**: Límites en memoria basados en hashes de IP.
* **Anti-Prompt Injection**: Validaciones por esquema estricto de JSON; si el modelo devuelve algo mal formateado, hay un fallback seguro.
* **Turnstile**: Retos criptográficos invisibles anti-bot obligatorios en el chat.

## 📝 License

Este proyecto es Open Source bajo licencia MIT. Ver archivo `LICENSE`.
