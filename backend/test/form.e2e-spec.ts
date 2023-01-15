import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { FormService } from "../src/form/form.service";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "./../src/app.module";

describe("Form", () => {
  let app: INestApplication;
  const formService = {
    findByPage: () => ({
      data: ["test"],
      total: 1,
    }),
    findOne: () => ({}),
    create: () => ({}),
    edit: () => ({}),
    remove: () => ({}),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FormService)
      .useValue(formService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET forms by pagination`, () => {
    return request(app.getHttpServer())
      .get("/api/form/page/1/10")
      .expect(200)
      .expect({
        statusCode: 200,
        data: formService.findByPage(),
      });
  });

  it(`/GET a form by id`, () => {
    return request(app.getHttpServer()).get("/api/form/1").expect(200).expect({
      statusCode: 200,
      data: formService.findOne(),
    });
  });

  it(`/POST create a form`, () => {
    return request(app.getHttpServer())
      .post("/api/form")
      .send({
        id: -1,
        title: "sss",
        questions: [
          {
            id: -1,
            index: 0,
            type: "checkbox",
            title: "We have created a default title for you, edit it.",
          },
        ],
      })
      .expect(201)
      .expect({
        statusCode: 200,
      });
  });

  it(`/PUT edit a form`, () => {
    return request(app.getHttpServer())
      .put("/api/form")
      .send({
        id: 6,
        title: "sss",
        questions: [
          {
            id: 5,
            index: 0,
            type: "checkbox",
            title: "aaa",
          },
        ],
      })
      .expect(200)
      .expect({
        statusCode: 200,
      });
  });

  it(`/DELETE a form by id`, () => {
    return request(app.getHttpServer())
      .delete("/api/form/1")
      .expect(200)
      .expect({
        statusCode: 200,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
