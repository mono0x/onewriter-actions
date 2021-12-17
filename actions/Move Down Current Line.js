const [start, end] = editor.getSelectedLineRange()
const currentLine = editor.getTextInRange(start, end)

const text = editor.getText()

const nextStart = end + 1
if (nextStart < text.length) {
    let nextEnd = text.indexOf('\n', nextStart)
    if (nextEnd === -1) {
        nextEnd = text.length
    }
    const nextLine = editor.getTextInRange(nextStart, nextEnd)
    editor.replaceTextInRange(start, nextEnd, `${nextLine}\n${currentLine}`)
}
