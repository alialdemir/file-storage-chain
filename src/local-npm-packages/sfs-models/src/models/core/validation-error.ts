import ValidationSeverity from '../../enums/validation-severity'

export default class ValidationError {
  public identifier: string

  public errorMessage: string

  public severity: ValidationSeverity
}
