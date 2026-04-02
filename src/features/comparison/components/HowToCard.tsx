import { Card } from "@/components/ui";

export default function HowToCard() {
  return (
    <Card variant="info" className="space-y-4">
      <ol className="list-decimal list-inside space-y-3">
        <li>
          You will see two sequences side by side: <strong>Left</strong> and{" "}
          <strong>Right</strong>.
        </li>
        <li>
          Your task is to determine how many differences (mutations) exist
          between them.
        </li>
        <li>
          Select one of the options from <strong>A</strong> to{" "}
          <strong>F</strong>:
          <ul className="list-disc list-inside ml-5 mt-1">
            <li>A: Both sequences are the same</li>
            <li>B: 1 difference</li>
            <li>C: 2 differences</li>
            <li>D: 3 differences</li>
            <li>E: 4 differences</li>
            <li>F: 5 or more differences</li>
          </ul>
        </li>
        <li>
          Use the <strong>Next</strong> and <strong>Previous</strong> buttons to
          navigate through questions.
        </li>
        <li>
          At the end, you will see your results and the correct answers with
          explanations.
        </li>
      </ol>
    </Card>
  );
}
