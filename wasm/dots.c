#include <stdlib.h>
#include <time.h>

// Definisi struktur Dot
typedef struct {
    float x, y;
    float vx, vy;
} Dot;

// Pointer untuk array dinamis
Dot* dots = NULL;
int num_dots = 0;

void resize_and_reinit_dots(int new_num_dots) {
    if (new_num_dots == num_dots) return;

    // Alokasikan ulang memori
    dots = (Dot*)realloc(dots, new_num_dots * sizeof(Dot));
    if (dots == NULL) {
        // Penanganan kesalahan jika realloc gagal
        return;
    }

    // Inisialisasi titik-titik baru jika jumlahnya bertambah
    if (new_num_dots > num_dots) {
        for (int i = num_dots; i < new_num_dots; i++) {
            dots[i].x = rand() % 350;
            dots[i].y = rand() % 600;
            dots[i].vx = ((rand() % 100) - 50) / 50.0f;
            dots[i].vy = ((rand() % 100) - 50) / 50.0f;
        }
    }
    num_dots = new_num_dots;
}

void update_dots() {
    for (int i = 0; i < num_dots; i++) {
        dots[i].x += dots[i].vx;
        dots[i].y += dots[i].vy;

        if (dots[i].x < 0 || dots[i].x > 350) dots[i].vx *= -1;
        if (dots[i].y < 0 || dots[i].y > 600) dots[i].vy *= -1;
    }
}

Dot* get_dots() {
    return dots;
}

int get_num_dots() {
    return num_dots;
}
