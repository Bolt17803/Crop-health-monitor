import os                       # for working with files
import numpy as np              # for numerical computationss
import torch                    # Pytorch module 
import torch.nn as nn           # for creating  neural networks
from PIL import Image,ImageOps           # for checking images
import torch.nn.functional as F # for functions for calculating loss
import torchvision.transforms as transforms   # for transforming images into tensors 
import json

# for moving data into GPU (if available)
def get_default_device():
    """Pick GPU if available, else CPU"""
    if torch.cuda.is_available:
        return torch.device("cuda")
    else:
        return torch.device("cpu")
    
# for moving data to device (CPU or GPU)
def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list,tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)

# for loading in the device (GPU if available else CPU)
class DeviceDataLoader():
    """Wrap a dataloader to move data to a device"""
    def __init__(self, dl, device):
        self.dl = dl
        self.device = device
        
    def __iter__(self):
        """Yield a batch of data after moving it to device"""
        for b in self.dl:
            yield to_device(b, self.device)
        
    def __len__(self):
        """Number of batches"""
        return len(self.dl)

# for calculating the accuracy
def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))


# base class for the model
class ImageClassificationBase(nn.Module):
    
    def training_step(self, batch):
        images, labels = batch
        out = self(images)                  # Generate predictions
        loss = F.cross_entropy(out, labels) # Calculate loss
        return loss
    
    def validation_step(self, batch):
        images, labels = batch
        out = self(images)                   # Generate prediction
        loss = F.cross_entropy(out, labels)  # Calculate loss
        acc = accuracy(out, labels)          # Calculate accuracy
        return {"val_loss": loss.detach(), "val_accuracy": acc}
    
    def validation_epoch_end(self, outputs):
        batch_losses = [x["val_loss"] for x in outputs]
        batch_accuracy = [x["val_accuracy"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()       # Combine loss  
        epoch_accuracy = torch.stack(batch_accuracy).mean()
        return {"val_loss": epoch_loss, "val_accuracy": epoch_accuracy} # Combine accuracies
    
    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['lrs'][-1], result['train_loss'], result['val_loss'], result['val_accuracy']))

# Architecture for training

# convolution block with BatchNormalization
def ConvBlock(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
             nn.BatchNorm2d(out_channels),
             nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)


# resnet architecture 
class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_diseases):
        super().__init__()
        
        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True) # out_dim : 128 x 64 x 64 
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))
        
        self.conv3 = ConvBlock(128, 256, pool=True) # out_dim : 256 x 16 x 16
        self.conv4 = ConvBlock(256, 512, pool=True) # out_dim : 512 x 4 x 44
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))
        
        self.classifier = nn.Sequential(nn.MaxPool2d(4),
                                       nn.Flatten(),
                                       nn.Linear(512, num_diseases))
        
    def forward(self, xb): # xb is the loaded batch
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out   

device = get_default_device()

train = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']

def predict_image(img, model, species):
    """Converts image to array and return the predicted class
        with highest probability"""
    # Convert to a batch of 1
    xb = to_device(img.unsqueeze(0), torch.device("cpu")) #DIFF
    # Get predictions from model
    yb = model(xb)
    #Applying softmax
    prob = F.softmax(yb,dim=1)
    # Pick index with highest probability
    percentages, indices  = torch.topk(prob, 38, dim=1)
    # Retrieve the class label
    l = []
    for i in range(38):
        if(species in train[indices[0][i].item()]):
            l.append({train[indices[0][i].item()]:percentages[0][i].item()})
    
    stringified_list = json.dumps(l)
    print(stringified_list)
    return stringified_list

#DIFF#DIFF#DIFF
# model = None
# def initialize():
model = ResNet9(3,38)
model.load_state_dict(torch.load("./models/plant-disease-model-v2(b8)-state_dict.pth",map_location=torch.device("cpu")))
#model=torch.load("./models/plant-disease-model-v2(b8)-complete.pth")
model.eval()
model.to("cpu")

grape_model = torch.load("./models/grape_googlenet.pth")
grape_model.to(torch.device("cpu"))
grape_model.eval()

potato_model = torch.load("models/potato_googlenet.pth")
potato_model.to(torch.device("cpu"))
potato_model.eval()

apple_model = torch.load("models/apple_rexnext50.pth")
apple_model.to(torch.device("cpu"))
apple_model.eval()

def predict(image, data):
    selection = data["Selection"]["selection"]
    species = data["Species"]["species"]

    image = image.resize((256,256))
    image = image.convert('RGB')
    preprocess = transforms.Compose([transforms.ToTensor()])
    preprocessed_image = torch.unsqueeze(preprocess(image), 0)
    preprocessed_image.to(torch.device("cpu"))  #DIFF

    if(species == "Grape"):
        y = grape_model(preprocessed_image)
        prob = F.softmax(y,dim=1)
        grape_classes = ['Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy']
        percentages, indices  = torch.topk(prob, 4, dim=1)
        # Retrieve the class label
        l = []
        for i in range(4):
            l.append({grape_classes[indices[0][i].item()]:percentages[0][i].item()})
        stringified_list = json.dumps(l)
        print(stringified_list)
        return stringified_list
    elif(species == "Apple"):
        y = apple_model(preprocessed_image)
        prob = F.softmax(y,dim=1)
        apple_classes = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy']
        percentages, indices  = torch.topk(prob, 4, dim=1)
        # Retrieve the class label
        l = []
        for i in range(4):
            l.append({apple_classes[indices[0][i].item()]:percentages[0][i].item()})
        stringified_list = json.dumps(l)
        print(stringified_list)
        return stringified_list
    elif(species == "Potato"):
        y = potato_model(preprocessed_image)
        prob = F.softmax(y,dim=1)
        potato_classes = ['Potato___Early_blight','Potato___healthy','Potato___Late_blight']
        percentages, indices  = torch.topk(prob, 3, dim=1)
        # Retrieve the class label
        l = []
        for i in range(3):
            l.append({potato_classes[indices[0][i].item()]:percentages[0][i].item()})
        stringified_list = json.dumps(l)
        print(stringified_list)
        return stringified_list
    else:
        return predict_image(preprocessed_image[0], model, species)
