import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "ru");

export type LessonContent = {
  title: string;
  description?: string;
  body: string;
};

export function loadLessonMarkdown(relativeFile: string): LessonContent {
  const fullPath = path.join(contentDir, relativeFile);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    title: (data.title as string) ?? "",
    description: data.description as string | undefined,
    body: content,
  };
}
