import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [FormsModule, NgIf],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {
  feedbackText = '';
  feedbackSuccess = false;
  constructor(private router: Router) {}
  addFeedback() {
    if (this.feedbackText.trim()) {
      const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      feedbacks.unshift({
        text: this.feedbackText,
        date: new Date().toISOString(),
      });
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
      this.feedbackText = '';
      this.feedbackSuccess = true;
      setTimeout(() => (this.feedbackSuccess = false), 2000);
    }
  }
  goback() {
    this.router.navigate(['/products']);
  }
}
