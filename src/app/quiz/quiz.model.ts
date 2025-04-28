export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdBy: string;
  createdAt: string;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}
