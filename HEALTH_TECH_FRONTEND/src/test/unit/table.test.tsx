import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../../components/ui/table'

describe('Table UI components', () => {
  it('Table renders a table element inside a wrapper div', () => {
    render(<Table><tbody><tr><td>data</td></tr></tbody></Table>)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('Table passes className', () => {
    render(<Table className="custom-class"><tbody /></Table>)
    const table = screen.getByRole('table')
    expect(table.className).toContain('custom-class')
  })

  it('TableHeader renders a thead', () => {
    render(
      <table>
        <TableHeader>
          <tr><th>Head</th></tr>
        </TableHeader>
      </table>
    )
    expect(document.querySelector('thead')).toBeInTheDocument()
  })

  it('TableBody renders a tbody', () => {
    render(
      <table>
        <TableBody>
          <tr><td>Body</td></tr>
        </TableBody>
      </table>
    )
    expect(document.querySelector('tbody')).toBeInTheDocument()
  })

  it('TableFooter renders a tfoot', () => {
    render(
      <table>
        <TableFooter>
          <tr><td>Footer</td></tr>
        </TableFooter>
      </table>
    )
    expect(document.querySelector('tfoot')).toBeInTheDocument()
  })

  it('TableRow renders a tr', () => {
    render(
      <table>
        <tbody>
          <TableRow>
            <td>Row</td>
          </TableRow>
        </tbody>
      </table>
    )
    expect(document.querySelector('tr')).toBeInTheDocument()
  })

  it('TableHead renders a th with the correct content', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead>Column</TableHead>
          </tr>
        </thead>
      </table>
    )
    expect(screen.getByText('Column')).toBeInTheDocument()
    expect(document.querySelector('th')).toBeInTheDocument()
  })

  it('TableCell renders a td with the correct content', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Value</TableCell>
          </tr>
        </tbody>
      </table>
    )
    expect(screen.getByText('Value')).toBeInTheDocument()
    expect(document.querySelector('td')).toBeInTheDocument()
  })

  it('TableCaption renders a caption', () => {
    render(
      <table>
        <TableCaption>Caption text</TableCaption>
        <tbody />
      </table>
    )
    expect(screen.getByText('Caption text')).toBeInTheDocument()
    expect(document.querySelector('caption')).toBeInTheDocument()
  })

  it('Table renders complete structure', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>30</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })
})
