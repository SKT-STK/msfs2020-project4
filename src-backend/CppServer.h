#pragma once

#include <iostream>
#include <functional>
#include <thread>
#include <cstring>

#ifdef _WIN32
#include <winsock2.h>
#pragma comment(lib, "ws2_32.lib")
#else
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#endif

#ifdef _WIN32
typedef int socklen_t;
#endif

typedef enum {
  UDP,
  TCP,
} socket_t;

class Server {
public:
	typedef std::function<std::string(std::string)> Callback;

	inline Server(socket_t socket, int port)
		: useTCP_(socket),
		port_(port),
		serverSocket_(INVALID_SOCKET),
		clientRunning_(true) {}
	inline ~Server() {
		clientRunning_ = false;
#ifdef _WIN32
		WSACleanup();
#endif
	}

	inline void Start() {
#ifdef _WIN32
		WSADATA _wsaData;
		if (WSAStartup(MAKEWORD(2, 2), &_wsaData) != 0) {
			return;
		}
#endif
		if (useTCP_) {
			startTCPServer();
		}
		else {
			startUDPServer();
		}
	}

	inline void SetCallback(Callback callback) {
		callback_ = std::move(callback);
	}

private:
	bool useTCP_;
	int port_;
	Callback callback_;
	bool clientRunning_;

#ifdef _WIN32
	SOCKET serverSocket_;
#else
	int serverSocket_;
#endif

	inline void startTCPServer() {
		// Create socket
		serverSocket_ = socket(AF_INET, SOCK_STREAM, 0);
		if (serverSocket_ == -1) {
			return;
		}

		// Bind the socket to a port
		sockaddr_in serverAddress{};
		serverAddress.sin_family = AF_INET;
		serverAddress.sin_addr.s_addr = INADDR_ANY;
		serverAddress.sin_port = htons(port_);

		if (bind(serverSocket_, (struct sockaddr*)&serverAddress, sizeof(serverAddress)) < 0) {
			return;
		}

		// Listen for incoming connections
		if (listen(serverSocket_, 3) < 0) {
			return;
		}

		// Accept incoming connections and handle them asynchronously
		std::thread acceptThread([this]() {
			while (true) {
				sockaddr_in clientAddress{};
#ifdef _WIN32
				SOCKET clientSocket;
#else
				int clientSocket;
#endif
				int clientAddressSize = sizeof(clientAddress);

				// Accept a connection from a client
				clientSocket = accept(serverSocket_, (struct sockaddr*)&clientAddress, (socklen_t*)&clientAddressSize);
				if (clientSocket < 0) {
					continue;
				}

				// Handle the client asynchronously
				std::thread clientThread([this, clientSocket]() {
					char buffer[1024] = { 0 };
					int bytesRead;

					// Receive data from the client
					while ((bytesRead = recv(clientSocket, buffer, sizeof(buffer), 0)) > 0 && clientRunning_) {
						std::string message(buffer, bytesRead);
						std::string response = callback_(message);

						// Send response back to the client
						if (response.length()) send(clientSocket, response.c_str(), (int)response.size(), 0);

						ZeroMemory(buffer, sizeof(buffer));
					}

					// Client disconnected
					if (bytesRead == 0) {
					}
					else {
					}

#ifdef _WIN32
					closesocket(clientSocket);
#else
					close(clientSocket);
#endif
				});

				clientThread.detach();
			}
		});

		acceptThread.detach();
	}

	inline void startUDPServer() {
		// Create socket
		serverSocket_ = socket(AF_INET, SOCK_DGRAM, 0);
		if (serverSocket_ == -1) {
			return;
		}

		// Bind the socket to a port
		sockaddr_in serverAddress{};
		serverAddress.sin_family = AF_INET;
		serverAddress.sin_addr.s_addr = INADDR_ANY;
		serverAddress.sin_port = htons(port_);

		if (bind(serverSocket_, (struct sockaddr*)&serverAddress, sizeof(serverAddress)) < 0) {
			return;
		}

		// Receive data and handle it asynchronously
		std::thread receiveThread([this]() {
			char buffer[1024] = { 0 };
			sockaddr_in clientAddress{};
			int clientAddressSize = sizeof(clientAddress);

			while (true) {
				// Receive data from a client
				int bytesRead = recvfrom(serverSocket_, buffer, sizeof(buffer), 0, (struct sockaddr*)&clientAddress, &clientAddressSize);
				if (bytesRead < 0) {
					continue;
				}

				std::string message(buffer, bytesRead);
				std::string response = callback_(message);

				// Send response back to the client
				if (response.length()) sendto(serverSocket_, response.c_str(), (int)response.size(), 0, (struct sockaddr*)&clientAddress, clientAddressSize);

				ZeroMemory(buffer, sizeof(buffer));
			}
		});

		receiveThread.detach();
	}
};
