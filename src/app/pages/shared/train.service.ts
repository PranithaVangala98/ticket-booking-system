import { Injectable } from '@angular/core';
import { Train } from './train.model';

@Injectable({ providedIn: 'root' })
export class TrainService {
  private key = 'trains';

  getTrains(): Train[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  addTrain(train: Train): void {
    const trains = this.getTrains();
    trains.push(train);
    localStorage.setItem(this.key, JSON.stringify(trains));
  }

  deleteTrain(id: number): void {
    const updated = this.getTrains().filter((t) => t.id !== id);
    localStorage.setItem(this.key, JSON.stringify(updated));
  }

  clearTrains(): void {
    localStorage.removeItem(this.key);
  }
}
