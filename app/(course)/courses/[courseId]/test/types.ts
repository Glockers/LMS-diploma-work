export type TestResult = {
  questionId: number;
  usetInput: number;
};

export type Question = {
  question: string;
  answer: number;
  options: string[];
};

export type TestOption = {
  timeStart: Date;
  course: any;
  isCompleted: boolean;
  userId: string;
  passedTest: any;
};
