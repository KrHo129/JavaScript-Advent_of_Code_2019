#include <fstream>
#include <vector>

#include "MyLogger.h"
#include "MyTimer.h"


static int Part01 (std::vector<int>& data){
	//Timer timer("Part 1");
	int result = 0;

	for (unsigned int i = 0; i < data.size(); i++) {
		result += ((int)data[i] / 3) - 2;
	}
	return result;
}

static int Part02(std::vector<int>& data) {
	//Timer t("Part 2");
	int result = 0;
	for (int n : data) {
		while (n > 8) {
			n = ((int)n / 3) - 2;
			result += n;
		}
	}
	return result;
}

void Day01(const char* fileName) {
	LogTitle("Day 01");
	// timer
	Timer timer("Total");
	// parse data
	std::ifstream inFile(fileName);
	std::vector<int> data;
	int a;
	while (inFile >> a)
	{
		data.push_back(a);
	}

	// part 1
	LogResult("part 1" ,Part01(data));
	// part 2
	LogResult("part 2", Part02(data));
}