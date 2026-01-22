import { Component } from '@angular/core';
import { TrainService } from '../shared/train.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  trains: any[] = [];
  filteredTrains: any[] = [];
  selectedTrain: any = null;
  seats = 1;
  showConfirm = false;
  source = '';
  destination = '';

  constructor(
    private trainService: TrainService,
    private router: Router,
  ) {}

  ngOnInit() {}

  searchTrains() {
    this.trains = this.trainService.getTrains();
    this.filteredTrains = this.trains;
    this.filteredTrains = this.trains.filter(
      (train) =>
        train.source.toLowerCase().includes(this.source.toLowerCase()) &&
        train.destination.toLowerCase().includes(this.destination.toLowerCase()),
    );
  }

  clearSearch() {
    this.source = '';
    this.destination = '';
    this.filteredTrains = this.trains;
  }
  openBooking(train: any) {
    this.selectedTrain = { ...train };
    this.seats = 1;
  }

  cancelBooking() {
    this.selectedTrain = null;
    this.showConfirm = false;
  }

  proceedToConfirm() {
    if (this.seats <= 0 || this.seats > this.selectedTrain.totalSeats) {
      alert('Invalid seat count');
      return;
    }
    this.showConfirm = true;
  }

  confirmBooking() {
    // 1️⃣ Create booking
    const booking = {
      bookingId: Date.now(),
      username: localStorage.getItem('username') || 'user',
      trainId: this.selectedTrain.id,
      trainName: this.selectedTrain.trainName,
      seatsBooked: this.seats,
      bookingDate: new Date().toLocaleString(),
    };

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // 2️⃣ Update train seats
    const trains = JSON.parse(localStorage.getItem('trains') || '[]');
    const updatedTrains = trains.map((t: any) => {
      if (t.id === this.selectedTrain.id) {
        return { ...t, totalSeats: t.totalSeats - this.seats };
      }
      return t;
    });

    localStorage.setItem('trains', JSON.stringify(updatedTrains));

    alert('🎉 Booking Confirmed Successfully!');

    // Reset UI
    this.selectedTrain = null;
    this.showConfirm = false;
    this.loadTrains();
  }

  loadTrains() {
    this.trains = JSON.parse(localStorage.getItem('trains') || '[]');
    this.filteredTrains = this.trains;
  }
  bookTrain(trainId: number) {
    this.router.navigate(['/booking', trainId]);
  }
}
