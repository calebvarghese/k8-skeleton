#!/bin/bash

minikube start
minikube addons enable metrics-server
kubectl apply -f webapp.yaml
osascript -e 'tell application "Terminal" to do script "minikube dashboard"'
sleep 30
osascript -e 'tell application "Terminal" to do script "minikube service webapp-service"'
