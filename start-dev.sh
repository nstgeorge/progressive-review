docker-compose rm -f
docker-compose pull
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --force-recreate