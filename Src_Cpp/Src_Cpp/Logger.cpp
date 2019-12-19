#include <iostream>
#include <string>
#include <vector>


void SimpleLog(const char* constChar) {
	std::cout << constChar;
}
void SimpleLog(int num) {
	std::cout << num;
}


void LogLineSeperator() {
	std::cout << "-------------------------------" << std::endl;
}
void LogLineSeperator(int NumOfSeperators) {
	for (int i = 0; i < NumOfSeperators; i++) {
	std::cout << "-------------------------------" << std::endl;
	}
}



void Log(std::string str) {
	std::cout << str << std::endl;
}
void Log(std::string str, bool printType) {
	std::cout << str;
	if (printType)
		std::cout << " : <std::string>";
		
	std::cout << std::endl;
}

void Log(std::vector<std::string> strArr) {
	std::cout << "[";
	for (int i = 0; i < strArr.size(); i++) {
		std::cout << strArr[i];
		if (i < strArr.size() - 1) {
			std::cout << ", ";
		}
	}
	std::cout << "]" << std::endl;
}
void Log(std::vector<std::string> strArr, bool printType) {
	std::cout << "[";
	for (int i = 0; i < strArr.size(); i++) {
		std::cout << strArr[i];
		if (i < strArr.size() - 1) {
			std::cout << ", ";
		}
	}
	std::cout << "]";
	if (printType)
		std::cout << " : <std::string array>";
	std::cout << std::endl;
}

void Log(const char* constChar) {
	std::cout << constChar << std::endl;
}
void Log(const char* constChar, bool printType) {
	std::cout << constChar;
	if (printType)
		std::cout << " : <const char>";
	
	std::cout << std::endl;
}

void Log(int num) {
	std::cout << num << std::endl;
}
void Log(int num, bool printType) {
	std::cout << num;
	if (printType)
		std::cout << " : <int>";

	std::cout << std::endl;
}

void Log(int numArray[], int arrSize) {
	SimpleLog("[");
	for (int i = 0; i < arrSize; i ++) {
		SimpleLog(numArray[i]);
		if (i < arrSize - 1) {
			SimpleLog(", ");
		}
	}
	std::cout << "]" << std::endl;
}
void Log(int numArray[], int arrSize, bool printType) {
	SimpleLog("[");
	for (int i = 0; i < arrSize; i++) {
		SimpleLog(numArray[i]);
		if (i < arrSize - 1) {
			SimpleLog(", ");
		}
	}
	std::cout << "]";
	if (printType)
		std::cout << " : <int array>";

	std::cout << std::endl;
}

void Log(std::vector<int> intArray) {
	std::cout << "[";
	for (int i = 0; i < intArray.size(); i++) {
		std::cout << intArray[i];
		if (i < intArray.size() - 1) {
			std::cout << ", ";
		}
	}
	std::cout << "]" << std::endl;
}
void Log(std::vector<int> intArray, bool printType) {
	std::cout << "[";
	for (int i = 0; i < intArray.size(); i++) {
		std::cout << intArray[i];
		if (i < intArray.size() - 1) {
			std::cout << ", ";
		}
	}
	std::cout << "]";
		if (printType)
			std::cout << ": <std::int array>";
	std::cout << std::endl;
}

void LogResult(const char* result) {
	std::cout << std::endl << "-Result: " << result << std::endl;
	LogLineSeperator();
}

void LogResult(int result) {
	std::cout << std::endl << "-Result: " << result << std::endl;
	LogLineSeperator();
}

void LogResult(const char* task, const char* result) {
	std::cout << std::endl << "-Result " << task << ": "<< result << std::endl;
	LogLineSeperator();
}

void LogResult(const char* task, int result) {
	std::cout << std::endl << "-Result " << task << ": " << result << std::endl;
	LogLineSeperator();
}

void LogTitle(const char* title) {
	LogLineSeperator(2);
	Log(title);
	LogLineSeperator(1);
}