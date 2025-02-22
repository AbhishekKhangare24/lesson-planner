import { useState } from "react";
import LessonForm from "../components/LessonForm";
import LessonPreview from "../components/LessonPreview";

export default function LessonPlanner() {
  const [lesson, setLesson] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonForm setLesson={setLesson} />
      {lesson && <LessonPreview lesson={lesson} />}
    </div>
  );
}
