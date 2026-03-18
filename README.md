# 🚀 Fashion E-commerce - Dockerized Fullstack Project
A professional fashion web application built with Laravel (Backend API) and React (Frontend), fully orchestrated using Docker Compose.

### 1. Clone the Project
First, clone the repository and navigate to the project root
```bash
git clone https://github.com/hoainamtq321/My_Project_Docker.git
cd My_Project_Docker
```
# 2. Environment Configuration
Copy the .env.example file to .env within the backend/ directory.
```bash
cd backend
cp .env.example .env
```
Update the Database parameters in the ``` .env ``` file to match the configurations defined in ``` docker-compose.yml. ```
```ini
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=root
DB_PASSWORD=root
```
# 3. Launch with Docker
Start all services (Nginx, PHP-FPM, MySQL, Node.js) in detached mode. This command will build the images if they don't exist:
```
docker-compose up -d --build
```
# 4. Backend Setup (Initial Run)
Once the containers are healthy, execute these commands to set up the application core.
  **Note:** We use```  php artisan key:generate  ``` to fix the ``` MissingAppKeyException ``` and ensure data encryption integrity.
```
# Install PHP dependencies via Composer
sudo docker-compose exec backend composer install

# Generate Application Security Key
sudo docker-compose exec backend php artisan key:generate

# Run Database Migrations and Seed sample data
sudo docker-compose exec backend php artisan migrate --seed
```
# 5. Permission Management & Security
To prevent Permission denied errors (common in Docker environments), we must ensure the web server has the correct ownership of the storage and cache directories.
```
# Set directory permissions to 775
sudo docker-compose exec backend chmod -R 775 storage bootstrap/cache

# Change ownership to the web server user (www-data)
sudo docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache
```


