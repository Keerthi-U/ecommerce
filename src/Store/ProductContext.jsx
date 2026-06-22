import React, {children, createContext , useContext , useEffect , useState} from 'react'


const  ProductContext = createContext ();



const getInitialDarkMode = () => {
    const preparedDarkmode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedDarkMode = localStorage.getItem('darkTheme') === 'true';
    const darkMode = savedDarkMode || preparedDarkmode;
    document.body.classList.toggle('dark-theme', darkMode);
    return darkMode;
}

export const ProductProvider = ({children}) => {
    const [products , setProduct] = useState([]);
    const [darkMode, setDarkMode] = useState(getInitialDarkMode())
    const [currentPage , setCurrentPage] = useState(1);
    const [filtered , setFiltered] = useState([]);
    const productsPerpage = 6;






      const toggledarkMode = () => {
      const newdarkTheme =!  darkMode;
      setDarkMode(newdarkTheme);
      localStorage.setItem('darkTheme', newdarkTheme);

    

    }
   useEffect(() => {
    fetch('/data.json')
    .then(res => res.json())
    .then(data => {
        console.log('Fetched Data:', data); 
        setProduct(data)
        setFiltered(data);
    })
    .catch(error => {
    console.error('Error fetching data:', error); 
    });
    
   },[]);

   const indexOfLast = currentPage *  productsPerpage;
   const indexOfFirst = indexOfLast - productsPerpage;
   const currentProduct = filtered.slice(indexOfFirst , indexOfLast)

   console.log("currentProduct" , currentProduct);
   

  return (
     <ProductContext.Provider
   value = {{darkMode, products , setProduct ,toggledarkMode , setFiltered , filtered , currentPage ,setCurrentPage , currentProduct}}
     >
        {children}
</ProductContext.Provider>
  )
}

export const useProducts = () =>useContext(ProductContext)