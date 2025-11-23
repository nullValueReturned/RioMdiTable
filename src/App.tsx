import './App.css'
import MyComp from './MdiTable/MdiTable'
import data from "./data.json";
import type { IRankedTeams } from './types/IRankedTeams';


const myData: IRankedTeams[] = data;

function App() {
  if (!myData || myData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MyComp myData={myData} />
    </>
  )
}

export default App
