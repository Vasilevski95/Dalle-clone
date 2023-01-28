import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);
  //To check if we get same random prompt twice or three times in a row
  //To avoid that we put if statement and recall getRandomPrompt()

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
