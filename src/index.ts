interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

interface BaseRecord{
    id: string;
}

interface Database <T extends BaseRecord>{
    set(newValue: T): void
    get(id: string): T | undefined
}

// Factory pattern

function createDatabase<T extends BaseRecord>() {
    class InMemoryDatabase implements Database<T> {
        private db: Record<string, T> = {};

        // Singleton pattern

        static instance: InMemoryDatabase = new InMemoryDatabase();

        private constructor() {}

        public set(newValue: T): void {
            this.db[newValue.id] = newValue;
        }

        public get(id: string): T | undefined{
            return this.db[id];
        }
    }

    return InMemoryDatabase;
}

const pokemonDB = createDatabase<Pokemon>();
pokemonDB.instance.set({ 
    id: 'Bulbasaur', 
    attack: 30, 
    defense: 15 
}); 

console.log(pokemonDB.instance.get('Bulbasaur'));