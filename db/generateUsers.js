#!/usr/bin/env node
const faker = require('faker');

const count = +process.argv[2] || 5;

/**
 * @example ./generateUsers.js 20 > users.csv
 * @func makeUser
 * @desc spit out an array of headings or an array of values
 */

function makeUser(i) {
  return (i === 0) ? [
    'firstname',
    'lastname',
    'username',
    'email',
    'zip',
    'avatar',
    'password',
  ] : [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.address.zipCode(),
    faker.internet.avatar(),
    faker.lorem.word(),
  ];
}

// add one more to the count for the heading
const users = Array(count + 1).fill(0)
  /* map over, make a user and join the results */
  .map((e, i) => makeUser(i).join(','));

// spit out the results with line breaks separating the records
console.log(users.join('\n'));
