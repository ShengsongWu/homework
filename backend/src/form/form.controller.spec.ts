import { Test, TestingModule } from "@nestjs/testing";
import { FormController } from "./form.controller";
import { FormService } from "./form.service";

describe("AppController", () => {
  let formController: FormController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FormController],
      providers: [FormService],
    }).compile();

    formController = app.get<FormController>(FormController);
  });

  describe("list", () => {
    it("should return a list", async () => {
      const result = await formController.list(1, 1);
      expect(result.statusCode).toBe(200);
      expect(result.data?.length).toBe(0);
    });
  });
});
