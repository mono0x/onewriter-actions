// https://1writerapp.com/actiondir/action/4f0e3
const [start, end] = editor.getSelectedLineRange()

let eol = start + end
if (editor.getTextInRange(eol - 1, 1) === '\n') {
    eol = eol - 1
}

editor.setSelectedRange(start, eol - start)
