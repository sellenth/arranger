#import imageio
import math
from PIL import Image 
import random

FIELD_WIDTH = 200;
FIELD_HEIGHT = 100
NUM_MEMBER = 200

img = Image.open('./pac.png');
img = img.resize((FIELD_WIDTH, FIELD_HEIGHT));
px = img.load();

def coord_translate(x, y):
    gen_long = "";
    spec_long = 0;
    gen_lat = "";
    spec_lat = 0;

    if x > 100:
        gen_long = "ST"; #side two
        spec_long = (x - 100) / 2.0;
    else:
        gen_long = "SO"; #side one
        spec_long = x / 2.0;

    if y > 80:
        gen_lat = "FR"; #front
        spec_lat = y - 100;
    elif y > 50:
        gen_lat = "FH"; #front hash
        spec_lat = y - 60;
    elif y > 20:
        gen_lat = "BH"; #back hash
        spec_lat = y - 40;
    else:
        gen_lat = "BS"; #back sideline
        spec_lat = y;

    return (gen_long, spec_long, gen_lat, spec_lat);


random.seed();

count = 0;

for j in range(img.height):
    for i in range(img.width):
        if px[i,j][3]:
            count += 1;

arr = [];
for i in range(FIELD_HEIGHT):
    arr.append([]);
    for j in range(FIELD_WIDTH):
        arr[i].append(0);

factor = count / NUM_MEMBER;

count = 0;
for j in range(img.height):
    for i in range(img.width):
        if px[i,j][3] and random.randrange(0, math.ceil(factor)) == 0:
            arr[j][i] = coord_translate(i, j);
            print(arr[j][i]);
            count += 1;

for i in range(FIELD_HEIGHT):
    for j in range(FIELD_WIDTH):
        if arr[i][j]:
            print('X', end='');
        else:
            print(' ', end='');
    print();
