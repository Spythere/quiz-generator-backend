import { Test, TestingModule } from '@nestjs/testing';
import { Question } from '@prisma/client';
import { QuestionsController } from '../questions.controller';
import { QuestionsService } from '../questions.service';
import { questionStub } from './stubs/question.stub';

jest.mock('../questions.service');

describe('QuestionsController', () => {
  let controller: QuestionsController;
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
    service = module.get<QuestionsService>(QuestionsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find one question', () => {
    describe('when findOne is called', () => {
      let question: Question;

      beforeEach(async () => {
        question = await controller.findOne(questionStub().id);
      });

      test('should call questionsService', () => {
        expect(service.findOne).toBeCalledWith(questionStub().id);
      });

      test('should return a question', () => {
        expect(question).toEqual(questionStub());
      });
    });
  });
});
