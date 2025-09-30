#include <emscripten.h>
#include <stdlib.h>

#define MAX_DOTS 30000

float x[MAX_DOTS], y[MAX_DOTS];
float vx[MAX_DOTS], vy[MAX_DOTS];
int count = 100;

EMSCRIPTEN_KEEPALIVE
void init(int n) {
  if (n > MAX_DOTS) n = MAX_DOTS;
  count = n;
  for (int i = 0; i < count; i++) {
    x[i] = rand() % 350;
    y[i] = rand() % 600;
    vx[i] = (rand() % 100 - 50) / 10.0;
    vy[i] = (rand() % 100 - 50) / 10.0;
  }
}

EMSCRIPTEN_KEEPALIVE
void update() {
  for (int i = 0; i < count; i++) {
    x[i] += vx[i];
    y[i] += vy[i];
    if (x[i] < 0 || x[i] > 350) vx[i] *= -1;
    if (y[i] < 0 || y[i] > 600) vy[i] *= -1;
  }
}

EMSCRIPTEN_KEEPALIVE
float getX(int i) { return x[i]; }
EMSCRIPTEN_KEEPALIVE
float getY(int i) { return y[i]; }
EMSCRIPTEN_KEEPALIVE
int getCount() { return count; }