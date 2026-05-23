# Logistica de Envios Globales 
 
Proyecto Final - Programacion II 
 
## Tecnologias 
- Java 21 + Spring Boot 
- MariaDB (Conductores) 
- Cassandra (Rutas) 
- React + Tailwind CSS 
- Docker + Docker Compose 
 
## Puertos 
- API Gateway: 9090 
- Almacen A: 9091 
- Almacen B: 9092 
 
## Correr con Docker 
1. Abrir Docker Desktop 
2. Ejecutar: docker-compose up --build 
3. Crear keyspace: docker exec -it cassandra cqlsh 
 
## Correr sin Docker 
1. Correr MariaDB y Cassandra en Docker 
2. Correr los 3 proyectos en IntelliJ 
3. Frontend: npm run dev en carpeta frontend 
