float angle = 0;
const char* text = "animasi from wasm";

__attribute__((export_name("step")))
void step() {
    angle += 3.0;
    if (angle >= 360.0) angle -= 360.0;
}

__attribute__((export_name("get_angle")))
float get_angle() {
    return angle;
}

__attribute__((export_name("get_text_ptr")))
const char* get_text_ptr() {
    return text;
}

__attribute__((export_name("get_text_len")))
int get_text_len() {
    int len = 0;
    while (text[len] != '\0') len++;
    return len;
}