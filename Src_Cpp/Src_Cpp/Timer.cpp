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
		std::cout << "Timer " << displayedText << ": " << duration << "sec" << std::endl;
	}
};

void startTimer() {
	Timer timer;
}
void startTimer(const char* displayText) {
	Timer timer(displayText);
}