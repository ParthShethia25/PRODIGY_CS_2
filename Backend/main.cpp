#include <iostream> // <-- Add this
#include "encryption.hpp"

int main(int argc, char** argv) {
    if (argc < 5) {
        std::cout << "Usage: ./encrypt_tool [encrypt|decrypt] input.png output.png key\n";
        return 1;
    }

    std::string cmd = argv[1];
    std::string input = argv[2];
    std::string output = argv[3];
    int key = std::stoi(argv[4]);

    if (cmd == "encrypt") {
        addEncrypt(input, output, key);
    } else if (cmd == "decrypt") {
        addDecrypt(input, output, key);
    } else {
        std::cout << "Invalid command.\n";
    }

    return 0;
}
