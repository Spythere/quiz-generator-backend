import { questionStub } from '../tests/stubs/question.stub';

export const QuestionsService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockReturnValue(questionStub()),
  findAll: jest.fn().mockReturnValue([questionStub()]),
  create: jest.fn().mockReturnValue(questionStub()),
  update: jest.fn().mockReturnValue(questionStub()),
  remove: jest.fn().mockReturnValue(null),
});
