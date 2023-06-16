from fastapi import FastAPI, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from enum import Enum
# from pydantic import BaseModel
import uvicorn
from typing import List
from segment_anything import sam_model_registry, SamPredictor
import segmentation_api as segmentor
import classification_api as classifier
import json
import numpy as np
import cv2
import base64
from io import BytesIO

pil_image = None

app = FastAPI()

origins = ["*"]

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
    #image = Image.open(io.BytesIO(file))
    #encoded_image = base64.b64encode(file).decode("utf-8")
    # nparr = np.fromstring(base64.b64decode(encoded_image), np.uint8)
    # img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    print("received")
    data = json.loads(data)
    coords = [data["x1"],data["y1"],data["x2"],data["y2"]]
    print(coords)
    img_b64s,img_cv2 = segmentor.getMask64(file,coords)
    # color_coverted = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2RGB)
    # pil_image = Image.fromarray(color_coverted)
    # pil_image = pil_image.crop((*coords,))
    # pil_image = pil_image.resize((256,256))
    # pil_image.save(f"./{coords}.png") #----> USE THIS IF YOU WANT TO MAKE A DATASET OF SEGMENTING IMAGES
    
    # buffered = BytesIO()
    # pil_image.save(buffered, format="JPEG")
    # img_str = str(base64.b64encode(buffered.getvalue()))[2:-1]
    return {"uploadStatus":"Complete","result":"data:image/jpeg;base64,"+img_b64s}#classifier.predict(image)}
    

@app.post("/upload_selection")
async def recieveAnotherFile(file: bytes = File(...),data: str = Form(...)):
    data = json.loads(data)
    print(data)
    img = Image.open(io.BytesIO(file))
    result=classifier.predict(img,data)
    print("result:",result)
    return {"uploadStatus":"Complete","result":result}#'[{"Corn_(maize)___healthy": 0.9528933763504028}, {"Pepper,_bell___Bacterial_spot": 0.018604278564453125}, {"Corn_(maize)___Common_rust_": 0.014313234016299248}, {"Pepper,_bell___healthy": 0.009599192067980766}]'}

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