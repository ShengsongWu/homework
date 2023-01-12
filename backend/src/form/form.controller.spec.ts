import { Test, TestingModule } from "@nestjs/testing";
import { FormController } from "./form.controller";
import { FormService } from "./form.service";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Form } from "./form.entity";
import { Question } from "../question/question.entity";
import { QuestionModule } from "../question/question.module";
import { Repository, DataSource } from "typeorm";
import { QuestionService } from "../question/question.service";

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((m) => m),
  count: jest.fn((m) => m),
  createQueryBuilder: jest.fn((m) => m),
}));
export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    createQueryRunner: jest.fn(),
  })
);

describe("FormController", () => {
  let formController: FormController;
  let formService: FormService;
  let formRepositoryMock: MockType<Repository<Form>>;
  let questionRepositoryMock: MockType<Repository<Question>>;
  let dataSourceMock: MockType<DataSource>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [FormController],
      providers: [
        FormService,
        QuestionService,
        {
          provide: getRepositoryToken(Form),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Question),
          useFactory: repositoryMockFactory,
        },
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();

    formController = app.get<FormController>(FormController);
    formService = app.get<FormService>(FormService);
    formRepositoryMock = app.get(getRepositoryToken(Form));
    questionRepositoryMock = app.get(getRepositoryToken(Question));
    dataSourceMock = app.get(DataSource);
  });

  describe("list", () => {
    it("should return a list", async () => {
      const mock = Promise.resolve({
        data: [{} as any],
        total: 1,
      });
      jest.spyOn(formService, "findByPage").mockImplementation(() => mock);

      const result = await formController.list(1, 1);

      expect(result.statusCode).toBe(200);
      expect(result.data.total).toBe(1);
    });

    it("wrong params", async () => {
      const mock = Promise.reject();
      jest.spyOn(formService, "findByPage").mockImplementation(() => mock);

      try {
        await formController.list(0, 1);
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });
  });

  describe("create", () => {
    it("should succeed", async () => {
      const mock = Promise.resolve();
      jest.spyOn(formService, "create").mockImplementation(() => mock);

      const result = await formController.create({} as any);

      expect(result.statusCode).toBe(200);
    });
  });

  describe("edit", () => {
    it("should succeed", async () => {
      const mock = Promise.resolve();
      jest.spyOn(formService, "edit").mockImplementation(() => mock);

      const result = await formController.edit({} as any);

      expect(result.statusCode).toBe(200);
    });
  });

  describe("delete", () => {
    it("should succeed", async () => {
      const mock = Promise.resolve();
      jest.spyOn(formService, "remove").mockImplementation(() => mock);

      const result = await formController.delete({} as any);

      expect(result.statusCode).toBe(200);
    });
  });
});
