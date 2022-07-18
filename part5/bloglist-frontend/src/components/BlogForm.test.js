import 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('test the props of BlogForm ', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)
  const inputTitle = container.querySelector('#title')
  const inputAuthor = container.querySelector('#author')
  const inputUrl = container.querySelector('#url')
  const sendButton = screen.getByText('new blog')

  await user.type(inputAuthor, 'Douglas Adams')
  await user.type(inputUrl, 'www.guiadomochileiro.com.br')
  await user.type(inputTitle, 'O restaurante no fim do universo')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('O restaurante no fim do universo')
  expect(createBlog.mock.calls[0][0].author).toBe('Douglas Adams')
  expect(createBlog.mock.calls[0][0].url).toBe('www.guiadomochileiro.com.br')
})
