from fastapi import FastAPI, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def recieveFile(file: bytes = File(...),data: str = Form(...)):
    image = Image.open(io.BytesIO(file))
    image.show()
    print(file)
    print(data)
    return {"uploadStatus":"Complete"}
