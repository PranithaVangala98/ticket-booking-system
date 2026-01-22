import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TrainService } from './train.service';

export function uniqueTrainNumberValidator(trainService: TrainService) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const exists = trainService.isTrainNumberExists(control.value);
    return exists ? { trainNumberExists: true } : null;
  };
}
