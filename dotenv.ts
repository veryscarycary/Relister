// This file is necessary in order to ensure that dotenv loads first.
// Import statements are hoisted to the top, so if not included as
// an import itself, dotenv will load after other imported files
debugger;
console.log('hello!!');
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();