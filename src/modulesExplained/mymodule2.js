export const person = {
  name: 'Pera',
  age: 30,
};

export function sayHello() {
  return `Hello ${person.name}`;
}

const greeting = 'Hello World';
// If we use default we DON'T have to use {}
export default greeting;
