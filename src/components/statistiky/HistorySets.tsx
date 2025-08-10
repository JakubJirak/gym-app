import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { History } from "lucide-react";

const HistorySets = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="flex gap-3 items-center">
            <History />
            Historie cviku
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>historie</CardContent>
    </Card>
  );
};

export default HistorySets;
