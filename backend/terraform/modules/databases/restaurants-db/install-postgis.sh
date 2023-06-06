#!/bin/bash
pip install pgcli

pgcli --host=postgres-restaurants.cbtzosmh5abb.us-east-1.rds.amazonaws.com --port=5432 --username=root --dbname=postgres << EOF
CREATE EXTENSION IF NOT EXISTS postgis;
EOF
