#import imageio
import math
from skimage import io
from skimage.morphology import skeletonize
from PIL import Image 
import random

FIELD_WIDTH = 200;
FIELD_HEIGHT = 100
NUM_MEMBER = 200

img = io.imread('./pac.png');
img = skeletonize(img);
io.imsave('./pac.png', img);

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

def print_field(arr):
    for i in range(FIELD_HEIGHT):
        for j in range(FIELD_WIDTH):
            if arr[i][j]:
                print('X', end='');
            else:
                print(' ', end='');
        print();

def write_field_to_file(filename, field):
    try:
        with open(filename, 'w') as f:
            for elem in field:
                f.write(elem[0] + ' ');
                f.write(str(elem[1]) + ' ');
                f.write(elem[2] + ' ');
                f.write(str(elem[3]) + '\n');
    finally:
        f.close();


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
field = [];

pure_coords = [];

count = 0;
for j in range(img.height):
    for i in range(img.width):
        if px[i,j][3] and random.randrange(0, math.ceil(factor)) == 0:
            pure_coords.append((i,j));
            arr[j][i] = (i, j); 
            field.append(coord_translate(i, j));
            count += 1;

try:
    with open('pure_coords.txt', 'w') as f:
        for elem in pure_coords:
            f.write(str(elem[0]) + ' ' + str(elem[1]) + '\n');
finally:
    f.close();


print(count);
print_field(arr);
write_field_to_file('out.txt', field);
