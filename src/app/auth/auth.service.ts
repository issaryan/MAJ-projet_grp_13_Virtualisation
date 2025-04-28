import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private authState = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.checkAuthState();
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData).pipe(
      tap(() => {
        this.showMessage('Registration successful');
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email, password: 'TEST' }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authState.next(true);
        this.router.navigate(['/']);
        this.showMessage('Login successful');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authState.next(false);
    this.router.navigate(['/login']);
    this.showMessage('Logged out');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private checkAuthState(): void {
    this.authState.next(this.isAuthenticated());
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
