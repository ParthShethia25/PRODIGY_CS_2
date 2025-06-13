#define STB_IMAGE_IMPLEMENTATION
#define STB_IMAGE_WRITE_IMPLEMENTATION

#include "stb_image.h"
#include "stb_image_write.h"
#include "encryption.hpp"

#include <iostream>
#include <vector>      // ✅ For std::vector
#include <utility>     // ✅ For std::pair
#include <cstdlib>     // ✅ For rand(), srand()
#include <ctime>       // (optional) For time-based seeding


void addEncrypt(std::string inputPath, std::string outputPath, int key) {
    int w, h, ch;
    unsigned char* data = stbi_load(inputPath.c_str(), &w, &h, &ch, 0);
    if (!data) {
        std::cerr << "Failed to load image\n";
        return;
    }

    int total = w * h * ch;

    // XOR each pixel
    for (int i = 0; i < total; ++i) {
        data[i] ^= key;
    }

    // Pixel position shuffle
    srand(key);
    for (int i = 0; i < total; i += ch) {
        int j = (rand() % (total / ch)) * ch;
        for (int k = 0; k < ch; ++k) {
            std::swap(data[i + k], data[j + k]);
        }
    }

    stbi_write_png(outputPath.c_str(), w, h, ch, data, w * ch);
    stbi_image_free(data);
}

void addDecrypt(std::string inputPath, std::string outputPath, int key) {
    int w, h, ch;
    unsigned char* data = stbi_load(inputPath.c_str(), &w, &h, &ch, 0);
    if (!data) {
        std::cerr << "Failed to load image\n";
        return;
    }

    int total = w * h * ch;

    // Reverse pixel shuffle (generate swap list in same order)
    std::vector<std::pair<int, int>> swaps;
    srand(key);
    for (int i = 0; i < total; i += ch) {
        int j = (rand() % (total / ch)) * ch;
        swaps.push_back({i, j});
    }

    // Reverse swaps
    for (int i = swaps.size() - 1; i >= 0; --i) {
        int a = swaps[i].first;
        int b = swaps[i].second;
        for (int k = 0; k < ch; ++k) {
            std::swap(data[a + k], data[b + k]);
        }
    }

    // Reverse XOR
    for (int i = 0; i < total; ++i) {
        data[i] ^= key;
    }

    stbi_write_png(outputPath.c_str(), w, h, ch, data, w * ch);
    stbi_image_free(data);
}
