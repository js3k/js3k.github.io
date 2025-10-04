#include <stdint.h>
#include <math.h>

#define WIDTH 350
#define HEIGHT 600

uint8_t canvas[WIDTH * HEIGHT * 4];
int frame = 0;

__attribute__((export_name("get_canvas_ptr")))
uint8_t* get_canvas_ptr() { return canvas; }

__attribute__((export_name("draw_frame")))
void draw_frame() {
  for (int y = 0; y < HEIGHT; y++) {
    for (int x = 0; x < WIDTH; x++) {
      float fx = (float)x / WIDTH * 2.0f * M_PI;
      float fy = (float)y / HEIGHT * 2.0f * M_PI;
      float wave = sin(fx + frame * 0.05f) + cos(fy + frame * 0.03f);
      int brightness = (int)((wave + 2.0f) / 4.0f * 255.0f);

      int i = (y * WIDTH + x) * 4;
      canvas[i+0] = brightness;
      canvas[i+1] = brightness;
      canvas[i+2] = 255 - brightness;
      canvas[i+3] = 255;
    }
  }
  frame++;
}