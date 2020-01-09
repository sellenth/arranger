#import imageio
import math
from PIL import Image 
import random

img = Image.open('./pac.png');
img = img.resize((200, 100));
px = img.load();

random.seed();

count = 0;

for j in range(img.height):
    for i in range(img.width):
        if px[i,j][3]:
            count += 1;


factor = count / 200;

count = 0;
for j in range(img.height):
    for i in range(img.width):
        if px[i,j][3] and random.randrange(0, math.floor(factor)) == 0:
            count += 1;
            print('X', end='');
        else:
            print(' ', end='');
    print();
