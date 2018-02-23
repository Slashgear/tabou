const _ = require('lodash');
const chalk = require('chalk');
const distance = require('gps-distance');
const tabou = require('../index');
const points = require('./capitals.json');

const showTravel = listOfPoints => listOfPoints.map(p => p.name);

const fitness = listOfPoints => distance(listOfPoints.map(point => [point.lat, point.lon]));

const hashcode = listOfPoints => showTravel(listOfPoints).join('-');

const swap = (list, indexA, indexB) => {
    const copy = [...list];
    indexB = indexB === -1 ? copy.length - 1: indexB;
    indexB = indexB === copy.length ? 0: indexB;
    var temp = copy[indexB];
    copy[indexB] = copy[indexA];
    copy[indexA] = temp;
    return copy;
}
const neighbours = listOfPoints => {
    const swaped = []
    for(let i = 0; i < listOfPoints.length; i++) {
       swaped.push(swap(listOfPoints, i, i+1));
       swaped.push(swap(listOfPoints, i, i-1));
    }
    return swaped;
}

const firstValue = _.shuffle(points);

console.log(chalk.red('Begin', showTravel(firstValue),fitness(firstValue)));

const bestFound = tabou(firstValue, hashcode, 1000000, fitness, neighbours);

console.log(chalk.yellow('Best travel found', showTravel(bestFound.value), '', bestFound.fitness));
