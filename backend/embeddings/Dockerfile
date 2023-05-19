FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 3004

# Run the FastAPI application when the container starts
CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "3004"]
