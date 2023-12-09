/**
 * Class representing a node in a trie(prefix tree).
 * Note: This is not a full implementation of a trie data structure. It only
 * implements the functionality needed for the word generator project.
 */
export class TrieNode {
  private children: Record<string, TrieNode> = {};
  isWord: boolean = false;

  /**
   * Recursively Adds a word to the trie using the current node as the root.
   * @param {string} word
   */
  addWord = (word: string): void => {
    // An empty string is the recursion base case.
    // When the word is empty that means all letters
    // have been entered into the trie. The only thing
    // left to do is flag this node as the end of a word.
    if (word.length === 0) {
      this.isWord = true;
      return;
    }

    const letter = word[0];
    const remainingLetters = word.substring(1);

    // Add the current letter of the word to the trie
    // if it does not already exist.
    let child = this.children[letter];
    if (child === undefined) {
      child = new TrieNode();
      this.children[letter] = child;
    }

    // Add the rest of the word to the trie.
    this.children[letter].addWord(remainingLetters);
  };

  /**
   * Gets the node for the last letter in the input string.
   * Returns undefined if the string is not in the trie.
   * @param {string} word
   * @returns {(TrieNode | undefined)}
   */
  getLastNode = (word: string): TrieNode | undefined => {
    // An empty string is the recursion base case.
    // It means we have arrived at the node for the
    // last item in the string.
    if (word.length === 0) return this;

    const letter = word[0];
    const child = this.children[letter];

    // If there is no child for the current letting
    // that means the input string is not in the trie.
    if (child === undefined) return undefined;

    const remainingLetters = word.substring(1);

    // Recurse with the remaining letters in the string.
    return child.getLastNode(remainingLetters);
  };

  /**
   * Gets the child node if it exists
   * @param letter
   * @returns {(TrieNode | undefined)}
   */
  getChild = (letter: string): TrieNode | undefined => {
    return this.children[letter];
  };
}
