float position = -100.0;
float velocity = 0.0;
float target = 0.0;
float damping = 0.90;
float stiffness = 0.10;

void open() {
    position = -100.0;   // mulai dari luar
    target = 0.0;
    velocity = -0.10;
}

void close() {
    position = 0.0;      // mulai dari dalam
    target = -100.0;
    velocity = -0.10;
}

float update() {
    float force = stiffness * (target - position);
    velocity += force;
    velocity *= damping;
    position += velocity;
    return position;
}

//  emcc sidebar.c -o sidebar.wasm --no-entry -s EXPORTED_FUNCTIONS="['_update','_open','_close']"