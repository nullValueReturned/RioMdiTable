import { useState } from "react";
import "./App.css";
import MyComp from "./MdiTable/MdiTable";
import data from "./data.json";
import type { IRankedTeams } from "./types/IRankedTeams";

const myData: IRankedTeams[] = data;

function App() {
  const [data, setData] = useState<{ rankedTeams: IRankedTeams[] }>({
    rankedTeams: myData,
  });

  const handleUpdateData = () => {
    const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    try {
      const newData = JSON.parse(textarea.value);
      if (Array.isArray(newData.rankedTeams)) {
        setData({ rankedTeams: newData.rankedTeams });
      } else {
        alert(
          "Invalid data format. Please provide an object with a rankedTeams array."
        );
      }
    } catch (e) {
      alert("Error parsing JSON. Please check the format.");
    }
  };
  return (
    <>
      <div className="updateDataRow">
        <textarea id="textarea" className="updateDataTextArea" />
        <button onClick={handleUpdateData} className="updateDataButton">
          Update Data
        </button>
      </div>
      <MyComp myData={data.rankedTeams} />
    </>
  );
}

export default App;
