import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  let likeFn;
  const blog = {
    title: "Blog title",
    author: "Blog author",
    url: "http://test.url",
    likes: 0,
    user: {},
  };

  beforeEach(() => {
    likeFn = jest.fn();
    container = render(<Blog blog={blog} like={likeFn} currentUser={{}} />);
  });

  test("renders title and author, but not likes and url", () => {
    expect(screen.getByText(blog.title)).toBeDefined();
    expect(screen.getByText(blog.author)).toBeDefined();
    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(`Likes: ${blog.likes}`)).toBeNull();
  });

  test("renders all after click", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    expect(screen.getByText(blog.title)).toBeDefined();
    expect(screen.getByText(blog.author)).toBeDefined();
    expect(
      screen.getByText(`URL: ${blog.url}`, { exact: false }),
    ).toBeDefined();
    expect(
      screen.getByText(`Likes: ${blog.likes}`, { exact: false }),
    ).toBeDefined();
  });

  test("like click works", async () => {
    const user = userEvent.setup();
    const shwoButton = screen.getByText("show");
    await user.click(shwoButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeFn.mock.calls).toHaveLength(2);
  });
});
