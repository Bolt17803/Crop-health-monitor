import classification_api as classifier
from PIL import Image

img = Image.open("test.jpg")
print(classifier.predict(img))
