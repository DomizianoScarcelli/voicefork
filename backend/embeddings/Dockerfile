FROM python:3.9-slim-buster
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 3004

# Run the FastAPI application when the container starts
CMD uvicorn main:app --port 3004 --reload
