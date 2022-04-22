const useFunctions = () => {
  function getOnlyNumber(string) {
    let numberString = ''
    for (let letter of string) {
      if (isNaN(letter) === false) {
        numberString += letter
      }
    }
    const number = Number(numberString) / 100
    return number
  }

  const dateToJavascriptFormat = (string) => {
    let rawDate = ''
    for (const letter of string) {
      if (letter === '/') {
        rawDate += '-'
      } else {
        rawDate += letter
      }
    }
    const javascriptDate =
      rawDate.split('-')[2] +
      '-' +
      rawDate.split('-')[1] +
      '-' +
      rawDate.split('-')[0]
    return javascriptDate
  }

  return { getOnlyNumber, dateToJavascriptFormat }
}

export default useFunctions
