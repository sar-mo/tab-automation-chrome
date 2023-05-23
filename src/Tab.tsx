import "./styles.css";
import Draggable from "./Draggable";


interface TabData {
    link: string;
    groupUid: number;
    uid: number;
    pinned: boolean;
  }


export default function getTabMarkup(tab: TabData) {
    return (
      <Draggable id={tab.uid}>
        <div className="tab-box" key={tab.uid}>
          <a href={"https://" + tab.link}>{tab.link}</a>
        </div>
      </Draggable>
    );
  }