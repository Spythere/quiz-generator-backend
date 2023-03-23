import { Question } from '@prisma/client';

export const questionStub = (): Partial<Question> => ({
  id: 1,
  answers: ['A', 'B', 'C', 'D'],
  authorId: 0,
  correctAnswerIndex: 0,
  title: 'Test Question',
});
