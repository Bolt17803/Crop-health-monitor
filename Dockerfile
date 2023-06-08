FROM python:latest
COPY backend /app
WORKDIR /app
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 -y
RUN pip install -r requirements.txt
RUN pip install python-multipart
RUN uvicorn main:app --reload
