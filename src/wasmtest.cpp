#include <emscripten.h>
#include <emscripten/val.h>
#include <stdio.h>
#include <math.h>

using namespace std;
using namespace emscripten;
extern "C" {
	EMSCRIPTEN_KEEPALIVE
	int main() {
		printf("Main\n");
		return 0;
	}

	EMSCRIPTEN_KEEPALIVE
	extern void setup() {
		printf("Setup\n");
	}

	EMSCRIPTEN_KEEPALIVE
	extern void loop() {
		val Game = val::global("Game");
	        printf("Loop %i\n", Game["time"].as<int>());
		EM_ASM(
			_.each(Game.spawns, s=>s.createCreep([MOVE]))
		);
		val creeps = Game["creeps"];
		val names = val::global("Object").call<val>("keys", creeps);
		int len = names["length"].as<int>();
		std::string name;
		for (int i = 0; i < len; i++) {
			name = names[i].as<std::string>();
			val creep = creeps[name];
			printf("%s\n",creep["name"].as<std::string>().c_str());
			int mv = rand() % 8 + 1;
			creep.call<int>("move",mv);
			creep.call<int>( "say", creep["name"].as<std::string>());
		}
	}

}


/*
		return;
*/
