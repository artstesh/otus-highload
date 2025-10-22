# Project Documentation

## Running the Project in Docker

This documentation provides step-by-step instructions for running the project using **Docker Compose**.

### Prerequisites

Before proceeding, ensure you have the following installed on your system:

1. [Docker](https://docs.docker.com/get-docker/) (Ensure the Docker daemon is running).
2. [Docker Compose](https://docs.docker.com/compose/).

### Steps to Run the Project in Docker

#### 1. Clone the Repository

Start by cloning the project repository to your local machine:

```bash
git clone https://github.com/artstesh/otus-highload.git
cd otus-highload
```

#### 2. Run the Project with Docker Compose

Move to `deployment` directory:
```bash
> cd deployment
```
and run `start.bat`

```bash
> start.bat
```
---

#### 3. Access the Application

Geo Swagger - `https://localhost:5001`
Fields Swagger - `https://localhost: 5002`
UI - `http://localhost:4200`

### Postman

Follow the [link](https://www.postman.com/orange-satellite-666437/otus-highload/collection/8uv29vb/otus-highload) to look at the postman collection.

* The methods `user/list` and `get/{id}` has pre-request scripts, which authorize automatically, no need to change the actor. But if your need that, change the appropriate variables in the collection variables section;
* There are no requirements to the password during the registration, so its on your own;
* `/login` returns a `uuid` which should be set as `x-token` header to authorized requests;

### Troubleshooting

1. **Port Conflicts:**
   If the specified ports are already in use, modify the `ports` section in the `docker-compose.yml` file to use available ports.

2. **Docker Daemon Not Running:**
   Ensure Docker is running on your system before executing Docker Compose commands.
