FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy your index.html file to the working directory
COPY ./ /app/

# Install a minimal web server (e.g., BusyBox HTTPd) to serve the HTML file
RUN apk --no-cache add busybox-extras

# Expose port 80 to serve HTTP traffic
EXPOSE 80

# Command to run the web server and serve the HTML file
CMD ["httpd", "-f", "-p", "80", "-h", "/app/frontEndJS"]

#build, create, start locally and then hit localhost:8080