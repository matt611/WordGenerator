import * as fs from 'fs';
import * as readline from 'node:readline';
import { generateWords } from './WordGenerator';
import { TrieNode } from './TrieNode';

const DEFAULT_DICTIONARY_PATH = './resources/2of12inf.txt';

/**
 * Reads all the words from a file and inserts them into a new trie.
 * The file should contain all the words on their own line.
 * Returns the root node of the populated trie.
 * @param {string} filename
 * @returns {TrieNode}
 */
const buildTrieDictionaryFile = async (filename: string): Promise<TrieNode> => {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const rootNode = new TrieNode();

  // iterate through the file stream and add each word to the trie.
  for await (const line of rl) {
    const word = line.trim();
    rootNode.addWord(word);
  }

  return rootNode;
};

const run = async (letters: string, dictionaryPath: string): Promise<void> => {
  const dictionaryTrieRootNode = await buildTrieDictionaryFile(dictionaryPath);
  const results = generateWords(letters, dictionaryTrieRootNode);
  console.log(results);
};

if (process.argv.length < 3) {
  console.error('A string of letters is required.');
  console.error('Usage: node dist/src/index.js letters [path-to-dictionary]');
  process.exit(1);
}

let dictionaryPath = DEFAULT_DICTIONARY_PATH;
if (process.argv[3] !== undefined) dictionaryPath = process.argv[3];

void run(process.argv[2], dictionaryPath);
