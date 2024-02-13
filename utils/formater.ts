export const textWithLineBreaks = (input: string): string => {
  return input.replace(/\n/g, "<br/>")
}

export const formatArtwork = (artwork: ArtworkLight): string => {
  return `${artwork.article_id} | ${artwork.name} | ${artwork.title}`
}

export const formatSnapshot = (snapshot_type: snapshotType): string => {
  const formats = {
    offer: "ANGEBOT",
    invoice: "RECHNUNG"
  }
  return formats[snapshot_type] || "Unknown"
}
