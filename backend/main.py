from fastapi import FastAPI, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from enum import Enum
from pydantic import BaseModel
import uvicorn
from typing import List
from segment_anything import sam_model_registry, SamPredictor
import numpy as np
import cv2

app = FastAPI()

image_global = None
crop_global = None
selection_global = None 
sam = sam_model_registry['vit_h'](checkpoint="sam_vit_h_4b8939.pth")
predictor = SamPredictor(sam)

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

class Input(BaseModel) :
    x1: int
    y1: int
    x2: int
    y2: int

@app.post("/item/")
async def coord(coord: Input):
    return coord

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def recieveFile(file: bytes = File(...),data: str = Form(...)):
    image = Image.open(io.BytesIO(file))
    #image.show()
    #print(file)
    #print(data)
    image_global = image
    crop_global = data
    return {"uploadStatus":"Complete"}

@app.post("/upload_selection")
async def recieveAnotherFile(data: str = Form(...)):
    #print(data)
    selection_global = data
    
    return {"uploadStatus":"Complete"}

# @app.post("/upload")
# async def recieveFile(file: bytes = File(...)):
#     image = Image.open(io.BytesIO(file))
#     image.show()
#     print(file)
#     return {"uploadStatus":"Complete"}

@app.post('/analyze')
async def analyze(image: bytes = File(...), coord: List[int] = Form(...), points: List[int] = Form(...), labels: List[int] = Form(...)):
    np_array = np.frombuffer(image, np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    x, y, w, h = coord
    input_box = np.array([x, y, x+w, y+h])
    predictor.set_image(img)
    masks, _, _ = predictor.predict(
        box= input_box,
        point_coords= points,
        point_labels= labels,
        multimask_output=False
        )
    n_img = np.zeros(img.shape, dtype= int)
    for i in range(masks[0].shape[0]):
        for j in range(masks[0].shape[1]):
            if masks[0][i][j] == True:
                n_img[i, j, :] = image[i][j][:]
    img_display = cv2.convertScaleAbs(n_img)
    img_bytes = img_display.tobytes()

    return {"result": img_bytes}
    
