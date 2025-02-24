import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos"
import ModalProduto from "../../components/produtos/modalprodutos/ModalProdutos"

function Home() {
    return (
        <>
            <div className="bg-red-900 flex justify-center">
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Sejam Bem Vindos!
                        </h2>
                        <p className='text-xl'>
                            Adicione um novo Produto:
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalProduto />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src=" "
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>

            <ListaProdutos />
        </>
    )
}

export default Home