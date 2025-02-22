import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DragDropList from "./DragDropList";
import localforage from "localforage";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function LessonForm({ setLesson }) {
  const initialLessonData = {
    topic: "",
    date: "",
    subject: "",
    gradeLevel: "",
    mainTopic: "",
    subtopics: "",
    outline: [],
    notes: "",
  };

  const [lessonData, setLessonData] = useState(initialLessonData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localforage.getItem("lessonPlan").then((savedLesson) => {
      if (savedLesson) {
        setLessonData({
          ...savedLesson,
          outline: Array.isArray(savedLesson.outline)
            ? savedLesson.outline
            : [],
        });
      }
    });
  }, []);

  const saveToLocalStorage = (data) => {
    localforage.setItem("lessonPlan", data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...lessonData, [name]: value };
    setLessonData(updatedData);
    saveToLocalStorage(updatedData);
  };

  const generateLesson = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `Create a structured lesson plan for the topic "${lessonData.topic}" for Grade ${lessonData.gradeLevel}.
        Include subtopics, a step-by-step outline, and assessments.`
      );
      const response = await result.response;
      setLesson(response.text());

      setLessonData({ ...initialLessonData, outline: [] });
      localforage.removeItem("lessonPlan");
    } catch (error) {
      console.error("Error generating lesson:", error);
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Enter Lesson Details</h2>

      <Input
        name="topic"
        placeholder="Topic"
        value={lessonData.topic}
        onChange={handleChange}
        className="mb-3"
      />
      <div className="border rounded p-4 bg-gray-50 mb-4">
        <h3 className="text-md font-semibold mb-2">Summary</h3>
        <Input
          name="date"
          type="date"
          value={lessonData.date}
          onChange={handleChange}
          className="mb-3"
        />
        <Input
          name="subject"
          placeholder="Subject"
          value={lessonData.subject}
          onChange={handleChange}
          className="mb-3"
        />
        <Input
          name="gradeLevel"
          placeholder="Year Group or Grade Level"
          value={lessonData.gradeLevel}
          onChange={handleChange}
          className="mb-3"
        />
        <Input
          name="mainTopic"
          placeholder="Main Topic or Unit"
          value={lessonData.mainTopic}
          onChange={handleChange}
          className="mb-3"
        />
        <Textarea
          name="subtopics"
          placeholder="Subtopics or Key Concepts"
          value={lessonData.subtopics}
          onChange={handleChange}
          className="mb-3"
        />
      </div>

      <h3 className="text-md font-semibold mt-4">Lesson Outline</h3>
      <DragDropList
        items={lessonData.outline}
        setItems={(newOutline) => {
          setLessonData({ ...lessonData, outline: newOutline });
          saveToLocalStorage({ ...lessonData, outline: newOutline });
        }}
      />

      <h3 className="text-md font-semibold mt-4">Notes</h3>
      <Textarea
        name="notes"
        placeholder="Pre-lesson reminders or post-discussion observations"
        value={lessonData.notes}
        onChange={handleChange}
        className="mb-3"
      />

      <Button
        onClick={generateLesson}
        disabled={loading}
        className="mt-4 bg-blue-500 text-white"
      >
        {loading ? "Generating..." : "Generate Lesson Plan"}
      </Button>
    </Card>
  );
}
