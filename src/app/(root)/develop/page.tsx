"use client";

import MainSection from "@/components/content/MainSection";
import { Alert, Badge, Button, Card, TextArea } from "@/components/ui";
import { FormInput, FormSelect, FormSelectOption } from "@/components/ui/form";
import { ComparisonExerciseCard } from "@/features/comparison/components/ComparisonExerciseCard";
import { ComparisonItem } from "@/features/comparison/types";
import { generateComparisonExercise } from "@/features/comparison/utils/generator";
import { Copy, Eye, Layers, Palette, Type, Zap } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ColorShowcasePage() {
  return (
    <MainSection>
      {/* Header */}
      <div className="space-y-6">
        <Card className="p-20 mb-8 rounded-xl bg-linear-to-br from-brand-800 to-brand-600 shadow-medium">
          <h1 className="mb-2 text-white">
            Aptitude Exercise App - Design System
          </h1>
          <p className="text-gray-100">
            Showcase of this application&apos;s configuration
          </p>
        </Card>

        {/* Quick Usage Guide */}
        <UsageGuide />

        {/* Color Palettes */}
        <div className="mb-8">
          {colorPalettes.map((palette) => (
            <ColorPalette
              key={palette.prefix}
              title={palette.title}
              colors={palette.colors}
              prefix={palette.prefix}
            />
          ))}
        </div>

        {/* Background Colors */}
        <BackgroundColor />

        {/* Text Colors */}
        <TextColor />

        {/* Component Examples */}
        <ComponentExamples />

        {/* Typography Examples */}
        <TypographyExamples />

        {/* Shadow Examples */}
        <ShadowExamples />

        {/* Animation Examples */}
        <AnimationExamples />

        {/* Aptitude App UI Preview */}
        <ExerciseUIPreview />

        {/* Custom Made Elements */}
        <ElementExample />

        {/* Test Comparison Exercise */}
        <TestComparisonExercise />
      </div>
    </MainSection>
  );
}

const UsageGuide = () => (
  <div className="bg-info-50 border border-info-200 rounded-xl p-6 mb-8">
    <h2 className="text-lg font-semibold text-info-800 mb-3 flex items-center gap-2">
      <Eye className="w-5 h-5" />
      Quick Usage Guide
    </h2>
    <div className="text-info-700 space-y-2 text-sm">
      <p>• Click any color swatch to copy its Tailwind class name</p>
      <p>
        • Use <code className="bg-info-100 px-1 rounded">bg-brand-500</code> for
        backgrounds,{" "}
        <code className="bg-info-100 px-1 rounded">text-brand-500</code> for
        text
      </p>
      <p>
        • Combine with hover states:{" "}
        <code className="bg-info-100 px-1 rounded">hover:bg-brand-600</code>
      </p>
      <p>
        • All colors include 50-900 shade variations for maximum flexibility
      </p>
    </div>
  </div>
);

const TextColor = () => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <Type className="w-5 h-5" />
      Text Colors
    </h3>
    <div className="space-y-3">
      <div className="text-text-primary text-lg font-semibold">
        Primary Text (text-text-primary) - Main content
      </div>
      <div className="text-text-secondary text-base">
        Secondary Text (text-text-secondary) - Supporting content
      </div>
      <div className="text-text-tertiary text-sm">
        Tertiary Text (text-text-tertiary) - Metadata and captions
      </div>
      <div className="bg-gray-800 p-3 rounded">
        <div className="text-text-inverse">
          Inverse Text (text-text-inverse) - For dark backgrounds
        </div>
      </div>
    </div>
  </div>
);

const colorPalettes = [
  {
    title: "Primary (Blue)",
    prefix: "bg-primary",
    colors: {
      50: "#f2f5f8",
      100: "#e6ebf2",
      200: "#bfcdde",
      300: "#99aec8",
      400: "#4d72a2",
      500: "#00357a",
      600: "#00306e",
      700: "#002049",
      800: "#001837",
      900: "#001025",
    },
  },
  {
    title: "Secondary (Slate)",
    prefix: "bg-secondary",
    colors: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  },
  {
    title: "Success (Emerald)",
    prefix: "bg-success",
    colors: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
    },
  },
  {
    title: "Warning (Orange)",
    prefix: "bg-warning",
    colors: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
    },
  },
  {
    title: "Error (Red)",
    prefix: "bg-error",
    colors: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
  },
  {
    title: "Info (Sky)",
    prefix: "bg-info",
    colors: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
  },
];

