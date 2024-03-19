import '@testing-library/react'
import {render, screen} from '@testing-library/react'
import Home from '@/app/page'



describe('Home', () => {
	it("should contain 'No Email selected'", () => {
		render(<Home/>)
		const myElement = screen.getByText('No Email selected')
		expect(myElement).toBeInTheDocument()
	})
})
