import React, { useEffect, useState } from 'react'
import DisplayProduct from './DisplayProduct'
import useFetch from '../customHooks/useFetch'
import FilterProducts from './FilterProducts'
import SortProduct from './SortProduct'
import SearchProducts from './SearchProduct'

export default function FetchProducts() {
  let [api,setAPI]=useState("https://dummyjson.com/products")

  let {data:productsObject}=useFetch(api)

  let [category, setCategory] = useState("all")
  let [sortOrder, setSortOrder] = useState(null) //later asc or desc
  let [productName, setByProductName] = useState(null)
  useEffect(()=>
    {
      let url = "https://dummyjson.com/products"
      if(category!=="all")
      {
        url = `https://dummyjson.com/products/category/${category}`
      }
      if(sortOrder)
      {
        url+=`?sortBy=price&order=${sortOrder}`
      }
      if(productName)
      {
        url =`https://dummyjson.com/products/search?q=${productName}`
      }
      setAPI(url)
    },[category, sortOrder,productName])
    
  function filterProductsByCategory(category)
  {
    setCategory(category)  
  }

  function sortProductsByPrice(flag)
  {
    flag==='reset'?setSortOrder(null):setSortOrder(flag)

    
  }
  function searchProductsByName (productName)
  {
    setByProductName(productName)
  }

  return (
    <div className='container mt-5'>  
      <div className="row bg-warning text-center p-3 rounded-5">
          <div className="col-4">
                <FilterProducts filterProductsByCategoryFunction={filterProductsByCategory}/>
          </div>
          <div className="col-4">
                <SortProduct sortProductsByPriceFunction={sortProductsByPrice}/>
          </div>
          <div className="col-4">
                <SearchProducts searchProductsByNameFunction={searchProductsByName} />
          </div>
      </div>

      <div className='mt-4'>
        {productsObject===null?"Loading":<DisplayProduct productsArray={productsObject.products}/>}
      </div>
    </div>
  )
}




// export default function FetchProducts() {
//   let [api,setAPI]=useState("https://dummyjson.com/products")

//   let {data:productsObject}=useFetch(api)

//   let [category, setCategory] = useState("all")
//   let [productName, setProductName] = useState(null)
//   let [sortOrder, setSortOrder] = useState(null) //later asc or desc
//   useEffect(()=>
//     {
//       let url = "https://dummyjson.com/products"
//       if(category!="all")
//       {
//         url = `https://dummyjson.com/products/category/${category}`
//       }
//       if(sortOrder)
//       {
//         url+=`?sortBy=price&order=${sortOrder}`
//       }
//       if(productName)
//       {
//         url =`https://dummyjson.com/products/search?q=${productName}`
//       }
//       setAPI(url)
//     },[category, sortOrder, productName])
    
//   function filterProductsByCategory(category)
//   {
//     setCategory(category)  
//   }

//   function sortProductsByPrice(flag)
//   {
//     flag==='reset'?setSortOrder(null):setSortOrder(flag)
//   }
//   function searchProductByName(productName){
//     setProductName(productName)
//   }

//   return (
//     <div className='container mt-5'>  
//       <div className="row bg-warning text-center p-3 rounded-5">
//           <div className="col-4">
//                 <FilterProducts filterProductsByCategoryFunction={filterProductsByCategory}/>
//           </div>
//           <div className="col-4">
//                 <SortProduct sortProductsByPriceFunction={sortProductsByPrice}/>
//           </div>
//           <div className="col-4">
//                 <SearchProduct searchProductByNameFunction={searchProductByName}/>
//           </div>
  
//       </div>

//       <div className='mt-4'>
//         {productsObject===null?"Loading":<DisplayProduct productsArray={productsObject.products}/>}
//       </div>
//     </div>
//   )
// }
