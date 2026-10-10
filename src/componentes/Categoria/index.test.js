import { fireEvent, render, screen } from '@testing-library/react'
import Categoria from './index'

const jogadores = ['Karpov', 'Kramnik', 'Fischer'].map((nome, id) => ({
    id: String(id), nome, profissao: 'Jogador de xadrez', imagem: '', favorito: false
}))
const props = {
    categoria: { id: 'categoria', nome: 'Os Posicionais', cor: '#E06B69' },
    colaboradores: jogadores,
    aoDeletar: jest.fn(), mudarCor: jest.fn(), aoFavoritar: jest.fn()
}

beforeEach(() => {
    window.matchMedia = jest.fn(() => ({ matches: false }))
})

function prepararLista() {
    const lista = screen.getByLabelText('Jogadores de Os Posicionais')
    Array.from(lista.children).forEach((card, indice) => {
        Object.defineProperty(card, 'offsetLeft', { configurable: true, value: 12 + indice * 300 })
    })
    lista.scrollTo = jest.fn()
    return lista
}

test('setas e contador acompanham o deslize e respeitam os limites', () => {
    render(<Categoria {...props} />)
    const lista = prepararLista()
    expect(screen.getByRole('button', { name: 'Jogador anterior' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Próximo jogador' }))
    expect(lista.scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' })
    lista.scrollLeft = 300
    fireEvent.scroll(lista)
    expect(screen.getByText('2 de 3')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Jogador anterior' }))
    expect(lista.scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' })
    lista.scrollLeft = 600
    fireEvent.scroll(lista)
    expect(screen.getByText('3 de 3')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Próximo jogador' })).toBeDisabled()
})

test('remover jogador mantém o contador válido e categoria com um jogador dispensa controles', () => {
    const { rerender } = render(<Categoria {...props} />)
    const lista = prepararLista()
    lista.scrollLeft = 600
    fireEvent.scroll(lista)
    rerender(<Categoria {...props} colaboradores={jogadores.slice(0, 2)} />)
    expect(screen.getByText('2 de 2')).toBeInTheDocument()
    rerender(<Categoria {...props} colaboradores={jogadores.slice(0, 1)} />)
    expect(screen.queryByRole('button', { name: 'Próximo jogador' })).not.toBeInTheDocument()
})

test('respeita a preferência de movimento reduzido', () => {
    window.matchMedia = jest.fn(() => ({ matches: true }))
    render(<Categoria {...props} />)
    const lista = prepararLista()
    fireEvent.click(screen.getByRole('button', { name: 'Próximo jogador' }))
    expect(lista.scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'auto' })
})
