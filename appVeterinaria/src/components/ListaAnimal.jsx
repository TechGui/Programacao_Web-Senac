import './ListaAnimal.css'
import { FaCheck } from "react-icons/fa";
import { toast } from 'sonner'

function ListaAnimal({animal, animais, setAnimais}) {

  function avaliaAnimal() {
    let dono = 0
    
    const confirmacao = prompt(`Deseja adotar o ${animal.nome}? Passe seu nome também!`);

    if (confirmacao === null) {
      return;
    } else {

     const contato = prompt(`Passe seu contato aqui: ${animal.nome}: `);

     if (contato === null) {
      return;
     }



    const animais2 = [...animais];

    const indice = animais2.findIndex((x) => x.nome === animal.nome);

    animais2[indice].dono = dono;
    animais2[indice].contato = contato;
    animais2[indice].confirmacao = confirmacao;

    setAnimais(animais2);

    localStorage.setItem("animais", JSON.stringify(animais2));
    toast.success("Cachorro adotado com sucesso, já é seu!");
  }
  }


  return (
    <div className="grid-item">
      <img src={animal.foto} alt="animal" className='foto'/>
      <div>
        <h3>{animal.nome}</h3>
        <p className='raca'>{animal.raca}</p>
        <p className='sinopse'>{animal.idade} anos</p>
        {animal.dono == 0 ?
          <div>
            <img src="./paw.png" alt="Novidade" className='novidade'/>
            <p><button onClick={avaliaAnimal}>Adotar Animal <FaCheck /></button></p>
          </div>:
          <div>
            <p className='confirmacao'>{animal.confirmacao}</p>
            <p className='contato'>{animal.contato}</p>
          </div>  
        }        
      </div>
    </div>
  )
}

export default ListaAnimal