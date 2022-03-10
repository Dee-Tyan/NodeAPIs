import FileTree from './fileTree';

export function createFileTree(input) {
  const fileTree = new FileTree();

  const newInput = [input[0], ...input.slice(1, input.length).sort((a, b) => a.id - b.id)]
  for (const inputNode of newInput) {
    
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}