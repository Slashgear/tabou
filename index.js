module.exports = function(initValue, hashcode, nbIteration, fitness, neighbours) {
    const tabou = new Set();
    let bestFound = {
        fitness: fitness(initValue),
        value: initValue,
    };

    let currentValue = initValue;
    tabou.set(hashcode(initValue));

    for(let i = 0;i < nbIteration; i++) {
        const costByNeighbours = neighbours(currentValue).map(value => ({fitness: fitness(value), value}));
        const ordered = _.orderBy(costByNeighbours, 'fitness');


    }

    return bestFound;
}
