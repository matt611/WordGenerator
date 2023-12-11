import { TrieNode } from './TrieNode';
import * as fs from 'fs';
import * as readline from 'node:readline';

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

/**
 * Helper function to recursively find all words
 * with a given prefix and a list of remaining letters
 * @param {TrieNode} currentNode
 * @param {string[]} letters
 * @param {string} prefix
 * @returns
 */
const findWords = (
  currentNode: TrieNode,
  letters: string[],
  prefix: string = ''
): string[] => {
  // We only need to iterate over the unigue letters since
  // duplicate letters will produce duplicate results.
  const uniqueLetters = [...new Set(letters)];

  return uniqueLetters.reduce((acc: string[], letter) => {
    const child = currentNode.getChild(letter);
    const nextPrefix = `${prefix}${letter}`;

    // Remove this letter from the list of remaining letters.
    // TODO: This is an in efficient way to do this since we need
    // to iterate over the remaining letters to find the index
    // and then iterate over it again to create the new list of
    // remaining letters.
    const letterIndex = letters.findIndex((i) => i === letter);
    const remainingLetters = [
      ...letters.slice(0, letterIndex),
      ...letters.slice(letterIndex + 1),
    ];

    // If there is no child that means there are no more possible
    // words down this branch so we can quit here.
    if (child === undefined) return acc;

    // If this letter results in a word add it to the list.
    if (child.isWord) acc.push(nextPrefix);

    // Concatenate the existing list of words with all words that can
    // be generated with the remaining letters.
    return [...acc, ...findWords(child, remainingLetters, nextPrefix)];
  }, []);
};

/**
 * Generates a list of all possible words in the dictionary that can
 * be gererated from the list of letters. This helper function was
 * written mostly to make testing easier since the dictionary is
 * already converted to a trie and does not require an async read from disk.
 * @param {string} letters
 * @param {TrieNode} dictionaryTrieRoot
 * @returns {string[]}
 */
export const generateWordsFromTrie = (
  letters: string,
  dictionaryTrieRoot: TrieNode
): string[] => {
  const lettersArray = letters.split('');

  return findWords(dictionaryTrieRoot, lettersArray, '');
};

/**
 * Generates a list of all possible words in the dictionary that can
 * be gererated from the list of letters. The dictionaryPath param is
 * optional. If no dictionary is specified the default dictionary will
 * be used.
 * @param {string} letters
 * @param {string} [dictionaryPath]
 * @returns {Promise<string[]>}
 */
export const generateWords = async (
  letters: string,
  dictionaryPath: string = DEFAULT_DICTIONARY_PATH
): Promise<string[]> => {
  const dictionaryTrieRootNode = await buildTrieDictionaryFile(dictionaryPath);
  return generateWordsFromTrie(letters, dictionaryTrieRootNode);
};
