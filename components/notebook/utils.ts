import { DataNode } from "antd/es/tree";
import { CustomDataNode } from "./directory";

//TODO: delete multiple nodes
export const recursivelyDeleteNode = (
  key: (string | number)[],
  data: CustomDataNode[]
): CustomDataNode[] => {
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
    ) as CustomDataNode[];
  }

  return data;
};

export const recursivelyEditTitle = (
  key: string | number,
  title: string,
  data: CustomDataNode[]
): CustomDataNode[] => {
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
    ) as CustomDataNode[];
  }
  return data;
};

export const recursivelyAddNode = (
  key: string | number,
  data: CustomDataNode[],
  newnode: CustomDataNode
): CustomDataNode[] => {
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
    ) as CustomDataNode[];
  }
  return data;
};
