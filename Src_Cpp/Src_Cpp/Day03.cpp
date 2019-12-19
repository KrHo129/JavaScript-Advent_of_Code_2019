#include <fstream>
#include <string>
#include <string.h>
#include <vector>
#include <stdio.h>
#include <stdlib.h>

#include "MyCommon.h"


struct Wire {
	std::vector<std::vector<int>> corners;
	std::vector<int> distances;
	std::vector<std::vector<int>> quadrantBorers;
	static std::vector<std::vector<int>> intersections;
	
	// constructor
	Wire(std::vector<std::string> &wirePath)
	{
		setCorners(wirePath);
	}

	void setCorners(std::vector<std::string> &wirePath) {
		std::vector<int> singleBorder{ 0, 0 };
		for (int i = 0; i < 4; i++) {
			quadrantBorers.push_back(singleBorder);
		}

		std::vector<int> currPostion{ 0, 0 };
		corners.push_back(currPostion);
		int dist = 0;
		distances.push_back(dist);

		for (std::string p : wirePath) {
			char direction = p[0];
			int moveAmount = std::stoi(p.substr(1, p.size() - 1));
			switch (direction)
			{
			case 'U':
				currPostion[1] += moveAmount;
				break;
			case 'D':
				currPostion[1] -= moveAmount;
				break;
			case 'R':
				currPostion[0] += moveAmount;
				break;
			case 'L':
				currPostion[0] -= moveAmount;
				break;
			default:
				break;
			}
			corners.push_back(currPostion);
			dist += moveAmount;
			distances.push_back(dist);
			correctQuadrantBorders(currPostion);
		}
	}

	void correctQuadrantBorders(std::vector<int> currPos) {
		if (quadrantBorers[0][0] > currPos[0] && quadrantBorers[0][1] > currPos[1]) {
			quadrantBorers[0] = currPos;
		} 
		else if (quadrantBorers[1][0] < currPos[0] && quadrantBorers[1][1] > currPos[1]) {
			quadrantBorers[1] = currPos;
		}
		else if (quadrantBorers[2][0] < currPos[0] && quadrantBorers[2][1] < currPos[1]) {
			quadrantBorers[2] = currPos;
		}
		else if (quadrantBorers[3][0] > currPos[0] && quadrantBorers[3][1] < currPos[1]) {
			quadrantBorers[3] = currPos;
		}
	}
	
	bool isInBorders(std::vector<std::vector<int>> borders, std::vector<int> postion) {
		if (borders[0][0] > postion[0] && borders[0][1] > postion[1]) {
			return false;
		}
		if (borders[1][0] < postion[0] && borders[1][1] > postion[1]) {
			return false;
		}
		if (borders[2][0] < postion[0] && borders[2][1] < postion[1]) {
			return false;
		}
		if (borders[3][0] > postion[0] && borders[3][1] < postion[1]) {
			return false;
		}
		return true;
	}

	void setIntersection (Wire otherWire) {
		Timer t("Intersection search");
		std::vector<int> startPostionWire1 = corners[0];
		for (unsigned int i = 1; i < corners.size(); i++) {
			std::vector<int> endPostionWire1 = corners[i];
			// skip if current positions are not near any of the other wire
			if (!isInBorders(otherWire.quadrantBorers, startPostionWire1) && !isInBorders(otherWire.quadrantBorers, endPostionWire1)) {
				continue;
			}
			std::vector<int> startPostionWire2 = otherWire.corners[0];
			for (unsigned int j = 1; j < otherWire.corners.size(); j++) {
				std::vector<int> endPostionWire2 = otherWire.corners[j];

				std::vector<int> intersection = FindIntersection(startPostionWire1, endPostionWire1, startPostionWire2, endPostionWire2, distances[i - 1], otherWire.distances[j - 1]);
				if (!(intersection[0] == 0 && intersection[1] == 0)) {
					intersections.push_back(intersection);
				}
				startPostionWire2 = endPostionWire2;
			}
			startPostionWire1 = endPostionWire1;
		}
	}

	std::vector<int> FindIntersection(std::vector<int> &startW1, std::vector<int> &endW1, std::vector<int> &startW2, std::vector<int> &endW2, int diststance1, int diststance2) {
		std::vector<int> intersection({ 0,0,0 });

		if ((startW2[0] <= startW1[0] && endW2[0] >= endW1[0]) || (startW2[0] >= startW1[0] && endW2[0] <= endW1[0])) {
			if ((startW1[1] >= startW2[1] && endW1[1] <= endW2[1]) || (startW1[1] <= startW2[1] && endW1[1] >= endW2[1])) {
				int totalDistance = 0;
				if (startW1[0] == endW1[0]) {
					intersection[0] = startW1[0];
					intersection[1] = startW2[1];
					totalDistance += abs(intersection[1] - startW1[1]) + abs(intersection[0] - startW2[0]);
				}
				else {
					intersection[0] = startW2[0];
					intersection[1] = startW1[1];
					totalDistance += abs(intersection[0] - startW1[0]) + abs(intersection[1] - startW2[1]);
				}
				totalDistance += diststance1 + diststance2;
				intersection[2] = totalDistance;
			}
		}
		return intersection;
	}

};

std::vector<std::vector<int>> Wire::intersections;

void Day03(const char* fileName) {
	LogTitle("Day 03");
	// timer
	Timer timer("Total");
	
	// parse data
	std::ifstream file(fileName);
	std::string str;
	std::vector<std::vector<std::string>> wires;
	while (std::getline(file, str))
	{
		wires.push_back(splitByChar(str, ','));
	}


	Wire w0(wires[0]);
	Wire w1(wires[1]);
	
	w0.setIntersection(w1);

	// part 1
	int minDistance = -1;

	for (std::vector<int> intersection : w0.intersections) {
		int distance = abs(intersection[0]) + abs(intersection[1]);
		if (minDistance == -1 || minDistance > distance) {
			minDistance = distance;
		}
	}
	LogResult("Part 1", minDistance);

	minDistance = -1;
	for (std::vector<int> intersection : w0.intersections) {
		int distance = intersection[2];
		if (minDistance == -1 || minDistance > distance) {
			minDistance = distance;
		}
	}
	LogResult("Part 2", minDistance);
}