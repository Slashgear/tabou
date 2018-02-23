const _ = require('lodash');

module.exports = function(initValue, hashcode, nbIteration, fitness, neighbours) {
    const tabou = new Set();
    let bestFound = {
        fitness: fitness(initValue),
        value: initValue,
    };

    let currentValue = initValue;
    tabou.add(hashcode(initValue));


    for(let i = 0;i < nbIteration; i++) {
        const costByNeighbours = neighbours(currentValue).map(value => ({fitness: fitness(value), value}));
        const ordered = _.orderBy(costByNeighbours, 'fitness');
        for(neighbour of costByNeighbours) {
            const hash = hashcode(neighbour.value);
            if(!tabou.has(hash)){
                currentValue = neighbour.value;
                tabou.add(hash);
                if(neighbour.fitness < bestFound.fitness) {
                    bestFound = neighbour;
                }
                break;
            }
        }
    }

    return bestFound;
}
