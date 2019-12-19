#pragma once

#include <iostream>
#include <string>
#include <vector>

void LogLineSeperator();
void LogLineSeperator(int NumOfSeperators);
void Log(std::string str);
void Log(std::string str, bool printType);
void Log(std::vector<std::string> strArr);
void Log(std::vector<std::string> strArr, bool printType);
void Log(const char* constChar);
void Log(const char* constChar, bool printType);
void Log(int num);
void Log(int num, bool printType);
void Log(int numArray[], int arrSize);
void Log(int numArray[], int arrSize, bool printType);
void Log(std::vector<int> intArray);
void Log(std::vector<int> intArray, bool printType);
void LogResult(const char* result);
void LogResult(int result);
void LogResult(const char* task, const char* result);
void LogResult(const char* task, int result);
void LogTitle(const char* title);