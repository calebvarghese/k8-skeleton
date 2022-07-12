terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.21.0"
    }
  }
}

variable "AWS_ACCESS_KEY_ID" {
  type = string
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "b" {
  bucket = "caleb-varghese-resume-website-bucket"

  tags = {
    Name        = "Resume Bucket Example"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_website_configuration" "static-website" {
  bucket = aws_s3_bucket.b.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

}

resource "aws_route53_zone" "primary" {
  name = "calebvarghese.com"
}

resource "aws_route53_record" "domain" {
  name    = "calebvarghese.com"
  zone_id = aws_route53_zone.primary.id
  type    = "A"
  alias {
    name = aws_s3_bucket_website_configuration.static-website.website_domain
    zone_id                = aws_s3_bucket.b.hosted_zone_id
    evaluate_target_health = false
  }
}