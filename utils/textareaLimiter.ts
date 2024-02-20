// limits the number of lines in a textarea to 4
export default function limitTextarea(e: any) {
  const maxLines = 4
  const value = e.target.value
  const newLines = value.match(/\n/g)

  if (newLines && newLines.length >= maxLines) {
    const lines = value.split("\n")
    e.target.value = lines.slice(0, maxLines).join("\n")
  }
}