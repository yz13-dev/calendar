


export const getWeek = (date: Date) => {
  const firstDateOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1)
  const lastDateOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7)

  return {
    start: firstDateOfWeek,
    end: lastDateOfWeek
  }
}
