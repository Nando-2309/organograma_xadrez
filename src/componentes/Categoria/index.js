import { useEffect, useRef, useState } from 'react'
import Colaborador from '../Colaborador'
import hexToRgba from 'hex-to-rgba';
import './categoria.css'

const Categoria = ({ categoria, colaboradores, aoDeletar, mudarCor, aoFavoritar }) => {
    const lista = useRef(null)
    const [indiceAtual, setIndiceAtual] = useState(0)
    const indiceVisivel = Math.min(indiceAtual, Math.max(0, colaboradores.length - 1))

    function atualizarPosicao() {
        const container = lista.current
        if (!container || !container.children.length) return
        const inicio = container.children[0].offsetLeft
        let maisProximo = 0
        let distancia = Infinity
        Array.from(container.children).forEach((card, indice) => {
            const diferenca = Math.abs(card.offsetLeft - inicio - container.scrollLeft)
            if (diferenca < distancia) {
                distancia = diferenca
                maisProximo = indice
            }
        })
        setIndiceAtual(maisProximo)
    }

    function navegar(direcao) {
        const container = lista.current
        const destino = Math.max(0, Math.min(colaboradores.length - 1, indiceVisivel + direcao))
        if (!container || !container.children[destino]) return
        container.scrollTo({
            left: container.children[destino].offsetLeft - container.children[0].offsetLeft,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        })
    }

    useEffect(() => {
        atualizarPosicao()
    }, [colaboradores.length])

    return (

        colaboradores.length > 0 && <section className='categoria' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/imagens/fundo.png)`, backgroundColor: hexToRgba(categoria.cor, '0.6') }}>
            <input type='color' className='input-cor' aria-label={`Cor da categoria ${categoria.nome}`} value={categoria.cor} onChange={evento => {
                mudarCor(evento.target.value, categoria.id);
            }} />
            <h3 style={{ borderColor: categoria.cor }}>{categoria.nome}</h3>
            {colaboradores.length > 1 && <p className='carrossel-dica'>Deslize para ver os jogadores</p>}
            <div className='colaboradores' ref={lista} onScroll={atualizarPosicao} tabIndex={0} aria-label={`Jogadores de ${categoria.nome}`}>
                {colaboradores.map((colaborador, indice) => <Colaborador key={colaborador.id || indice} colaborador={colaborador} corDeFundo={categoria.cor} aoDeletar={aoDeletar} aoFavoritar={aoFavoritar} />)}
            </div>
            {colaboradores.length > 1 && <div className='carrossel-controles'>
                <button type='button' aria-label='Jogador anterior' disabled={indiceVisivel === 0} onClick={() => navegar(-1)}>←</button>
                <span aria-live='polite' aria-atomic='true'>{indiceVisivel + 1} de {colaboradores.length}</span>
                <button type='button' aria-label='Próximo jogador' disabled={indiceVisivel === colaboradores.length - 1} onClick={() => navegar(1)}>→</button>
            </div>}
        </section>

    )
}

export default Categoria
