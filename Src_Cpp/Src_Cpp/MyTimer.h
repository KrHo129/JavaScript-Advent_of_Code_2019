#pragma once

#include <iostream>
#include <cstdio>
#include <ctime>

class Timer {
private:
	std::clock_t start;
	double duration;
	const char* displayedText;
public:
	Timer() : start(std::clock()), duration(0), displayedText("") {}
	Timer(const char* displayedText) : start(std::clock()), duration(0), displayedText(displayedText) {}
	~Timer() {
		duration = (std::clock() - start) / (double)CLOCKS_PER_SEC;
		const char* prefix = displayedText == "" ? " -t-" : " -t- ";
		std::cout << prefix << displayedText << " time" << ": " << duration << "sec" << std::endl;
	}
};