// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {model} from '../../src/decorators/model';
import {Entity} from '../../src/model';

@model(require('./customer.definition'))
export class Customer extends Entity {}
