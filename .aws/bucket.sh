#!/usr/bin/env bash
awslocal s3api create-bucket --bucket debt-processing
aws s3api put-bucket-cors --bucket debt-processing --cors-configuration file://cors.json