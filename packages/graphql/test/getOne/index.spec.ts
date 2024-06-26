import gql from "graphql-tag";
import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("useOne", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).getOne({
      resource: "posts",
      id: "45",
      meta: {
        fields: ["id", "title", "content", { category: ["id"] }],
      },
    });

    expect(data.id).toEqual("45");
    expect(data.title).toEqual("foo");
    expect(data.content).toEqual("bar");
    expect(data.category.id).toEqual("2");
  });
});

describe("useOne gql", () => {
  it("correct response with meta", async () => {
    const { data } = await dataProvider(client).getOne({
      resource: "posts",
      id: "6200",
      meta: {
        gqlQuery: gql`
          query ($id: ID!) {
            post (id: $id) {
              id
              title
              content
              category {
                id
              }
            }
          }
        `,
      },
    });

    expect(data.id).toEqual("6200");
    expect(data.title).toEqual("test");
    expect(data.content).toEqual("test");
    expect(data.category.id).toEqual("15");
  });
});