const BackgroundColor = () => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <Layers className="w-5 h-5" />
      Background Colors
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-surface border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
        <div className="font-medium">Primary Background</div>
        <div className="text-sm text-gray-500 mt-1">bg-surface</div>
        <div className="text-xs font-mono mt-2">#ffffff</div>
      </div>
      <div className="bg-surface border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
        <div className="font-medium">Secondary Background</div>
        <div className="text-sm text-gray-500 mt-1">bg-surface</div>
        <div className="text-xs font-mono mt-2">#f8fafc</div>
      </div>
      <div className="bg-surface border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
        <div className="font-medium">Tertiary Background</div>
        <div className="text-sm text-gray-500 mt-1">bg-surface</div>
        <div className="text-xs font-mono mt-2">#f1f5f9</div>
      </div>
    </div>
  </div>
);

const ColorPalette = ({
  title,
  colors,
  prefix,
}: {
  title: string;
  colors: Record<string, string>;
  prefix: string;
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast(
      <div className="text-sm">
        <span className="font-semibold">
          <Palette className="inline w-5 h-5 mr-1" />
          Text copied to clipboard:
        </span>
        <br />
        {text}
      </div>,
    );
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5" />
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
        {Object.entries(colors).map(([shade, color]) => (
          <div key={shade} className="text-center">
            <button
              className={`group w-full h-16 rounded-lg mb-2 cursor-pointer transition-transform hover:scale-105 border border-gray-200`}
              style={{ backgroundColor: color }}
              onClick={() => copyToClipboard(`${prefix}-${shade}`)}
              title={`Click to copy: ${prefix}-${shade}`}
            >
              <Copy className="w-4 h-4 text-gray-500 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="text-xs font-mono text-gray-600">{shade}</div>
            <div className="text-xs text-gray-500 mt-1">{color}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComponentExamples = () => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
      <Layers className="w-5 h-5" />
      Component Examples
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Primary Buttons */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Primary Buttons</h4>
        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors">
          Start Exercise
        </button>
        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors">
          Submit Answer
        </button>
      </div>

      {/* Status Messages */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Status Messages</h4>
        <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-2 rounded-lg">
          ✓ Correct Answer!
        </div>
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-2 rounded-lg">
          ✗ Incorrect Answer
        </div>
        <div className="bg-warning-50 border border-warning-200 text-warning-700 px-4 py-2 rounded-lg">
          ⚠ Time Running Out
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Cards</h4>
        <div className="bg-surface border border-secondary-200 p-4 rounded-lg shadow-soft">
          <h5 className="font-medium text-text-primary">Question 1</h5>
          <p className="text-text-secondary text-sm mt-1">
            Sample question content
          </p>
        </div>
      </div>
    </div>
  </div>
);

const TypographyExamples = () => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
      <Type className="w-5 h-5" />
      Typography Examples
    </h3>

    <div className="space-y-4">
      <div className="text-text-primary text-4xl font-bold">Main Heading</div>
      <div className="text-text-primary text-2xl font-semibold">
        Section Heading
      </div>
      <div className="text-text-primary text-xl font-medium">Subsection</div>
      <div className="text-text-primary text-base">
        Body text for questions and content
      </div>
      <div className="text-text-secondary text-sm">
        Secondary text for descriptions
      </div>
      <div className="text-text-tertiary text-xs">
        Tertiary text for metadata
      </div>
    </div>
  </div>
);

const ShadowExamples = () => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
      <Layers className="w-5 h-5" />
      Shadow Examples
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100">
        <h4 className="font-medium mb-2">Soft Shadow</h4>
        <p className="text-sm text-gray-600">shadow-soft</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-medium border border-gray-100">
        <h4 className="font-medium mb-2">Medium Shadow</h4>
        <p className="text-sm text-gray-600">shadow-medium</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-strong border border-gray-100">
        <h4 className="font-medium mb-2">Strong Shadow</h4>
        <p className="text-sm text-gray-600">shadow-strong</p>
      </div>
    </div>
  </div>
);

const AnimationExamples = () => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
      <Zap className="w-5 h-5" />
      Animation Examples
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-brand-50 p-6 rounded-lg animate-fade-in">
        <h4 className="font-medium mb-2">Fade In</h4>
        <p className="text-sm text-gray-600">animate-fade-in</p>
      </div>
      <div className="bg-success-50 p-6 rounded-lg animate-slide-up">
        <h4 className="font-medium mb-2">Slide Up</h4>
        <p className="text-sm text-gray-600">animate-slide-up</p>
      </div>
      <div className="bg-warning-50 p-6 rounded-lg animate-bounce-subtle">
        <h4 className="font-medium mb-2">Bounce Subtle</h4>
        <p className="text-sm text-gray-600">animate-bounce-subtle</p>
      </div>
    </div>
  </div>
);

const ExerciseUIPreview = () => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
      <Eye className="w-5 h-5" />
      Aptitude App UI Preview
    </h3>

    <div className="bg-surface rounded-lg p-6 border border-secondary-200">
      {/* Mock header */}
      <div className="bg-brand-500 text-white p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg text-white font-semibold">
            Mathematical Reasoning
          </h4>
          <div className="bg-brand-600 px-3 py-1 rounded text-sm">
            Question 5/20
          </div>
        </div>
        <div className="bg-brand-400 h-2 rounded-full mt-3">
          <div className="bg-white h-full w-1/4 rounded-full"></div>
        </div>
      </div>

      {/* Mock question */}
      <div className="bg-white p-6 rounded-lg shadow-soft mb-4">
        <h5 className="text-text-primary font-medium mb-3">
          If a train travels 120 km in 2 hours, what is its average speed?
        </h5>
        <div className="space-y-2">
          <button className="w-full text-left p-3 border border-secondary-200 rounded hover:bg-brand-50 hover:border-brand-300 transition-colors">
            A) 50 km/h
          </button>
          <button className="w-full text-left p-3 border border-secondary-200 rounded hover:bg-brand-50 hover:border-brand-300 transition-colors">
            B) 60 km/h
          </button>
          <button className="w-full text-left p-3 border border-secondary-200 rounded hover:bg-brand-50 hover:border-brand-300 transition-colors">
            C) 70 km/h
          </button>
        </div>
      </div>

      {/* Mock feedback */}
      <div className="bg-success-50 border border-success-200 text-success-700 p-4 rounded-lg mb-4">
        ✓ Correct! The average speed is 60 km/h (120 km ÷ 2 hours = 60 km/h)
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors">
          Next Question
        </button>
        <button className="bg-secondary-100 hover:bg-secondary-200 text-secondary-700 px-4 py-2 rounded-lg transition-colors">
          Review Answer
        </button>
      </div>
    </div>
  </div>
);

