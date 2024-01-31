# sl-nic-utils

[![npm version](https://img.shields.io/npm/v/sl-nic-utils.svg)](https://www.npmjs.com/package/sl-nic-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Sri Lanka NIC Utilities - An adaptable npm package designed to validate NIC numbers, determine the NIC format, convert between OLD and NEW formats, and extract detailed information from Sri Lanka National Identity Card (NIC) numbers.

## Features

- **NIC Validation**: Quickly validate Sri Lanka NIC numbers to ensure they adhere to the correct format.
- **NIC Type Detection**: Determine whether a given NIC is of the OLD or NEW type, helping you identify the issuing format.

- **FORMAT NIC**: Easily format NIC numbers to the OLD and NEW formats, making it convenient to work with different versions.

- **NIC Information Extraction**: Extract essential details such as gender and birthday from a valid NIC number, providing useful information about the cardholder.

## Installation

```
npm install sl-nic-utils
```

## Usage

```javascript
const {
  validateNic,
  getNicType,
  formatNic,
  getNicDetails,
} = require('sl-nic-utils');

// or

import {
  validateNic,
  getNicType,
  formatNic,
  getNicDetails,
} from 'sl-nic-utils';
```

```javascript
// NIC Validation
console.log(validateNic('200125606787')); // true
console.log(validateNic('20012560678V')); // false

// NIC Type Detection
console.log(getNicType('200125606787')); // NEW
console.log(getNicType('882787095V')); // OLD

// Format NIC
console.log(formatNic('199425606787', 'OLD')); // 942566787V
console.log(formatNic('882787095V')); // 198827807095

// Get NIC Details
console.log(getNicDetails('200125606787')); // { type: 'NEW', gender: 'Male', birthday: new Date(2001, 8, 12)}
// Birthday: 2001-09-12
```

## Contributing

We welcome contributions and feedback. Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/pwshehan/sl-nic-utils).

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
