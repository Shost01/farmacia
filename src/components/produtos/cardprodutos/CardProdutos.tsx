import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto'

interface CardProdutoProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutoProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{produto.nome}</h4>
                    <p>{produto.descricao}</p>
                    <p>Categoria: {produto.categoria?.descricao}</p>
                    <p>Quantidade: {produto.quantidade}</p>
                    <p>Laboratorio: {produto.laboratorio}</p>
                    <p>Preco: {produto.preco}</p>
                    <p>Foto: {produto.foto}</p>
                </div>
            </div>
            <div className="flex">
            <Link to={`/editarproduto/${produto.id}`}
                className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                flex items-center justify-center py-2'>
                <button>Editar</button>
            </Link>
            <Link to={`/deletarproduto/${produto.id}`} 
                className='text-white bg-red-400 
                hover:bg-red-700 w-full flex items-center justify-center'>
                <button>Deletar</button>
            </Link>
            </div>
        </div>
    )
}

export default CardProduto