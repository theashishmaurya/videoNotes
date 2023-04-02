import React, { useEffect, useState } from "react";
import { Button, Space, Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import {
  DeleteFilled,
  FileAddFilled,
  FolderAddFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Key } from "antd/es/table/interface";
import { recursivelyAddNode, recursivelyDeleteNode } from "./utils";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { getDirectory, updateDirectory } from "@/firebase/db/notes";
import { useUser } from "@/context/userContext";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [];

const Directory: React.FC = ({}) => {
  const [directoryData, setDirectoryData] = useState<DataNode[]>([]);

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<[]>([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log(user, "Getting Directory");
      getDirectory(user.uid).then((data) => {
        console.log(directoryData);
        setDirectoryData(data);
      });
    }
  }, [user]);
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
    setSelectedKeys(info.selectedNodes.map((node) => node.key));
    //if selected node is leaf then navigate to the note
    if (info.selectedNodes[0].isLeaf) {
      const basePath = router.asPath.split("/")[1]; // extract base dynamically

      router.push(
        `/${info.selectedNodes[0].key}`,
        `/${basePath}/${info.selectedNodes[0].key}`,
        {
          shallow: true,
        }
      );
    }
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

  const addNewNode = async (type: "folder" | "file") => {
    //TODO: Add a unique key
    //TODO: Add a way to edit the title
    const newFolder = {
      title: "New Folder",
      key: nanoid(6),
      children: [],
    };

    const newFile = {
      title: "New File",
      key: nanoid(6),
      isLeaf: true,
    };

    if (selectedKeys.length === 0) {
      try {
        if (!user) throw new Error("User not found");
        let newDirectoryData = [
          ...directoryData,
          type === "folder" ? newFolder : newFile,
        ];

        await updateDirectory(user.uid, newDirectoryData);
        setDirectoryData([...directoryData]);
      } catch (error) {
        console.log(error);
      }

      return;
    }

    let NewDirectoryData = recursivelyAddNode(
      selectedKeys[0],
      directoryData,
      type === "folder" ? newFolder : newFile
    );

    //TODO: Extract the below code, and make it a function
    // save the new data to the firebase database inside the user collection
    // user.id = uid

    try {
      if (!user) throw new Error("User not found");

      await updateDirectory(user.uid, NewDirectoryData);
    } catch (error) {
      console.log(error);
    }

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
          type="ghost"
          icon={<FolderAddFilled />}
          onClick={() => addNewNode("folder")}
        />
        <Button
          type="ghost"
          onClick={() => addNewNode("file")}
          icon={<FileAddFilled />}
        />
        <Button
          type="ghost"
          onClick={onDelete}
          icon={<DeleteFilled color="red" />}
        />
      </Space>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={directoryData}
        onRightClick={(e) => {
          console.log(e.node);
        }}
      />
    </>
  );
};

export default Directory;
