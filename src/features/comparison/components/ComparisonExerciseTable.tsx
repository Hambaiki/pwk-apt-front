"use client";

import { Button } from "@/components/ui";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";
import { ComparisonItem } from "../types";

interface ComparisonExerciseTableProps {
  exercises: ComparisonItem[];
}

export default function ComparisonExerciseTable({
  exercises,
}: ComparisonExerciseTableProps) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // === PAGE 1: EXERCISE SHEET ===
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Mutation Exercise Sheet", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const instructionY = 32;
    doc.text("Instructions:", 14, instructionY);
    doc.setFontSize(10);
    const instructions = [
      "If the left and the right are the same, select A.",
      "If 1 mistake, select B.",
      "If 2 mistakes, select C.",
      "If 3 mistakes, select D.",
      "If 4 mistakes, select E.",
      "If 5 or more mistakes, select F.",
    ];
    doc.text(instructions, 20, instructionY + 6);

    const tableHead = [
      ["No.", "Before", "After", "A", "B", "C", "D", "E", "F"],
    ];
    const tableBody = exercises.map((ex, idx) => [
      idx + 1,
      ex.base.join(" "),
      ex.mutatedBase.join(" "),
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    autoTable(doc, {
      startY: instructionY + 45,
      head: tableHead,
      body: tableBody,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 2, valign: "middle" },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        halign: "center",
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 45 },
        2: { cellWidth: 45 },
        3: { cellWidth: 10, halign: "center" },
        4: { cellWidth: 10, halign: "center" },
        5: { cellWidth: 10, halign: "center" },
        6: { cellWidth: 10, halign: "center" },
        7: { cellWidth: 10, halign: "center" },
        8: { cellWidth: 10, halign: "center" },
      },
    });

    // === PAGE 2: BLANK ANSWER SHEET ===
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Answer Sheet", 105, 20, { align: "center" });

    const answerHead = [["No.", "Answer"]];
    const answerBody = exercises.map((_, idx) => [idx + 1, ""]);

    autoTable(doc, {
      startY: 30,
      head: answerHead,
      body: answerBody,
      theme: "grid",
      styles: {
        fontSize: 11,
        cellPadding: 3,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [100, 100, 100],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 150 },
      },
    });

    // === PAGE 3: ANSWER KEY ===
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Answer Key", 105, 20, { align: "center" });

    const answerKeyHead = [["No.", "Correct Answer"]];
    const answerKeyBody = exercises.map((ex, idx) => {
      const correct =
        ex.mutationCount === 0
          ? "A"
          : ex.mutationCount === 1
            ? "B"
            : ex.mutationCount === 2
              ? "C"
              : ex.mutationCount === 3
                ? "D"
                : ex.mutationCount === 4
                  ? "E"
                  : "F";
      return [idx + 1, correct];
    });

    autoTable(doc, {
      startY: 30,
      head: answerKeyHead,
      body: answerKeyBody,
      theme: "grid",
      styles: {
        fontSize: 11,
        cellPadding: 3,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [34, 139, 34],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 150 },
      },
    });

    // === PAGE 4+: ANSWER & EXPLANATION SECTION ===
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Answer & Explanation Section", 105, 20, { align: "center" });

    let y = 30;
    exercises.forEach((ex, i) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const correctAnswer =
        ex.mutationCount === 0
          ? "A"
          : ex.mutationCount === 1
            ? "B"
            : ex.mutationCount === 2
              ? "C"
              : ex.mutationCount === 3
                ? "D"
                : ex.mutationCount === 4
                  ? "E"
                  : "F";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(`Question ${i + 1}`, 14, y);
      doc.setFont("helvetica", "italic");
      doc.text(`(${ex.generationType.toUpperCase()})`, 50, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Base:`, 14, y);
      doc.text(ex.base.join(" "), 30, y);
      y += 5;
      doc.text(`Mutated:`, 14, y);
      doc.text(ex.mutatedBase.join(" "), 30, y);
      y += 5;
      doc.text(`Mutation Count: ${ex.mutationCount}`, 14, y);
      y += 5;
      doc.text(`Correct Answer: ${correctAnswer}`, 14, y);
      y += 5;

      if (ex.mutations.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.text("Mutations:", 14, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        ex.mutations.forEach((m, idx) => {
          doc.text(`${idx + 1}. ${m.mutationType}`, 20, y);
          y += 5;
        });
      } else {
        doc.text("No mutation detected.", 14, y);
        y += 5;
      }

      y += 6;
    });

    // === SAVE FILE ===
    doc.save("mutation_exercise.pdf");
  };

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Mutation Exercise Sheet</h1>

        <Button onClick={handleDownloadPDF}>
          <Download size={16} className="mr-2" />
          Download PDF
        </Button>
      </div>

      <p className="mb-6">
        If the left and the right are the same, select <b>A</b>. If 1 mistake,
        select <b>B</b>. If 2 mistakes, select <b>C</b>. If 3 mistakes, select{" "}
        <b>D</b>. If 4 mistakes, select <b>E</b>. If 5 or more mistakes, select{" "}
        <b>F</b>.
      </p>

      <table className="w-full border-collapse border border-gray-300 text-sm mb-10">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">No.</th>
            <th className="border px-2 py-1">Before</th>
            <th className="border px-2 py-1">After</th>
            <th className="border px-2 py-1">A</th>
            <th className="border px-2 py-1">B</th>
            <th className="border px-2 py-1">C</th>
            <th className="border px-2 py-1">D</th>
            <th className="border px-2 py-1">E</th>
            <th className="border px-2 py-1">F</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((ex, i) => (
            <tr key={i}>
              <td className="border px-2 py-1 text-center">{i + 1}</td>
              <td className="border px-2 py-1">{ex.base.join(" ")}</td>
              <td className="border px-2 py-1">{ex.mutatedBase.join(" ")}</td>
              {["A", "B", "C", "D", "E", "F"].map((label, idx) => (
                <td key={idx} className="border px-2 py-1 text-center"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-4">
        Answer & Explanation Section
      </h2>
      <div className="divide-y">
        {exercises.map((ex, i) => (
          <div key={i} className="py-3">
            <h3 className="font-semibold">
              Question {i + 1} — {ex.generationType}
            </h3>
            <p>
              <b>Base:</b> {ex.base.join(" ")}
            </p>
            <p>
              <b>Mutated:</b> {ex.mutatedBase.join(" ")}
            </p>
            <p>
              <b>Mutation Count:</b> {ex.mutationCount}
            </p>
            {ex.mutations.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {ex.mutations.map((m, idx) => (
                  <li key={idx}>{m.mutationType}</li>
                ))}
              </ul>
            ) : (
              <p>No mutation detected.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
