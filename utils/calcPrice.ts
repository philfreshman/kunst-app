export function calcPrice(startDate: string | any, endDate: string | any, price: number | any) {
  if (typeof startDate !== "string" || typeof endDate !== "string") return "Date??"
  if (typeof price !== "number" || price === 0) return "Price??"

  const start = new Date(startDate)
  const end = new Date(endDate)

  const diffDays = getDaysDifference(start, end) + 1
  const sundays = countSundays(start, end)

  const days = diffDays - sundays
  let result = 0

  if (days === 0 || price === 0) return ""

  if (days <= 6) {
    result = firstWeekPrice(days, price)
  } else if (days > 6 && days <= 12) {
    const firstWeek = firstWeekPrice(6, price)
    const secondWeek = secondWeekPrice(days - 6, price)
    result = firstWeek + secondWeek
  } else if (days > 12) {
    const firstWeek = firstWeekPrice(6, price)
    const secondWeek = secondWeekPrice(6, price)
    const thirdWeek = thirdWeekPrice(days - 12, price)
    result = firstWeek + secondWeek + thirdWeek
  }

  function firstWeekPrice(days, price) {
    return ((price * 0.1) / 6) * days
  }

  function secondWeekPrice(days, price) {
    return ((price * 0.05) / 6) * days
  }

  function thirdWeekPrice(days, price) {
    return ((price * 0.025) / 6) * days
  }

  function truncate(num) {
    // rounds up to the nearest whole number
    return Math.ceil(num)
  }

  return truncate(result)
}

function countSundays(startDate, endDate): number {
  let count = 0
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    if (currentDate.getDay() === 0) {
      // 0 represents Sunday
      count++
    }
    currentDate.setDate(currentDate.getDate() + 1) // Move to the next day
  }

  return count
}

function getDaysDifference(date1, date2): number {
  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(date2 - date1)

  // Convert milliseconds to days
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
}