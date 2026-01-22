import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../shared/train.service';
import { ReactiveFormsModule } from '@angular/forms';
import { uniqueTrainNumberValidator } from '../shared/unique-train-number-validator';

@Component({
  selector: 'app-add-trains',
  imports: [ReactiveFormsModule],
  templateUrl: './add-trains.html',
  styleUrl: './add-trains.css',
})
export class AddTrains {
  trainForm!: FormGroup;
  trains: any[] = [];
  coachTypes = ['Sleeper', '3AC', '2AC', '1AC', 'General'];
  constructor(
    private fb: FormBuilder,
    private trainService: TrainService,
  ) {
    this.trainForm = this.fb.group({
      trainName: ['', Validators.required],
      trainNumber: ['', Validators.required, [uniqueTrainNumberValidator(this.trainService)]],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      totalSeats: ['', [Validators.required, Validators.min(1)]],
      coaches: this.fb.array([]),
    });
  }

  get coaches(): FormArray {
    return this.trainForm.get('coaches') as FormArray;
  }

  addTrain() {
    if (this.trainForm.invalid) return;

    this.trainService.addTrain({
      id: Date.now(),
      ...this.trainForm.value,
    } as any);

    alert('Train added successfully 🚆');
    this.trainForm.reset();
    this.coaches.clear();
  }

  loadTrains() {
    this.trains = this.trainService.getTrains();
  }

  deleteTrain(id: number) {
    this.trainService.deleteTrain(id);
    this.loadTrains();
  }
  addCoach() {
    this.coaches.push(
      this.fb.group({
        coachType: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        availableSeats: ['', [Validators.required, Validators.min(0)]],
      }),
    );
  }

  removeCoach(index: number) {
    this.coaches.removeAt(index);
  }
}
