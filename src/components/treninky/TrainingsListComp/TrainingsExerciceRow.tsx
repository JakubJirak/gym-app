interface ExcerciceRow {
  number: number;
  title: string;
  weight: number;
  reps: number;
}

const TrainingsExcerciceRow = ({
  number,
  title,
  weight,
  reps,
}: ExcerciceRow) => {
  return (
    <div className="grid grid-cols-[15px_1fr_60px_32px] justify-items-start items-center gap-1">
      <p>{number !== 0 && `${number}.`}</p>
      <p className="font-semibold">{title}</p>
      <p>{weight}kg</p>
      <p>{reps}x</p>
    </div>
  );
};

export default TrainingsExcerciceRow;
