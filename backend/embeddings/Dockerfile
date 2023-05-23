# If I put "FROM --platform=linux/amd64" here and I try to build it on an arm64 device the service doesn't work.
# For this reason, at least on arm64 machines I've pushed the image to doviscarcelli/embeddings-amd64 with
# docker build --platform linux/amd64 -t doviscarcelli/embeddings-amd64 .
# docker image push doviscarcelli/embeddings-amd64

FROM python:3.9
WORKDIR /app/embeddings
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 3004

# Run the FastAPI application when the container starts
CMD ["uvicorn", "embeddings.main:app", "--host", "0.0.0.0", "--port", "3004", "--reload"]
