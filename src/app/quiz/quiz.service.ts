import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000';
  private wsUrl = 'ws://localhost:8081';
  private socket$: WebSocketSubject<any>;

  constructor(private http: HttpClient) {
    this.socket$ = webSocket(this.wsUrl);
  }

  createQuiz(quizData: any) {
    return this.http.post(`${this.apiUrl}/quizzes`, quizData);
  }

  startSession(quizId: string) {
    return this.http.post(`${this.apiUrl}/quizzes/${quizId}/session`, {});
  }

  joinSession(sessionId: string) {
    this.socket$.next({
      action: 'joinQuiz',
      sessionId
    });
  }

  submitAnswer(answerData: any) {
    this.socket$.next({
      action: 'submitAnswer',
      ...answerData
    });
  }

  getRealTimeUpdates() {
    return this.socket$.asObservable();
  }
}
