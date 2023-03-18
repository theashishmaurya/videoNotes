import React, { useState } from "react";
import { Button, Space, Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { PlusOutlined } from "@ant-design/icons";
import { Key } from "antd/es/table/interface";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: "parent 0",
    key: "0-0",
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
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
];

const Directory: React.FC = () => {
  const [directoryData = treeData as DataNode[], setDirectoryData] =
    useState<DataNode[]>();

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
    setSelectedKeys(keys);
  };

  const onDelete = () => {
    if (selectedKeys.length === 0) return;
    console.log("Deleting", selectedKeys);
    selectedKeys.forEach((key) => {
      const index = directoryData.findIndex((node) => node.key === key);
      setDirectoryData(directoryData.filter((_, i) => i !== index)); // TODO: Fix Deleting a folder
    });
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  const AddFolder = () => {
    //TODO: Add a unique key
    //TODO: Add a way to edit the title
    //TODO: Add a way to add a folder inside a folder
    const newFolder = {
      title: "New Folder",
      key: "1231411",
      children: [],
    };
    setDirectoryData([...directoryData, newFolder]);
  };

  return (
    <>
      <Space
        style={{
          width: "100%",
          justifyContent: "end",
        }}
      >
        <Button type="primary" icon={<PlusOutlined />} onClick={AddFolder}>
          Add Folder
        </Button>
        <Button type="primary">Add File</Button>
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
