import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import TrainingsExcercice from "@/components/treninky/TrainingsListComp/TrainingsExcercice.tsx";

interface Set {
  weight: number;
  reps: number;
}

interface ExcercisesProp {
  name: string;
  sets: Set[];
}

type TrainingObj = {
  name: string;
  date: string;
  excercises: ExcercisesProp[];
};

interface TrainingProp {
  training: TrainingObj[] | undefined;
}

const Training = ({ training }: TrainingProp) => {
  if (training === undefined || training === null) return <p>Zadny trenink</p>;

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full space-y-2">
        {training.map((item) => (
          <AccordionItem
            value={item.name}
            key={item.name}
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-xl border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
              {item.name}
              {item.date}
            </AccordionTrigger>
            <AccordionContent className="AccordionContent pb-3 text-muted-foreground space-y-3 overflow-hidden">
              <TrainingsExcercice
                number={1}
                title={item.excercises[0].name}
                sets={item.excercises[0].sets}
              />
              {item.excercises.map((excercice, index) => {
                if (index !== 0) {
                  return (
                    <TrainingsExcercice
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={index}
                      number={index + 1}
                      title={excercice.name}
                      sets={excercice.sets}
                    />
                  );
                }
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Training;
