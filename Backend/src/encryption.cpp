#include <vector>
#include <string>
#include <fstream>
#include "stb_image.h"
#include "stb_image_write.h"

void addEncrypt(std::string inputPath, std::string outputPath, int key) {
    int w, h, ch;
    unsigned char* data = stbi_load(inputPath.c_str(), &w, &h, &ch, 0);
    if (!data) return;

    for (int i = 0; i < w * h * ch; ++i) {
        data[i] = (data[i] + key) % 256;
    }

    stbi_write_png(outputPath.c_str(), w, h, ch, data, w * ch);
    stbi_image_free(data);
}

void addDecrypt(std::string inputPath, std::string outputPath, int key) {
    addEncrypt(inputPath, outputPath, 256 - key);  // reverse operation
}
