declare namespace App {
  type IDataType =
    | 'Object'
    | 'Array'
    | 'Number'
    | 'String'
    | 'Function'
    | 'Boolean'
    | 'Null'
    | 'Undefined'
    | 'Symbol'
    | 'BigInt'

  interface IFieldListType {
    field: string
    types: App.IDataType[]
    isOptional?: boolean
  }
}
