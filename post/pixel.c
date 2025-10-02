#define WIDTH 350
#define HEIGHT 600
unsigned char buffer[WIDTH * HEIGHT * 4];

int frame = 0;

void tick() {
  for (int y = 0; y < HEIGHT; y++) {
    for (int x = 0; x < WIDTH; x++) {
      int i = (y * WIDTH + x) * 4;
      buffer[i + 0] = (x + frame) % 256;
      buffer[i + 1] = (y + frame) % 256;
      buffer[i + 2] = (x ^ y) % 256;
      buffer[i + 3] = 255;
    }
  }
  frame++;
}

unsigned char* get_buffer() {
  return buffer;
}