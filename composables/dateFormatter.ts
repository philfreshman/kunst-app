export default function useDateFormatter(row: Offer | Invoice) {
    return new Date(row.Date).toLocaleDateString('de-DE') // 01.01.0001
}