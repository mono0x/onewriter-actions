const [start, end] = editor.getSelectedLineRange();
const currentLine = editor.getTextInRange(start, end);

const text = editor.getText();

const prevEnd = start - 1;
if (prevEnd > 0) {
  let prevStart = text.lastIndexOf("\n", prevEnd - 1);
  if (prevStart === -1) {
    prevStart = 0;
  } else {
    prevStart += 1;
  }
  const prevLine = editor.getTextInRange(prevStart, prevEnd);
  editor.replaceTextInRange(prevStart, end, `${currentLine}\n${prevLine}`);
  editor.setSelectedRange(prevStart);
}
