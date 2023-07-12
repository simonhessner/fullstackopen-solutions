const user1 = {
  name: "Test person",
  username: "testuser",
  password: "passwd",
};

const user2 = {
  name: "Test person 2",
  username: "testuser2",
  password: "password2",
};

const testBlog = {
  title: "This is a blog title",
  author: "Awesome author",
  url: "http://google.com",
};

describe("blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user1);
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user2);
    cy.visit("");
  });

  it("login form is shown", function () {
    cy.contains("Login to application");
    cy.get("#login-button");
  });

  describe("Login", function () {
    it("works for valid user", function () {
      cy.get("input#username").type(user1.username);
      cy.get("input#password").type(user1.password);
      cy.get("#login-button").click();

      cy.get(".info")
        .should("contain", user1.username + " logged in")
        .and("have.css", "color", "rgb(0, 128, 0)");
    });

    it("fails for invalid user", function () {
      cy.get("input#username").type(user1.username);
      cy.get("input#password").type(user1.password + "bla");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", user1.username + " logged in");
    });
  });

  describe("Users can add blogs", function () {
    beforeEach(function () {
      cy.login({ username: user1.username, password: user1.password });
    });

    it("blog form can be opened", function () {
      cy.contains("new blog").click();

      cy.contains("title");
      cy.contains("author");
      cy.contains("url");

      cy.get("input#title").should("exist");
      cy.get("input#author").should("exist");
      cy.get("input#url").should("exist");
    });

    it("new blog can be added", function () {
      cy.contains("new blog").click();

      cy.get("input#title").type(testBlog.title);
      cy.get("input#author").type(testBlog.author);
      cy.get("input#url").type(testBlog.url);

      cy.contains("create").click();

      cy.get(".blog-entry").contains(testBlog.title);
      cy.get(".blog-entry").contains(testBlog.author);
      cy.get(".blog-entry").should("not.contain", testBlog.url);
    });
  });

  describe("Users can modify blogs", function () {
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/login/`, {
        username: user1.username,
        password: user1.password,
      }).then(({ body }) => {
        window.localStorage.setItem("user", JSON.stringify(body));

        cy.request({
          url: `${Cypress.env("BACKEND")}/blogs/`,
          method: "POST",
          body: testBlog,
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        });
        cy.visit("");
      });
    });

    it("Users can like blogs", function () {
      cy.get(".blog-entry").contains("show").click();
      cy.contains("Likes: 0");
      cy.contains("like").click();
      cy.contains("Likes: 1");
    });

    it("Users can delete a blog", function () {
      cy.get(".blog-entry").contains("show").click();
      cy.contains("remove").click();
      cy.contains("removed blog");
      cy.get(".blog-entry").should("not.exist");
    });

    it("only creater can delete", function () {
      cy.login({ username: user2.username, password: user2.password });
      cy.get(".blog-entry").contains("show").click();
      cy.get(".blog-entry").should("not.contain", "remove");
    });

    it("blogs are sorted according to likes", function () {
      cy.request({
        url: `${Cypress.env("BACKEND")}/blogs/`,
        method: "POST",
        body: { ...testBlog, title: "highest likes", likes: 2 },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      cy.visit("");

      cy.get(".blog-entry").eq(0).should("contain", "highest likes");
      cy.get(".blog-entry").eq(1).should("contain", testBlog.title);

      cy.get(".blog-entry").eq(0).contains("show").click();
      cy.get(".blog-entry").eq(1).contains("show").click();
      const lower = cy.get(".blog-entry").eq(1);
      cy.wait(1000);
      lower.contains("like").click();
      cy.wait(1000);
      lower.contains("like").click();
      cy.wait(1000);
      lower.contains("like").click();

      cy.get(".blog-entry").eq(1).should("contain", "highest likes");
      cy.get(".blog-entry").eq(0).should("contain", testBlog.title);
    });
  });
});
