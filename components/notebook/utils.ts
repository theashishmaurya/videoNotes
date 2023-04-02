import { DataNode } from "antd/es/tree";

//TODO: delete multiple nodes
export const recursivelyDeleteNode = (
  key: (string | number)[],
  data: DataNode[]
): DataNode[] => {
  let nodeDeleted = false;
  const newData = data.map((node) => {
    if (key.includes(node.key)) {
      nodeDeleted = true;
      //   if (node.isLeaf) {
      //     return null;
      //   }
      //   return { ...node, children: [] };

      return null;
    }
    if (node.children) {
      const newChildren = recursivelyDeleteNode(key, node.children);
      if (newChildren !== node.children) {
        nodeDeleted = true;
        return { ...node, children: newChildren };
      }
    }
    return node;
  });

  if (nodeDeleted) {
    return newData.filter(
      (node) =>
        node !== null &&
        (node.children !== undefined || node.title !== undefined)
    ) as DataNode[];
  }

  return data;
};

export const recursivelyEditTitle = (
  key: string | number,
  title: string,
  data: DataNode[]
): DataNode[] => {
  let nodeEdited = false;
  const newData = data.map((node) => {
    if (key === node.key) {
      nodeEdited = true;
      return { ...node, title };
    }
    if (node.children) {
      const newChildren = recursivelyEditTitle(key, title, node.children);
      if (newChildren !== node.children) {
        nodeEdited = true;
        return { ...node, children: newChildren };
      }
    }
    return node;
  });
  if (nodeEdited) {
    return newData.filter(
      (node) =>
        node !== null &&
        (node.children !== undefined || node.title !== undefined)
    ) as DataNode[];
  }
  return data;
};
//TODO: Performance optimization
/*
1. Use a map to store the node's parent (May be)
2. Node and parent node does not have a reference to each other.
3. Every time a node is added,edited,deleted, the whole directory have to be traversed and rewritten to db.
4. The whole directory is stored in redux store.
 */
/**
 * @param key
 * @param data
 * @param newnode
 * @returns
 */
export const recursivelyAddNode = (
  key: string | number,
  data: DataNode[],
  newnode: DataNode
): DataNode[] => {
  let nodeAdded = false;
  const newData = data.map((node) => {
    if (key === node.key) {
      nodeAdded = true;
      return {
        ...node,
        children: node.children ? [...node.children, newnode] : [newnode],
      };
    }
    if (node.children) {
      const newChildren = recursivelyAddNode(key, node.children, newnode);
      if (newChildren !== node.children) {
        nodeAdded = true;
        return { ...node, children: newChildren };
      }
    }
    return node;
  });
  if (nodeAdded) {
    return newData.filter(
      (node) =>
        node !== null &&
        (node.children !== undefined || node.title !== undefined)
    ) as DataNode[];
  }
  return data;
};
