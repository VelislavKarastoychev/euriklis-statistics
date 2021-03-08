'use strict'
console.clear()
const Statistics = require('../index')

const statistics_instance1 = new Statistics({ data : [1, 5, 854098, 554.0343743, 343, 13483, 3847, 3823, 34], type : 'relevant'})

// console.log(statistics_instance1)
// console.log(statistics_instance1.data)
// console.log(statistics_instance1.type)
const si = new Statistics()
const si1 = si.clone()
si1.data = [1, 2, 5.43, 3.17, 9, 8.21]
si1.type = 'ordinal'
si1.type = 'relevant'
console.log(`The data is ${JSON.stringify(si1.data)} and the type is ${si1.type}`)
console.log(si)