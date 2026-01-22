import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../shared/train.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-trains',
  imports: [ReactiveFormsModule],
  templateUrl: './add-trains.html',
  styleUrl: './add-trains.css',
})
export class AddTrains {
  trainForm!: FormGroup;
  trains: any[] = [];

  constructor(
    private fb: FormBuilder,
    private trainService: TrainService,
  ) {
    this.trainForm = this.fb.group({
      trainName: ['', Validators.required],
      trainNumber: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      totalSeats: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addTrain() {
    if (this.trainForm.invalid) return;

    this.trainService.addTrain({
      id: Date.now(),
      ...this.trainForm.value,
    } as any);

    alert('Train added successfully 🚆');
    this.trainForm.reset();
  }

  loadTrains() {
    this.trains = this.trainService.getTrains();
  }

  deleteTrain(id: number) {
    this.trainService.deleteTrain(id);
    this.loadTrains();
  }
}
