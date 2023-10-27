export default function isEnum(value: unknown, entity: any): boolean {
  const enumValues = Object.keys(entity).map((k) => entity[k])
  return enumValues.indexOf(value) >= 0
}
