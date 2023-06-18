import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('create is triggered', async () => {
    const createFn = jest.fn()

    let { container } = render(<BlogForm create={createFn} />)

    const user = userEvent.setup()

    const testBlog = {
      title: 'test title',
      author: 'test author',
      url: 'test url'
    }

    const titleInput = container.querySelector('#title')
    await user.type(titleInput, testBlog.title)

    const authorInput = container.querySelector('#author')
    await user.type(authorInput, testBlog.author)

    const urlInput = container.querySelector('#url')
    await user.type(urlInput, testBlog.url)

    const submitButton = screen.getByRole('button')
    await user.click(submitButton)

    expect(createFn.mock.calls[0][0]).toEqual(testBlog)
  })
})
