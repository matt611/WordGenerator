import { TrieNode } from '../src/TrieNode';

describe('TrieNode', () => {
  it('should add words correctly', () => {
    const node = new TrieNode();
    const words = ['as', 'ask', 'bat'];
    words.forEach((w) => {
      node.addWord(w);
    });

    expect(node?.getChild('a')?.isWord).toBeFalsy();
    expect(node?.getChild('a')?.getChild('s')?.isWord).toBeTruthy();
    expect(
      node?.getChild('a')?.getChild('s')?.getChild('k')?.isWord
    ).toBeTruthy();
    expect(node?.getChild('b')?.isWord).toBeFalsy();
    expect(node?.getChild('b')?.getChild('a')?.isWord).toBeFalsy();
    expect(
      node?.getChild('b')?.getChild('a')?.getChild('t')?.isWord
    ).toBeTruthy();
  });

  it('should retieve child nodes correctly', () => {
    const node = new TrieNode();
    node.addWord('a');

    const nodeA = node.getChild('a');
    expect(nodeA).toBeDefined();
    expect(nodeA?.isWord).toBeTruthy();
    expect(node.getChild('b')).toBeUndefined();
  });

  it('should retrieve the last node correctly', () => {
    const node = new TrieNode();
    const addedWord = 'ask';
    const addedWordPrefix = addedWord.substring(0, 2);
    const notAddedWord = 'bat';

    node.addWord(addedWord);

    const addedWordLastNode = node.getLastNode(addedWord);
    const prefixLastNode = node.getLastNode(addedWordPrefix);
    const notAddedWordLastNode = node.getLastNode(notAddedWord);

    expect(addedWordLastNode?.isWord).toBeTruthy();
    expect(prefixLastNode?.isWord).toBeFalsy();
    expect(prefixLastNode?.getChild('k')).toBeDefined();
    expect(notAddedWordLastNode).toBeUndefined();
  });
});
