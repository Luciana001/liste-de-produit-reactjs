import { useState } from "react";
import { Input } from "./components/forms/Input";
import { Checkbox } from "./components/forms/Checkbox";
import { ProductCategoryRow } from "./components/forms/products/ProductCategoryRow";
import { ProductRow } from "./components/forms/products/ProductRow";

const PRODUCTS = [  
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},  
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},  
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},  
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},  
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},  
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}  
]

function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')

  const visibleProducts = PRODUCTS.filter(product => {
    // filtrer la liste de produits en fonction du stock 
    // (avant d'envoyer le tableau à l'enfant pour l'affichage)
    if(showStockedOnly && !product.stocked){
      return false
    }

    // filtrer la liste de produits en fonction de la recherche 
    // (avant d'envoyer le tableau à l'enfant pour l'affichage)
    if(search && !product.name.includes(search)){
      return false
    }
    
    return true
  })
  

  return <div className="container my-3">
    <SearchBar 
      search={search}
      onSearchChange={setSearch}
      showStockedOnly={showStockedOnly} 
      onStockedOnlyChange={setShowStockedOnly} 
    />
    <ProductTable 
      products={visibleProducts} 
      showStockedOnly={showStockedOnly}
      onStockedOnlyChange={setShowStockedOnly}
    />
  </div>

   //-------------------------------------------------------------------------------------

  // COMPOSANT enfant et parent faire descendre et remonter les informations
// parent
// const [isTermAccepted , setIsTermAccepted] = useState(false)

//   return <form>
//     <CGUCheckbox  checked={isTermAccepted} onCheck={setIsTermAccepted}/>
//     <button disabled={!isTermAccepted}>Envoyer le formulaire</button>
//   </form>

// enfant
  // function CGUCheckbox ({checked, onCheck}) {
  //   return <div>
  //     <label>
  //       <input type="checkbox" 
  //       onChange={(e) => onCheck(e.target.checked)}
  //       checked={checked} />
  //       Accepter les conditions générales
  //     </label>
  //   </div>
  // }

  //-------------------------------------------------------------------------------------

  // FORMULAIRE avec Champ non-contrôlé, utile pour récupérer des valeurs entières


  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   
  // }

  // return <>
  //   <form onSubmit={handleSubmit}>
  //     <input type="text" name="firstname" defaultValue='lulu' />
  //     <button>Envoyer</button>
  //   </form>
  // </>

  //-------------------------------------------------------------------------------------

  // FORMULAIRE avec Champ contrôlé, utile pour une réactivité instantanée
  // inconvénient rend tout le code à chaque mouvement du clavier
  // value + onchange

  // ||| Champ controlé - pré-rempli
  // const [firstname, setFirstname] = useState('john doe')
  // const handleChange = (e) => {
  //   setFirstname(e.target.value)
  // }
  // const reset = () => {
  //   setFirstname('')
  // }

  // return <>
  //   <input type="text" name="firstname" value={firstname} onChange={handleChange} />
  //   {firstname}
  //   <button onClick={reset} type="button">Reset</button>
  // </>

  // ||| Champ controlé - vide
  // const [value, setValue] = useState('')
  // const handleChange = (e) => {
  //   setValue(e.target.value)
  // }

  // return <>
  //     <form>
  //       <textarea value={value} onChange={handleChange} />
  //       <button>Envoyer</button>
  //     </form>
  //   </>

  // ||| Checkbox controlé - avec conditions

  // const [value, setValue] = useState('')
  // const handleChange = (e) => {
  //   setValue(e.target.value)
  // }

  // const [checked, setChecked] = useState(true)
  // const toggleChecked = () => {
  //   setChecked(!checked)
  // }

  // return <>
  //   <form>
  //     <textarea value={value} onChange={handleChange} />
  //     <input type="checkbox" checked={checked} onChange={toggleChecked} />
  //     <button disabled={!checked}>Envoyer</button>
  //   </form>
  // </>

  //-------------------------------------------------------------------------------------

  // COMPTEUR
  // const [person, setPerson] = useState({
  //   firstname: 'lulu',
  //   lastname: 'Queen',
  //   age: 25
  // })

  //   const [count, setCount] = useState(0)

  //   const vieillir = () => {
  //     setPerson({...person, age: person.age + 1})
  //   }

  //   const increment = () => {
  //     setCount(count + 1)
  //   }

  //   return <>
  //       <button onClick={vieillir}>{person.age}</button>
  //       <button onClick={increment}>Incrémenter: {count}</button>
  //     </>

}

function SearchBar ({showStockedOnly, onStockedOnlyChange, search, onSearchChange}) {
  // affichage (pas de logique)
  return <div>
    <div className="mb-3">
      <Input 
        value={search}
        onChange={onSearchChange} 
        placeholder='Rechercher...' 
      />
      <Checkbox 
        id="stocked" 
        checked={showStockedOnly} 
        onChange={onStockedOnlyChange} 
        label="N'afficher que les produits en stock" 
      />
    </div>
  </div>
}

function ProductTable ({products}) {
  
  const rows = [];
  let lastCategory = null;

  
  for(let product of products){
    
    if(product.category !== lastCategory){
      rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
    }
    lastCategory = product.category;
    rows.push(<ProductRow product={product} key={product.name}/>)
      
  }
  
  

  return <table className="table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
        {rows}
    </tbody>
  </table>
}
export default App
