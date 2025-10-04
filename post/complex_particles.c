#include <stdlib.h>
#include <math.h>

// Definisi untuk properti partikel.
typedef struct {
    float x, y;
    float vx, vy;
    int color[3]; // R, G, B
    float radius;
    float mass;
} Particle;

// Pointer ke array partikel dan ukurannya.
Particle* particles;
int particle_count;
int canvas_width, canvas_height;

// Konstanta untuk fisika
const float MOUSE_REPULSION_RADIUS = 100.0f;
const float MOUSE_REPULSION_FORCE = 50.0f;
const float CONNECTION_DISTANCE = 100.0f;
const float DAMPING_FACTOR = 0.99f; // Gesekan

// __attribute__((export_name())) digunakan untuk mengekspor fungsi ke JavaScript.

__attribute__((export_name("init_particles")))
void init_particles(int width, int height, int count) {
    canvas_width = width;
    canvas_height = height;
    particle_count = count;

    // Mengalokasikan memori untuk partikel. JavaScript akan mengakses memori ini secara langsung.
    particles = (Particle*)malloc(sizeof(Particle) * count);

    for (int i = 0; i < count; ++i) {
        particles[i].x = (float)rand() / RAND_MAX * width;
        particles[i].y = (float)rand() / RAND_MAX * height;
        particles[i].vx = ((float)rand() / RAND_MAX - 0.5f) * 2.0f; // -1 to 1
        particles[i].vy = ((float)rand() / RAND_MAX - 0.5f) * 2.0f;
        particles[i].color[0] = rand() % 255;
        particles[i].color[1] = rand() % 255;
        particles[i].color[2] = rand() % 255;
        particles[i].radius = (float)rand() / RAND_MAX * 3.0f + 1.0f;
        particles[i].mass = particles[i].radius; // Massa proporsional dengan radius
    }
}

__attribute__((export_name("update_particles")))
void update_particles(float mouse_x, float mouse_y) {
    for (int i = 0; i < particle_count; ++i) {
        Particle* p = &particles[i];

        // Interaksi mouse (tolakan)
        float dx_mouse = p->x - mouse_x;
        float dy_mouse = p->y - mouse_y;
        float dist_mouse = sqrtf(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

        if (dist_mouse < MOUSE_REPULSION_RADIUS) {
            float force = MOUSE_REPULSION_FORCE / (dist_mouse * dist_mouse);
            p->vx += (dx_mouse / dist_mouse) * force;
            p->vy += (dy_mouse / dist_mouse) * force;
        }

        // Memperbarui posisi
        p->x += p->vx;
        p->y += p->vy;

        // Menerapkan gesekan
        p->vx *= DAMPING_FACTOR;
        p->vy *= DAMPING_FACTOR;

        // Batasan memantul
        if (p->x - p->radius < 0 || p->x + p->radius > canvas_width) {
            p->vx = -p->vx;
            if (p->x - p->radius < 0) p->x = p->radius;
            if (p->x + p->radius > canvas_width) p->x = canvas_width - p->radius;
        }
        if (p->y - p->radius < 0 || p->y + p->radius > canvas_height) {
            p->vy = -p->vy;
            if (p->y - p->radius < 0) p->y = p->radius;
            if (p->y + p->radius > canvas_height) p->y = canvas_height - p->radius;
        }
    }
}

// Mengekspor pointer ke array partikel sehingga JavaScript dapat membacanya.
__attribute__((export_name("get_particles_ptr")))
int get_particles_ptr() {
    return (int)particles;
}

// Mengekspor jumlah partikel.
__attribute__((export_name("get_particle_count")))
int get_particle_count() {
    return particle_count;
}

// Mengekspor ukuran struct Particle.
__attribute__((export_name("get_particle_size")))
int get_particle_size() {
    return sizeof(Particle);
}
