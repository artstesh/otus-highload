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

```bash
cd deployment
```

The folder includes a `docker-compose.yml` file that defines the required services.

There are two options for the app:

**1. Start with the postgres container**

Run the `start.bat`, or the following script:

```bash
docker-compose --profile development -f docker-compose.yml -f docker-compose.override.yml down && docker-compose --profile development -f docker-compose.yml -f docker-compose.override.yml build && docker-compose --profile development -f docker-compose.yml -f docker-compose.override.yml up
```

**2. With existing postgres**

* Open the `docker-compose.production.yml` and change the `ConnectionStrings__DefaultConnection` accordingly to your settings.

* Run the `start-production.bat`, or the following script:

```bash
docker-compose --profile production -f docker-compose.yml -f docker-compose.production.yml down && docker-compose --profile production -f docker-compose.yml -f docker-compose.production.yml build && docker-compose --profile production -f docker-compose.yml -f docker-compose.production.yml up
```

---

#### 3. Access the Application

Once the containers are running, access the application in your browser or via a tool like `curl` at `https://localhost:5001/swagger/index.html`.


### Customization

If you need to customize the project (e.g., change network ports, environment variables, or volumes), modify the `docker-compose.yml` file. For example:

- Change port mappings under the `ports` section.
- Update environment variables under the `environment` section.

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
