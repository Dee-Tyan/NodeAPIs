import FileTree from './fileTree';

export function createFileTree(input) {
  const fileTree = new FileTree();

  const newInput = [input[0], ...input.slice(1, input.length).sort((a, b) => a.id - b.id)]
  
  // const first = input[0]
  // const second =  input.slice(1).sort((a,b) => a.id - b.id)
  // const newInput = [first, ...second];

  // const [ first, ...rest ]  = input;
  // rest.sort(...)

  // const newInput = [first, ...rest]

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