export default class utils {
  public static async GetAllResults(iterator) {
    let allResults = []

    let result = await iterator.next()

    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString('utf8')
      let record

      try {
        record = JSON.parse(strValue)
      } catch (err) {
        console.log(err)
        record = strValue
      }

      allResults.push(record)
      result = await iterator.next()
    }

    return allResults
  }
}
