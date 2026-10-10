import { useState } from 'react'
import Botao from '../Botao'
import Campo from '../Campo'
import ListaSuspensa from '../ListaSuspensa'
import './formulario.css'

const Formulario = ({ aoCadastrar, categorias, aoCriarCategoria }) => {

    const [nome, setNome] = useState('')
    const [profissao, setProfissao] = useState('')
    const [imagem, setImagem] = useState('')
    const [categoria, setCategoria] = useState('')
    const [nomeCategoria, setNomeCategoria] = useState('')
    const [corCategoria, setCorCategoria] = useState('')

    const aoSubmeter = (evento) => {
        evento.preventDefault()
        console.log('form enviado', nome, profissao, imagem, categoria )
        aoCadastrar({
            nome,
            profissao,
            imagem,
            categoria
        })
    }

    return (
        <section className="formulario-container">
            <form className="formulario" onSubmit={aoSubmeter}>
                <h2>Preencha os dados para criar o card do jogador.</h2>
                <Campo
                    obrigatorio={true}
                    label='Nome'
                    placeholder='Digite seu nome '
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}/>
                <Campo
                    obrigatorio={true}
                    label='Profissão' 
                    placeholder='Digite sua profissão '
                    valor={profissao}
                    aoAlterado={valor => setProfissao(valor)}/>
                <Campo 
                    label='Imagem' 
                    placeholder='Informe o endereço da imagem '
                    aoAlterado={valor => setImagem(valor)}/>
                <ListaSuspensa 
                    obrigatorio={true}
                    label='Categoria'
                    items={categorias} 
                    valor={categoria}
                    aoAlterado={valor => setCategoria(valor)}/>
                <Botao texto='Criar card' />
            </form>
            <form className="formulario" onSubmit={(evento) => {
                evento.preventDefault()
                aoCriarCategoria({ nome: nomeCategoria, cor: corCategoria })
            }}>
                <h2>Preencha os dados para criar uma nova categoria.</h2>
                <Campo
                    obrigatorio={true}
                    label='Nome'
                    placeholder='Digite o nome da categoria'
                    valor={nomeCategoria}
                    aoAlterado={valor => setNomeCategoria(valor)}/>
                <Campo
                    obrigatorio={true}
                    label='Cor'
                    type='color'
                    placeholder='Digite sua cor'
                    valor={corCategoria}
                    aoAlterado={valor => setCorCategoria(valor)}/>
                <Botao texto='Criar Categoria' />
            </form>
        </section>
    )
}

export default Formulario