const ElementExample = () => {
  return (
    <div className="mb-8 space-y-8">
      <h2>UI Preview</h2>

      {/* Buttons */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex gap-4 mt-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Inputs</h3>
        <div className="space-y-4 max-w-md">
          <FormInput placeholder="Text input" />
          <FormSelect>
            <FormSelectOption value="A">Option A</FormSelectOption>
            <FormSelectOption value="B">Option B</FormSelectOption>
          </FormSelect>
          <TextArea placeholder="Write something..." />
        </div>
      </section>

      {/* Badges */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
          <Badge color="info">Info</Badge>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <Card>
            <p className="font-semibold mb-2">Default Card</p>
            <p className="text-text-secondary">
              This is a simple card with default styling.
            </p>
          </Card>
          <Card variant="outlined">
            <p className="font-semibold mb-2">Outlined Card</p>
            <p className="text-text-secondary">
              This card uses the outlined variant.
            </p>
          </Card>
          <Card className="rounded-xl shadow-strong border-info-500 bg-info-50">
            <p className="font-semibold mb-2 text-info-800">Customized Card</p>
            <p className="text-info-500">
              This card uses the customized styling.
            </p>
          </Card>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Alerts</h3>
        <div className="space-y-4 max-w-2xl">
          <Alert
            type="info"
            title="Information"
            message="This is an info alert."
          />
          <Alert
            type="success"
            title="Success"
            message="Well done! You completed the task."
          />
          <Alert
            type="warning"
            title="Warning"
            message="Be careful! This needs your attention."
          />
          <Alert
            type="error"
            title="Error"
            message="Something went wrong. Please try again."
          />
        </div>
      </section>
    </div>
  );
};

enum Choice {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

const comparisonAnswers = {
  [Choice.A]: {
    description: "No mutations",
    check: (count: number) => count === 0,
  },
  [Choice.B]: {
    description: "One mutation",
    check: (count: number) => count === 1,
  },
  [Choice.C]: {
    description: "Two mutations",
    check: (count: number) => count === 2,
  },
  [Choice.D]: {
    description: "Three mutations",
    check: (count: number) => count === 3,
  },
  [Choice.E]: {
    description: "Four mutations",
    check: (count: number) => count === 4,
  },
  [Choice.F]: {
    description: "Five or more mutations",
    check: (count: number) => count >= 5,
  },
};

const TestComparisonExercise = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questionList, setQuestionList] = useState<
    { question: ComparisonItem; answer: Choice | undefined }[] | undefined
  >();
  const [complete, setComplete] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setComplete(false);
    setQuestionIndex(0);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const count = parseInt(formData.get("count") as string);
    const length = parseInt(formData.get("length") as string);

    const questions = generateComparisonExercise({
      count: count ?? 1,
      length: length ?? 1,
    });

    setQuestionList(questions.map((q) => ({ question: q, answer: undefined })));
  };

  return (
    <div className="mb-8 space-y-8">
      <h2>Test Comparison Exercise</h2>
      <p>This is a test comparison exercise component.</p>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label>
            Count
            <FormInput name="count" type="number" />
          </label>
          <label>
            Length
            <FormInput name="length" type="number" />
          </label>
          <Button>Generate Questions</Button>
        </form>
      </Card>

      {!complete && questionList && questionList.length > 0 && (
        <ComparisonExerciseCard
          progress={questionIndex / questionList.length}
          exercise={questionList[questionIndex].question}
          selected={questionList[questionIndex].answer}
          hasNext={questionIndex < questionList.length - 1}
          hasPrevious={questionIndex > 0}
          isLast={questionIndex === questionList.length - 1}
          onNext={() => {
            if (questionIndex === questionList.length - 1) {
              setComplete(true);
              return;
            }
            setQuestionIndex((prev) =>
              Math.min(prev + 1, questionList.length - 1),
            );
          }}
          onPrevious={() => {
            setQuestionIndex((prev) => Math.max(prev - 1, 0));
          }}
          onAnswer={(choice) => {
            setQuestionList((prev) => {
              if (!prev) return prev;
              const newList = [...prev];
              newList[questionIndex].answer = choice as Choice;
              return newList;
            });
          }}
        />
      )}

      {complete && questionList && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Results</h3>
          <p className="text-sm text-muted-foreground">
            Here’s how you did in this exercise:
          </p>

          <Card className="p-4 space-y-4">
            {questionList.map((item, index) => {
              const question = item.question;
              const answer = item.answer;
              const correct = answer
                ? comparisonAnswers[answer]?.check(question?.mutationCount ?? 0)
                : false;

              return (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 border rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">Question {index + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      Your answer:{" "}
                      <span className="font-semibold">
                        {answer ?? "<no answer>"}
                      </span>
                    </p>
                    {answer
                      ? comparisonAnswers[answer] && (
                          <p className="text-sm text-muted-foreground">
                            {comparisonAnswers[answer].description}
                          </p>
                        )
                      : null}
                    <p className="text-sm text-muted-foreground">
                      Mutations in total:{" "}
                      <span className="font-semibold">
                        {question?.mutationCount}
                      </span>
                    </p>
                  </div>

                  <div>
                    {correct ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                        Incorrect
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => {
                setComplete(false);
                setQuestionIndex((prev) => Math.max(prev, 0));
              }}
            >
              Back
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setComplete(false);
                setQuestionIndex(0);
                setQuestionList(undefined);
              }}
            >
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
