# Occupy630

A modern apartment rental platform built with Laravel 11, React, and Inertia.js.

## Features

- 🏠 **Apartment Management** - List, search, and manage apartment rentals
- 💳 **Payment Processing** - Integrated Paystack payment gateway
- 💬 **Real-time Chat** - Live messaging between users
- 🔔 **Notifications** - Real-time notification system
- 👥 **Multi-user System** - Support for tenants, landlords, admins, and companies
- 📱 **PWA Ready** - Progressive Web App capabilities
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support
- ⚡ **Performance Optimized** - Code splitting, caching, and database optimization

## Tech Stack

- **Backend:** Laravel 11, PHP 8.2+
- **Frontend:** React 18, Inertia.js, Tailwind CSS
- **Real-time:** Laravel Echo, Pusher (optional)
- **Payments:** Paystack
- **Database:** MySQL/MariaDB or SQLite

## Quick Start

### Prerequisites

- PHP >= 8.2
- Composer >= 2.0
- Node.js >= 18.x
- MySQL >= 8.0 (or SQLite for development)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd occupy630
   ```

2. **Install dependencies:**
   ```bash
   composer install
   npm install
   ```

3. **Setup environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database in `.env`** (SQLite is default for development)

5. **Run migrations:**
   ```bash
   php artisan migrate
   php artisan db:seed  # Optional: seed with sample data
   ```

6. **Start development servers:**
   ```bash
   # Terminal 1: Laravel
   php artisan serve
   
   # Terminal 2: Vite
   npm run dev
   ```

7. **Access the application:**
   - Open `http://localhost:8000`
   - Login with admin credentials (created via seeder or manually)

## Documentation

For detailed setup instructions, configuration, and troubleshooting, see **[SETUP.md](SETUP.md)**.

## Configuration

### Required Services

- **Database:** MySQL/MariaDB or SQLite
- **Mail:** SMTP configuration (for emails)

### Optional Services

- **Pusher:** For real-time features (chat, notifications)
  - App works without Pusher, but real-time features will be disabled
- **Paystack:** For payment processing
  - Use test keys for development

See [SETUP.md](SETUP.md) for detailed configuration instructions.

## Project Structure

```
occupy630/
├── app/              # Laravel application
├── database/         # Migrations and seeders
├── resources/
│   └── js/          # React/Inertia frontend
│       ├── Components/
│       ├── Pages/
│       └── Layouts/
├── routes/          # Application routes
└── public/          # Public assets
```

## Development

### Running in Development

```bash
# Start Laravel server
php artisan serve

# Start Vite dev server (separate terminal)
npm run dev
```

### Building for Production

```bash
npm run build
php artisan optimize
```

## Troubleshooting

Common issues and solutions are documented in [SETUP.md](SETUP.md#troubleshooting).

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
