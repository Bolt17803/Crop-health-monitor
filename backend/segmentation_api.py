from segment_anything import sam_model_registry, SamPredictor
import numpy as np
import cv2
from pydantic import BaseModel
from typing import List
from PIL import Image
import base64

sam = sam_model_registry['vit_l'](checkpoint="C:/Users/Admin/Desktop/Project/Crop_Health_Monitor/sam_vit_l_0b3195.pth")
predictor = SamPredictor(sam)

# image = cv2.imread("t7.jpg")
# coord = np.array([0,0,236,248])
# points = np.array([[129,109],[43,197],[209,177]])
# labels = np.array([1,0,0])

def segmentdMask(image_bytes,coord,points,labels):
    np_array = np.frombuffer(image_bytes, np.uint8)
    cv2image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    x, y, w, h = coord
    input_box = np.array([x, y, w, h])#Make changes to w & h as w+x && h+y!!!
    predictor.set_image(cv2image)
    masks, _, _ = predictor.predict(
        box= input_box,
        point_coords= points,
        point_labels= labels,
        multimask_output=False
        )
    return masks,cv2image

def getMask64(image_bytes,coord=None,points=None,labels=None):
    masks,cv2image = segmentdMask(image_bytes,coord,points,labels)

    n_img = np.zeros(cv2image.shape, dtype= int)
    highlight_mask = np.zeros(cv2image.shape, dtype= int)
    for i in range(masks[0].shape[0]):
        for j in range(masks[0].shape[1]):
            if masks[0][i][j] == True:
                n_img[i, j, :] = cv2image[i][j][:]
                highlight_mask[i, j, :] = [255,255,255]
            else:
                highlight_mask[i, j, :] = [0,0,0]
                
    img_display = cv2.convertScaleAbs(n_img)
    success, img_encoded = cv2.imencode('.png', img_display)
    img_b64s = base64.b64encode(img_encoded).decode('utf-8')
    # himg_display = cv2.convertScaleAbs(highlight_mask) #same as above for black and white mask
    # himg_bytes = img_display.tobytes()

    return img_b64s,img_display