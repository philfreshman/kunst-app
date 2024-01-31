export default function limitTextarea(e: any) {
  const value = e.target.value
  const newLines = value.match(/\n/g)

  if (newLines && newLines.length >= 4) {
    const lines = value.split("\n")
    e.target.value = lines.slice(0, 4).join("\n")
  }
}
