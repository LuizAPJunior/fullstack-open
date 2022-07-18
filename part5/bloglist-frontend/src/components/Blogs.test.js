import 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component test', () => {
  let blog = {}
  beforeEach(() => {
    blog = {
      title: 'Advanced Data Structure',
      author: 'Niko',
      url: 'www.datastructure.com',
      likes: 14,
      user: { name: 'Niko Test', username: 'nikot', id: 'jhsdfkajdshf' },
    }
  })

  test('show Title and Author but dont show url and likes ', () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog-default')
    expect(div).toHaveTextContent('Advanced Data Structure - Niko')
    expect(div).not.toHaveTextContent('www.datastructure.com')
    expect(div).not.toHaveValue(14)
  })

  test('show url and likes when click on the show button', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const url = screen.findByText('www.datastructure.com')
    const likes = screen.findByText('14')
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('click likes button, event handler should be called twice', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} updateLikes={mockHandler}/>)
    const button = container.querySelector('.likes')
    const user = userEvent.setup()
    await user.dblClick(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
