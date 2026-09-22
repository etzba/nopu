#!/bin/sh
curl -X POST http://localhost:3003/api/users \
    -H 'Content-Type: application/json' \
    -d '{ "username": "root", "name": "etzba", "password": "Aa123456" }'

curl http://localhost:3003/api/users

TOKEN=$( curl -X POST http://localhost:3003/api/login -H 'Content-Type: application/json' -d '{ "username": "root", "password": "Aa123456" }' | jq -j '.token' )

curl http://localhost:3003/api/blogs -H "Authorization: Bearer ${TOKEN}"
