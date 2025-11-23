
type Props = {
  dungeonScore: number | null;
  formattedTime: string | null;
  isBestRun: boolean;
};

const RunInfo = ({dungeonScore, formattedTime, isBestRun}: Props) => {
  if (dungeonScore === null || formattedTime === null) {
    return <>-</>;
  }
  return <>{dungeonScore} <span className="greyText">[{formattedTime}]</span>{isBestRun ? <span className="bestRun">⭐</span> : ""}</>;
};

export default RunInfo;
