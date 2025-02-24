import Popup from 'reactjs-popup';
import FormProduto from '../formproduto/FormProduto';

import 'reactjs-popup/dist/index.css';
import './ModalProdutos.css'


function ModalProduto() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-red-800'>
                        Novo Produto
                    </button>
                }
                modal
            >
                <FormProduto />
            </Popup>
        </>
    );
}

export default ModalProduto;