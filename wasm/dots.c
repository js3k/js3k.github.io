#include <emscripten.h>
#include <stdlib.h>

#define MAX_DOTS 10000

float x[MAX_DOTS];
float y[MAX_DOTS];
float vx[MAX_DOTS];
float vy[MAX_DOTS];
int count = 100;
float speed = 1.0;

EMSCRIPTEN_KEEPALIVE
void setCount(int c) {
  if (c > MAX_DOTS) c = MAX_DOTS;
  count = c;
  for (int i = 0; i < count; i++) {
    x[i] = rand() % 350;
    y[i] = rand() % 600;
    vx[i] = (rand() % 100 - 50) / 50.0;
    vy[i] = (rand() % 100 - 50) / 50.0;
  }
}

EMSCRIPTEN_KEEPALIVE
void setSpeed(float s) {
  speed = s;
}

EMSCRIPTEN_KEEPALIVE
float getX(int i) {
  return x[i];
}

EMSCRIPTEN_KEEPALIVE
float getY(int i) {
  return y[i];
}

EMSCRIPTEN_KEEPALIVE
int getCount() {
  return count;
}

EMSCRIPTEN_KEEPALIVE
void update() {
  for (int i = 0; i < count; i++) {
    x[i] += vx[i] * speed;
    y[i] += vy[i] * speed;
    if (x[i] < 0 || x[i] > 350) vx[i] = -vx[i];
    if (y[i] < 0 || y[i] > 600) vy[i] = -vy[i];
  }
}