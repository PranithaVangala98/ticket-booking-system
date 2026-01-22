import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  train: any;
  seats = 1;
  showConfirm = false;
  showConfirmPopup = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const trainId = Number(this.route.snapshot.paramMap.get('trainId'));

    const trains = JSON.parse(localStorage.getItem('trains') || '[]');
    this.train = trains.find((t: any) => t.id === trainId);

    if (!this.train) {
      alert('Train not found');
      this.router.navigate(['/dashboard']);
    }
  }

  proceed() {
    if (this.seats <= 0 || this.seats > this.train.totalSeats) {
      alert('Invalid seat count');
      return;
    }
    this.showConfirm = true;
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  confirmBooking() {
    // 1️⃣ Save booking
    const booking = {
      bookingId: Date.now(),
      username: localStorage.getItem('username'),
      trainId: this.train.id,
      trainName: this.train.trainName,
      seatsBooked: this.seats,
      bookingDate: new Date().toLocaleString(),
    };

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // 2️⃣ Update train seats
    const trains = JSON.parse(localStorage.getItem('trains') || '[]').map((t: any) =>
      t.id === this.train.id ? { ...t, totalSeats: t.totalSeats - this.seats } : t,
    );

    localStorage.setItem('trains', JSON.stringify(trains));

    this.showConfirmPopup = false;
    this.router.navigate(['/dashboard']);
  }
}
