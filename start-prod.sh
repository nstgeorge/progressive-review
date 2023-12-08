# cp ~/backend-env ~/progressive-review/backend/.env
# cd ~/progressive-review
# docker system prune -f
docker-compose pull
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build --force-recreate # --detach