#include <fstream>
#include <sstream>
#include <string.h>
#include <iostream>
#include <vector>


#include "MyLogger.h"
#include "MyTimer.h"



int Part01(std::vector<int> boreders, bool seq) {
	int startNumberArray[6];
	int endNumberArray[6];

	for (int arr = 0; arr < 2; arr++) {
		int num = boreders[arr];
		for (int m = 5, i = 0; m > -1; m--, i++) {
			int mod = (int)(num / pow(10, m)) % 10;
			if (arr == 0) {
				startNumberArray[i] = mod;
			}
			else {
				endNumberArray[i] = mod;
			}
		}
	}
	
	int result = 0;
	for (int i0 = startNumberArray[0]; i0 <= endNumberArray[0]; i0++) {
		bool doubleFoundArr[5] = { false, false, false, false, false };
		for (int i1 = i0; i1 < 10; i1++) {
			doubleFoundArr[0] = i0 == i1;
			for (int i2 = i1; i2 < 10; i2++) {
				doubleFoundArr[1] = i1 == i2;
				for (int i3 = i2; i3 < 10; i3++) {
					doubleFoundArr[2] = i2 == i3;
					for (int i4 = i3; i4 < 10; i4++) {
						doubleFoundArr[3] = i3 == i4;
						for (int i5 = i4; i5 < 10; i5++) {
							doubleFoundArr[4] = i4 == i5;
							int num = i5 + 10 * i4 + 100 * i3 + 1000 * i2 + 10000 * i1 + 100000 * i0;

							bool doubleFound = false;
							if (!seq) {
								for (bool found : doubleFoundArr) {
									if (found) {
										doubleFound = true;
										break;
									}
								}
							}
							else {
								if (doubleFoundArr[4] && !doubleFoundArr[3]) {
									doubleFound = true;
								}
								else {
									bool tempBool = false;
									for (int j = 0; j < 4; j++) {
										bool found = doubleFoundArr[j];
										bool nextBool = doubleFoundArr[j+1];
										if (!tempBool && found && !doubleFoundArr[j + 1]) {
											doubleFound = true;
											break;
										}
										tempBool = found;
									}
								}
							}

							if (num >= boreders[0] && num <= boreders[1] && doubleFound) {
								result++;
							}
						}
					}
				}
			}
		}
	}
	return result;
}

void Day04(const char* fileName) {
	LogTitle("Day 04");
	// timer
	Timer t("Total");
	// parse data
	std::ifstream inFile(fileName);
	std::vector<int> borders;
	borders.reserve(2);
	int a;
	while (inFile >> a)
	{
		a = a < 0 ? a * -1 : a;
		borders.push_back(a);
	}

	// part 1
	LogResult("Part 1", Part01(borders, false));
	// part 2
	LogResult("Part 2", Part01(borders, true));
}