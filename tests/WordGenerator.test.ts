import { TrieNode } from '../src/TrieNode';
import { generateWords } from '../src/WordGenerator';

const DICTIONARY = [
  'good',
  'god',
  'dog',
  'goo',
  'do',
  'go',
  'cat',
  'tac',
  'act',
];

describe('WordGenerator', () => {
  let dictTrieRoot: TrieNode;

  beforeEach(() => {
    dictTrieRoot = new TrieNode();
    DICTIONARY.forEach(dictTrieRoot.addWord);
  });

  it('should generate the correct words from a list of valid characters', () => {
    const results = generateWords('oogd', dictTrieRoot);
    const expectedResults = ['do', 'dog', 'go', 'god', 'goo', 'good'];

    expect(results.sort()).toStrictEqual(expectedResults);
  });

  it('should return an empty list if no words are possible form character set', () => {
    const results = generateWords('wxyz', dictTrieRoot);
    expect(results).toStrictEqual([]);
  });
});
