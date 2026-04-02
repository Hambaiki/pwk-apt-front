import { Card } from "@/components/ui";

const HowToCard = () => (
  <Card variant="info" className="space-y-4">
    <ol className="list-decimal list-inside space-y-2">
      <li>Review the grid of shapes, each containing a number and a letter.</li>
      <li>
        For each question, identify the letter associated with the given shape
        and number.
      </li>
      <li>Type your answer in the input box provided for each question.</li>
      <li>Submit early or when time runs out to see results</li>
    </ol>
  </Card>
);

export default HowToCard;
