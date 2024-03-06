# sl-nic-utils

[![npm version](https://img.shields.io/npm/v/sl-nic-utils.svg)](https://www.npmjs.com/package/sl-nic-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Sri Lanka NIC Utilities - An adaptable npm package designed to validate NIC numbers, determine the NIC format, convert between OLD and NEW formats, and extract detailed information from Sri Lanka National Identity Card (NIC) numbers.

## Features

- **NIC Validation**: Quickly validate Sri Lanka NIC numbers to ensure they adhere to the correct format.
- **NIC Type Detection**: Determine whether a given NIC is of the OLD or NEW type, helping you identify the issuing format.
- **NIC Birthday Detection**: Extract the birthday of given NIC owner, as year, month, date and as a Date object.
- **FORMAT NIC**: Easily format NIC numbers to the OLD and NEW formats, making it convenient to work with different versions.

## Installation

```
npm install sl-nic-utils
```

## Usage

```javascript
const NIC = require('sl-nic-utils').default;

// or

import NIC from 'sl-nic-utils';
```

```javascript
const nic = new NIC('200125606787');

// NIC Validation
console.log(nic.isValid); // true

// NIC Type Detection
console.log(nic.type); // NEW

// NIC Birthday Detection
const birthday = nic.birthday;

console.log(birthday.year); // 2001
console.log(birthday.month); // 8
console.log(birthday.date); // 12

console.log(birthday.toString()); // 2001/8/12

console.log(birthday.toDate()); // js Date object for 2001-08-12

// Format NIC
console.log(nic.format('OLD')); // 942566787V
```

## Contributing

We welcome contributions and feedback. Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/pwshehan/sl-nic-utils).

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
