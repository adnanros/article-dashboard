// src/services/api.ts
import { createServer, Model } from "miragejs";
import { Response } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      article: Model,
    },

    seeds(server) {
      server.create("article", {
        id: "1", 
        title: "Example Article",
        status: "Published",
        author: "Jane Doe",
        createdAt: "2024-05-01T12:00:00Z",
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/articles", (schema) => {
        return schema.all("article");
      });

      this.post("/articles", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("article", { ...attrs, id: String(Date.now()) });
      });

      this.put("/articles/:id", (schema, request) => {
  const attrs = JSON.parse(request.requestBody);
  const id = request.params.id;

  const article = schema.find("article", id);
  if (!article) {
    
    return new Response(404, {}, { error: "Not found" });
  }

  const updated = article.update(attrs);
  return updated; 
});

      this.delete("/articles/:id", (schema, request) => {
        const id = request.params.id;
        const article = schema.find("article", id);
        article?.destroy();
        return { message: "Deleted" }; // return something
      });
    },
  });
}
