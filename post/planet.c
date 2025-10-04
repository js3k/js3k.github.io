#include <stdint.h>
#include <math.h>

#define WIDTH 370
#define HEIGHT 650
#define GRID_X 10
#define GRID_Y 5

typedef struct {
  float pulse;
  int delay;
} Node;

uint8_t canvas[WIDTH * HEIGHT * 4];
Node grid[GRID_Y][GRID_X];
int frame = 0;

__attribute__((export_name("get_canvas_ptr")))
uint8_t* get_canvas_ptr() { return canvas; }

__attribute__((export_name("draw_frame")))
void draw_frame() {
  if (frame == 0) {
    for (int y = 0; y < GRID_Y; y++) {
      for (int x = 0; x < GRID_X; x++) {
        grid[y][x].pulse = 0;
        grid[y][x].delay = (x + y) % 10;
      }
    }
    grid[GRID_Y/2][GRID_X/2].pulse = 1.0f;
  }

  for (int y = 0; y < GRID_Y; y++) {
    for (int x = 0; x < GRID_X; x++) {
      if (grid[y][x].delay == 0) {
        float p = grid[y][x].pulse;
        if (p > 0.01f) {
          int dx[] = {-1, 1, 0, 0};
          int dy[] = {0, 0, -1, 1};
          for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx >= 0 && nx < GRID_X && ny >= 0 && ny < GRID_Y) {
              grid[ny][nx].pulse += p * 0.25f;
              grid[ny][nx].delay = 10;
            }
          }
        }
        grid[y][x].pulse *= 0.9f;
      } else {
        grid[y][x].delay--;
      }
    }
  }

  for (int i = 0; i < WIDTH * HEIGHT * 4; i += 4) {
    canvas[i+0] = 0;
    canvas[i+1] = 0;
    canvas[i+2] = 0;
    canvas[i+3] = 255;
  }

  int cell_w = WIDTH / GRID_X;
  int cell_h = HEIGHT / GRID_Y;
  for (int y = 0; y < GRID_Y; y++) {
    for (int x = 0; x < GRID_X; x++) {
      int cx = x * cell_w + cell_w / 2;
      int cy = y * cell_h + cell_h / 2;
      int radius = (int)(grid[y][x].pulse * 10);
      uint8_t r = (uint8_t)(grid[y][x].pulse * 255);
      uint8_t g = 50;
      uint8_t b = 255 - r;
      for (int dy = -radius; dy <= radius; dy++) {
        for (int dx = -radius; dx <= radius; dx++) {
          if (dx*dx + dy*dy <= radius*radius) {
            int px = cx + dx, py = cy + dy;
            if (px >= 0 && px < WIDTH && py >= 0 && py < HEIGHT) {
              int idx = (py * WIDTH + px) * 4;
              canvas[idx+0] = r;
              canvas[idx+1] = g;
              canvas[idx+2] = b;
              canvas[idx+3] = 255;
            }
          }
        }
      }
    }
  }

  frame++;
}