import { prisma, Question } from '@prisma/client';

export const questionStub = (): Partial<Question> => ({
  id: '62a23958e5a9e9b88f853a67',
  answers: ['A', 'B', 'C', 'D'],
  authorId: '0',
  correctAnswerIndex: 0,
  sectionIds: [],
  title: 'Test Question',
});
