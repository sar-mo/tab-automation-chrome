import "./styles.css";
import React, { useState } from "react";

import { DndContext } from "@dnd-kit/core";

import Droppable from "./Droppable";
import Draggable from "./Draggable";
import getTabMarkup from "./Tab";

interface TabData {
  link: string;
  groupUid: number;
  uid: number;
  pinned: boolean;
}

const color = ['grey', 'blue', 'red', 'yellow', 'green', 'pink', 'purple', 'cyan', 'orange']

interface GroupData {
  name: string;
  id: number;
  uid: number;
  collapsed: boolean;
}

export default function App() {
  const [tabID, setTabID] = useState(4);

  const [groups, setGroups] = useState<GroupData[]>([
    {
      name: "Group 1",
      id: 0,
      uid: 0,
      collapsed: false
    },
    {
      name: "Group 2",
      id: 1,
      uid: 1,
      collapsed: true
    }
  ]);

  const [tabs, setTabs] = useState<TabData[]>([
      {
        link: "chess.com/",
        groupUid: 0,
        uid: 0,
        pinned: false
      },
      {
        link: "lichess.org/",
        groupUid: 0,
        uid: 1,
        pinned: false
      },
      {
        link: "monkeytype.com/",
        groupUid: -1,
        uid: 2,
        pinned: false
      },
      {
        link: "chat.openai.com/",
        groupUid: 1,
        uid: 3,
        pinned: false
      }
    ]);

  function handleDragEnd(event: { over: any }) {
    const { over } = event;
    console.log(over)

    if (over && over.id) {
      const groupIndex = groups.findIndex((group) => group.uid === over.id);
      if (groupIndex !== -1) {
        const updatedTabs = tabs.map((tab) =>
          tab.uid === tabID
            ? { ...tab, groupUid: over.id }
            : tab
        );
        setTabs([...updatedTabs, { link: "Tab " + tabID, groupUid: over.id, uid: tabID, pinned: false }]);
        setTabID(tabID + 1);
      }
    }
  }

  function createNewTab() {
    setTabs([
      ...tabs,
      {
        link: "",
        groupUid: -1,
        uid: tabID,
        pinned: false,
      },
    ]);
    setTabID(tabID + 1);
    console.log(tabs)
  }

  function createNewGroup() {
    const newGroupUid = groups.length;
    setGroups([
      ...groups,
      {
        name: "Group " + (newGroupUid + 1),
        id: newGroupUid,
        uid: newGroupUid,
        collapsed: false,
      },
    ]);
  }

  function openTabs() {
    // Logic to open all tabs in a new window
    return
  }

  function exportTabs() {
    const exportData = {
      groups,
      tabs,
    };
  
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "tabs.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importTabs() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const text = await file.text();
        const importData = JSON.parse(text);
        setGroups(importData.groups);
        setTabs(importData.tabs);
      }
    };
    input.click();
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="group-container">
        {groups.map((group) => (
          <div className="group-box" key={group.uid}>
            <div className="group-title">{group.name}</div>
            <Droppable key={group.uid} id={group.uid}>
              {tabs.length > 0 && (
                <ul className="tab-container">
                  {tabs
                    .filter((tab) => tab.groupUid === group.uid)
                    .map((tab) => (
                      <li key={tab.uid}>{getTabMarkup(tab)}</li>
                    ))}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
        {tabs.map((tab) =>
          tab.groupUid === -1 && <div key={tab.uid}>{getTabMarkup(tab)}</div>
        )}
      </div>
      <div>
        <button onClick={createNewTab}>Create New Tab</button>
        <button onClick={createNewGroup}>Create New Group</button>
        <button onClick={openTabs}>Open Tabs</button>
        <button onClick={importTabs}>Import Tabs</button>
        <button onClick={exportTabs}>Export Tabs</button>
      </div>
    </DndContext>
  );
}


// to-do:
// edit button in Tab.tsx so that you can edit the link
// Button should only open tab when clicked
// color options for group, move groups into Group.tsx
// High priority: when tabs are dragged out of a group, it should become an individual tab
// High priority: when tabs are dragged into a group, it should become part of that group