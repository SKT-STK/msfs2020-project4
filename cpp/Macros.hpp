#pragma once

#define debug(x) std::cout << x << std::endl;
#define error_debug(x) std::cerr << x << std::endl;
#define sleepfor(x) std::this_thread::sleep_for(std::chrono::microseconds(static_cast<unsigned long long>(((long double)(x)) * 1'000.0)));

#define intWinMain() int WINAPI WinMain(_In_ HINSTANCE hInstance, _In_opt_ HINSTANCE, _In_ LPSTR lpCmdLine, _In_ INT nCmdShow)
