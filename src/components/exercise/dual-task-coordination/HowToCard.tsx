import { Card } from "@/components/ui";

const HowToCard = () => (
  <Card variant="info" className="space-y-4">
    <ul className="list-disc list-inside space-y-2">
      <li>
        Follow the rhythm and alternate between left and right hand movements
      </li>
      <li>Answer questions verbally within the time limit</li>
      <li>In symbol mode, point to the target symbol with each hand</li>
      <li>Exercise ends when time runs out or all questions are completed</li>
      <li>Tempo will vary to increase difficulty</li>
    </ul>
  </Card>
);

export default HowToCard;
