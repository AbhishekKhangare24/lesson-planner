import { useRef } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LessonPreview({ lesson }) {
  const previewRef = useRef(null);

  const handleDownloadPDF = () => {
    if (!previewRef.current) return alert("Nothing to print!");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    let y = 10; // Starting Y position

    // Split text into lines based on A4 width
    const text = previewRef.current.innerText;
    const lines = pdf.splitTextToSize(text, 180); // 180mm width for text wrapping

    lines.forEach((line, index) => {
      if (y > 280) {
        pdf.addPage();
        y = 10;
      }
      pdf.text(line, 10, y);
      y += 7; // Adjust spacing for new lines
    });

    pdf.save(`lesson-${Date.now()}.pdf`);
  };

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Lesson Preview</h2>

      <div
        ref={previewRef}
        className="border p-4 rounded bg-white text-black min-h-[300px] max-w-[700px] mx-auto whitespace-pre-wrap"
      >
        {lesson || "No lesson data available"}
      </div>

      <Button
        onClick={handleDownloadPDF}
        className="mt-4 bg-blue-600 text-white px-4 py-2"
      >
        Download PDF
      </Button>
    </Card>
  );
}
