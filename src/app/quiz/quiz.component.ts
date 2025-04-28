import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizzes: any[] = [];
  newQuiz = {
    title: '',
    questions: []
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.http.get('http://localhost:3000/quizzes').subscribe({
      next: (res: any) => this.quizzes = res,
      error: () => this.showError('Erreur de chargement')
    });
  }

  createQuiz() {
    if (!this.authService.isAuthenticated()) {
      this.showError('Authentification requise');
      return;
    }
    this.http.post('http://localhost:3000/quizzes', this.newQuiz).subscribe({
      next: () => {
        this.loadQuizzes();
        this.newQuiz = { title: '', questions: [] };
        this.showSuccess('Quiz créé');
      },
      error: () => this.showError('Erreur de création')
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Fermer', { duration: 3000, panelClass: ['success-snackbar'] });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Fermer', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}
