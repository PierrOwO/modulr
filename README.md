# 🚀 Modulr CLI (`mm`)

A robust, developer-first global command-line tool designed to build and manage **Modular Monolith** architectures in Laravel applications. It enforces clean separation of concerns, DRY principles, and domain-driven design (DDD), while integrating seamlessly with Vue.js and Inertia.js.

---

## ✨ Key Features

- **Global Installation**: Install once and run `mm` from anywhere in your terminal across any Laravel project.
- **Dedicated Tool Environment**: Modulr maintains its own isolated configuration (`mm.config.json` / Modulr `.env`), completely independent of your Laravel application's main `.env` file.
- **Fully Customizable Stubs**: Stubs are downloaded directly into your project's `.mm-stubs/` directory, allowing you to tailor code templates precisely to your team's needs.
- **Multiple Module Archetypes**:
  - **CRUD**: Full set containing Controllers, Models, DTOs, Migrations, Providers, and Resources.
  - **API**: Lightweight structure for API-only endpoints and resources.
  - **Full**: Comprehensive enterprise-grade modules including Domain Services, Form Requests, and Policies.
  - **Aggregate**: Advanced Domain-Driven Design (DDD) structure for rich aggregates and value objects.

---

## 📂 Project Structure

Once initialized inside your Laravel app, Modulr creates a clean local workspace for its files and templates:

```text
your-laravel-app/
├── app/
│   └── Modules/               # Backend modules (customizable via Modulr config)
├── resources/
│   └── js/
│       └── Modules/           # Frontend modules (Vue + Inertia)
├── .mm-stubs/                 # Fully editable local stub templates (Controllers, Models, etc.)
├── mm.config.json             # Local configuration file for Modulr
└── modules.json               # Registry of active modules in the project
```

---

## 📦 Installation & Global Setup

1. Install the CLI tool globally (or link it locally during development):
   ```bash
   npm install -g modulr-cli
   # or
   npm link
   ```

2. Navigate to the root directory of any Laravel project and initialize Modulr:
   ```bash
   mm setup
   ```
   *This command creates the configuration files, generates the registry, and pulls default stubs directly into your project.*

---

## ⚙️ Configuration

Modulr reads its target directories and settings dynamically from its own isolated configuration (`mm.config.json` or Modulr `.env` variables):

```json
{
  "env": "development",
  "version": "1.0.0",
  "backendDir": "app/Modules",
  "frontendDir": "resources/js/Modules",
  "stubsUrl": "https://raw.githubusercontent.com/PierrOwO/modulr/main/.mm-stubs"
}
```

---

## 🛠️ Upcoming Features & Roadmap

- **Interactive CLI Environment Editor**: In an upcoming release, you will be able to view and modify Modulr's dedicated environment variables directly from the terminal without manually editing configuration files.
- **Granular Component Additions**: Add individual components (like a new model, controller, or form request) to an already existing module on the fly.
- **Aggregate Relationship Management**: Instantly scaffold child elements attached to existing DDD aggregates while automatically preserving parent-child database relations in seconds.

---

## 📄 License

Open-source software licensed under the [MIT license](LICENSE).