# resumeSite
This website is meant to serve as a resume website for me. The frontend is built using HTML, CSS, and JavaScript. The backend is built using AWS S3, Terraform, and GitHub Actions. The site can be accessed at [http://calebvar.com](http://calebvar.com) if website is up and running.

## Kubernetes Deployment Notes
1. Container is built on local machine 
2. Container is pushed to personal AWS ECR. 
3. Follow documentation to create kubectl secret as followed in [this medium article](https://medium.com/@danieltse/pull-the-docker-image-from-aws-ecr-in-kubernetes-dc7280d74904). Command should start like this:
- kubectl create secret docker-registry regcred
4. Give chmod +x to ./startup.sh and ./shutdown.sh 

### Team/Collaborators
Backend and K8s Work - Caleb Varghese(calebvarghese)
Frontend Work - Brian Opdahl(briancantcode)