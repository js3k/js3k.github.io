__attribute__((export_name("get_text")))
const char* get_text(){static const char text[]=
"halo dunia rebahan!\n"
"ini adalah teks panjang dari C WASM\n"
"bisa multiline, bebas karakter, termasuk simbol: @#$%^&*()_+\n"
"dan tetap modular!";return text;
}