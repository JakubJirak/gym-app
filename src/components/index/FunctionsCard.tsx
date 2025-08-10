import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

interface Props {
  title: string;
  text: string;
}

const FunctionsCard = ({ title, text }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-light text-base/7 tracking-wider mt-[-12px]">
          {text}
        </p>
      </CardContent>
    </Card>
  );
};

export default FunctionsCard;
