import { generateWords } from './WordGenerator';

/**
 * This is the main function. It takes a string of letters and an optional path to
 * a dictionary file.  All the valid words that can be generated from the string of
 * letters is logged to the console.
 * @param {string} letters
 * @param {string} [dictionaryPath]
 */
const run = async (letters: string, dictionaryPath: string): Promise<void> => {
  const results = await generateWords(letters, dictionaryPath);
  console.log(results);
};

if (process.argv.length < 3) {
  console.error('A string of letters is required.');
  console.error('Usage: node dist/src/index.js letters [path-to-dictionary]');
  process.exit(1);
}

void run(process.argv[2], process.argv[3]);
