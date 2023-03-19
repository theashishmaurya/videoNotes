import React, { useState } from "react";
import { Button, Space, Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { PlusOutlined } from "@ant-design/icons";
import { Key } from "antd/es/table/interface";
import { recursivelyAddNode, recursivelyDeleteNode } from "./utils";

const { DirectoryTree } = Tree;

export interface CustomDataNode extends DataNode {
  // Support data which is string
  data?: string;
  children?: CustomDataNode[];
}

const treeData: CustomDataNode[] = [
  {
    title: "parent 0",
    key: "0-0",
    children: [
      {
        title: "leaf 0-0",
        key: "0-0-0",
        isLeaf: true,
        icon: <PlusOutlined />,
        data: "hello",
      },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
    ],
  },
  {
    title: "parent 1",
    key: "0-1",
    children: [
      { title: "leaf 1-0", key: "0-1-0", isLeaf: true },
      { title: "leaf 1-1", key: "0-1-1", isLeaf: true },
    ],
  },
  {
    title: "file 2",
    key: "0-2",
    isLeaf: true,
  },
];

const Directory: React.FC = () => {
  const [directoryData = treeData as CustomDataNode[], setDirectoryData] =
    useState<CustomDataNode[]>();

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
    setSelectedKeys(keys);
  };

  const onDelete = () => {
    if (selectedKeys.length === 0) return;
    console.log("Deleting", selectedKeys);
    let NewDirectoryData = recursivelyDeleteNode(selectedKeys, directoryData);
    setDirectoryData(NewDirectoryData);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  const addNewNode = (type: "folder" | "file") => {
    //TODO: Add a unique key
    //TODO: Add a way to edit the title
    //TODO: Add a way to add a folder inside a folder
    const newFolder = {
      title: "New Folder",
      key: Math.random().toString(),
      children: [],
    };

    const newFile = {
      title: "New File",
      key: Math.random().toString(),
      isLeaf: true,
    };

    if (selectedKeys.length === 0) {
      setDirectoryData([
        ...directoryData,
        type === "folder" ? newFolder : newFile,
      ]);
      return;
    }

    let NewDirectoryData = recursivelyAddNode(
      selectedKeys[0],
      directoryData,
      type === "folder" ? newFolder : newFile
    );
    setDirectoryData(NewDirectoryData);
  };

  return (
    <>
      <Space
        style={{
          width: "100%",
          justifyContent: "end",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => addNewNode("folder")}
        >
          Add Folder
        </Button>
        <Button type="primary" onClick={() => addNewNode("file")}>
          Add File
        </Button>
        <Button type="primary" onClick={onDelete}>
          Delete
        </Button>
      </Space>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={directoryData}
        onRightClick={(e) => {
          console.log(e);
        }}
      />
    </>
  );
};

export default Directory;
