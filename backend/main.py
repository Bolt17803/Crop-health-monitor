from fastapi import FastAPI, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from enum import Enum
from pydantic import BaseModel
import uvicorn
from typing import List
from segment_anything import sam_model_registry, SamPredictor
import segmentation_api as segmentor
import classification_api as classifier
import json
import numpy as np
import cv2
import base64

pil_image = None

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
    #image = Image.open(io.BytesIO(file))
    #encoded_image = base64.b64encode(file).decode("utf-8")
    # nparr = np.fromstring(base64.b64decode(encoded_image), np.uint8)
    # img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    print("received")
    data = json.loads(data)
    coords = [data["x1"],data["y1"],data["x2"],data["y2"]]
    print(coords)
    img_b64s,img_cv2 = segmentor.getMask64(file,coords)
    color_coverted = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(color_coverted)
    pil_image = pil_image.crop((*coords,))
    pil_image = pil_image.resize((256,256))
    pil_image.save(f"./apple_black_rot_segmented/{coords}.png")
    #print(img_b64s)
    return {"uploadStatus":"Complete","result":"data:image/jpeg;base64,"+img_b64s}#classifier.predict(image)}
    

@app.post("/upload_selection")
async def recieveAnotherFile(file: bytes = File(...),data: str = Form(...)):
    print(data)
    img = Image.open(io.BytesIO(file))
    result=classifier.predict(img)
    print("result:",result)
    return {"uploadStatus":"Complete","result":result}

@app.get("/")
def root():
    return {"message": "Hello"}

# @app.post("/upload")
# async def recieveFile(file: bytes = File(...)):
#     image = Image.open(io.BytesIO(file))
#     image.show()
#     print(file)
#     return {"uploadStatus":"Complete"}


# @app.post('/analyze')
# async def analyze(image: bytes = File(...), coord: List[int] = Form(...), points: List[int] = Form(...), labels: List[int] = Form(...)):
#     img_bytes = segmentor.getMask(image,coord,points,labels)
#     return {"result": img_bytes}
