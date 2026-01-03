# Movie Hub 🎬

Movie Hub is a modern, microservices-based movie ticket booking platform built with **NestJS** (Backend), **Next.js** (Frontend), and managed using **Nx Monorepo**.

## 🚀 Architecture Overview

The system follows a microservices architecture:

- **Frontend**: Next.js application.
- **API Gateway**: Single entry point for all client requests.
- **Microservices**: User, Movie, Cinema, Booking (handling specific domains).
- **Communication**: Hybrid approach using TCP (Inter-service) and Redis Pub/Sub (Events).
- **Infrastructure**: Dockerized services using PostgreSQL (Database per service) and Redis.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (Version 20+ recommended)
- [Git](https://git-scm.com/)

---

## 🏃‍♂️ Getting Started

Follow these steps to get the system running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Tanh1603/movie-hub.git
cd movie-hub
```

### 2. Configure Environment Variables

You need to set up the `.env` files for Docker services.

**Database Environments:**
Create the following files with the content below (or copy from examples if available):

- `apps/user-service/.env.db`
- `apps/movie-service/.env.db`
- `apps/cinema-service/.env.db`
- `apps/booking-service/.env.db`

_Content template for `.env.db` (Change `POSTGRES_DB` name accordingly: `movie_hub_user`, `movie_hub_movie`, etc.):_

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=movie_hub_<service_name>
```

**Service Environments:**
Create `.env` files in each service directory (e.g., `apps/user-service/.env`). Ensure you set `TCP_HOST=0.0.0.0` and use docker service names (e.g., `postgres-user`) for database hosts.

> **Note:** A detailed setup guide for `.env` files is available in the project documentation.

### 3. Run the System with Docker Compose

This command will build the images, start the databases, redis, and backend microservices, and run the seeding scripts.

```bash
docker compose up -d --build
```

Wait a few minutes for the services to build and the `healthcheck` to pass. You can check logs with:

```bash
docker compose logs -f
```

### 4. Start the Frontend

Since the frontend is optimized for local development, run it outside of Docker:

```bash
# Install dependencies
npm install

# Start the web application
npx nx serve web
```

---

## 🌐 Implementation & Access URLs

Once everything is running, you can access the services at:

| Service             | Access URL                                               | Description         |
| ------------------- | -------------------------------------------------------- | ------------------- |
| **Frontend**        | [http://localhost:4200](http://localhost:4200)           | Main User Interface |
| **API Gateway**     | [http://localhost:4000/api](http://localhost:4000/api)   | Main API Endpoint   |
| **Swagger Docs**    | [http://localhost:4000/docs](http://localhost:4000/docs) | API Documentation   |
| **User Service**    | `localhost:4001`                                         | TCP/Debugging Port  |
| **Movie Service**   | `localhost:4002`                                         | TCP/Debugging Port  |
| **Cinema Service**  | `localhost:4003`                                         | TCP/Debugging Port  |
| **Booking Service** | `localhost:4004`                                         | TCP/Debugging Port  |

## 🗄️ Database Access (Optional)

If you have a DB Client (DBeaver, PGAdmin), you can connect to the databases via these ports:

- **User DB**: `localhost:5435`
- **Movie DB**: `localhost:5436`
- **Cinema DB**: `localhost:5437`
- **Booking DB**: `localhost:5438`
