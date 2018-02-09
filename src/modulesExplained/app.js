// COMMON JS
// This is how we get module
// this is the way for node modules
// const p = require('./mymodule1');
// console.log(p.name);

// ES2015 Module

// Destructuring - getting multiple things from module
// import { person, sayHello } from './mymodule2';
// console.log(person.name);
// console.log(sayHello());

// Export everything/all
// import * as mod from './mymodule2';
// console.log(mod.person);
// console.log(mod.sayHello());

// Export when we have default
import greeting from './mymodule2';
console.log(greeting);
