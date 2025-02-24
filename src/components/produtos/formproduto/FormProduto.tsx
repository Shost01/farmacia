import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormProduto() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [categoria, setCategoria] = useState<Categoria>({ id: 0, descricao: '', nome: ''})
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    async function buscarProdutoPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto)
        } catch (error: any) {
            error.toString().includes('403')
            
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria)
        } catch (error: any) {
            error.toString().includes('403')       
        }
    }

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias)
        } catch (error: any) {
            error.toString().includes('403')
        }
    }

    useEffect(() => {
        buscarCategorias()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        })
    }, [categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
        });
    }

    function retornar() {
        navigate('/produtos')
    }

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto);

                alert('Produto atualizado com sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {                 
                } else {
                    alert('Erro ao atualizar o Produto')
                }
            }

        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto)

                alert('Produto cadastrado com sucesso');

            } catch (error: any) {
                if (error.toString().includes('403')) {
                } else {
                    alert('Erro ao cadastrar  Produto');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoCategoria = categoria.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center overflow-y-auto max-h-[80vh]">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Nome do Produto</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">descricao do Produto</label>
                    <input
                        type="text"
                        placeholder="Descricao"
                        name="descricao"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                <label htmlFor="titulo">Quantidade</label>
                <input
                        type="number"
                        placeholder="Quantidade"
                        name="quantidade"
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.quantidade}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />                    
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Laboratório</label>
                    <input
                        type="text"
                        placeholder="Laboratorio"
                        name="laboratorio"
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.laboratorio}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                <label htmlFor="titulo">Preço</label>
                <input
                        type="number"
                        placeholder="Preco"
                        name="preco"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />                    
                </div>                
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Foto</label>
                    <input
                        type="text"
                        placeholder="Foto"
                        name="foto"
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione uma Categoria</option>

                        {categorias.map((categoria) => (
                            <>
                                <option value={categoria.id} >{categoria.descricao}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                            text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoCategoria}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormProduto;