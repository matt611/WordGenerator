# Word Generator App

This is a command line app to generate all the possible english words from a string of charaters.

## Usage

First run the typescript compiler. The compiler is configured to place the transpiled javascript code in the dist directory. The resulting javascript files can then be executed with node. The CLI takes 2 arguments:

1. A string of charaters from which to build the words
2. [optional] The path to a dictionary file on the local disk. If no path is supplied the path will default to ./resources/2of12inf.txt.

Here is an example command to compile and execte the CLI:

```
tsc; node dist/src/index.js oogd ./resources/2of12inf.txt
```

## Tests

Tests at this point are very rudimentary and have lots of opportunities for improvement.
Unit test use the Jest framework. Running the tests and generating a coverage report can be done with this command:

```
npm run test
```

## Assumptions

The algorithm assumes that the dictionary will be large and the list of characters will be small. It assumes that checking if a word exists in the dictionary will be the bottle neck and that iterating over the different combinations of letters will be trivial. There is room for optimization in the code that iterates over the letter combinations.

## Dictionaries

The generator uses a dictionary supplied as a text file to validate the generated words. Dictionary files should be formatted to a single word per line. The resources directory contains the 2of12inf file from the 12Dicts word list. More info on this file can be found [here](http://wordlist.aspell.net/12dicts-readme/#2of12inf).
