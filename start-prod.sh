docker-compose rm -f
docker-compose pull
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build --force-recreate