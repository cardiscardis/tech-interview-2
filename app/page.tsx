"use client";

import { SetStateAction, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { FetchProvider,useFetchContext } from "./hooks/FetchContext";
import { ApiResponse } from "./hooks/useFetchHook";

function Home() {
 
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [selectAll, setSelectAll] = useState<boolean>(false);  
  const [searchTerm, setSearchTerm] = useState<string>('')
    const { data, loading, error } = useFetchContext();

    if (error) {
      alert(error)
    }


  /* const sortedProducts = data && [...data].sort((a, b) => {
    if (sortColumn) {
      if (sortOrder === "asc") {
        return a[sortColumn] < b[sortColumn] ? -1 : 1;
      } else {
        return a[sortColumn] > b[sortColumn] ? -1 : 1;
      }
    } else {
      return 0;
    }
  }); */

  const handleSelectAll = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setSelectAll(e.target.checked);
    setSelectedProducts(
      e.target.checked && data ? data.map((product) => product.SKU) : [],
    );
  };

  const handleSort = (column: SetStateAction<string | null>) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const isSelected = (productId: number) => selectedProducts.includes(productId);

  const sortSvg = (column: string | null) =>
    sortColumn === column ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        {sortOrder === "asc" ? (
          <path d="M7 10l5 5 5-5z" />
        ) : (
          <path d="M7 14l5-5 5 5z" />
        )}

        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ) : null;

    if (loading) return (
      <div className="min-h-screen w-screen flex align-middle justify-center">
        <p className="font-bold">Loading...</p>
        </div>
    )

  return (
    <div className="bg-white pt-[17px]  font-raleway">
      <div className="flex align-middle justify-between h-[89px] px-[20px] bg-white">
        <Image 
        src={'/Group1000004245.svg'} className='w-[206px] h-[56px]' 
        width={206} height={56} alt={""} />
        <div
        className="w-[264px] h-[42px] border-gray-300 rounded absolute top-[20px] left-[320px]" 
        >
        <input type="text" className="pl-10 pr-4 py-2 border rounded-lg" 
          placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} /> 
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center  pointer-events-none"> 
           <CiSearch />
        </div>  
        </div>
        <Image src={'/div.svg'} width={155} height={34}
        className='w-[155px] h-[34px]' 
        alt={""} />
      </div>
      <div className="pt-[33px] px-[53px] bg-gray-100 w-auto ">
        <div className="flex flex-row justify-between items-center mb-4 bottom-[30px]">
          <h2 className="text-xl font-medium size-[18px] w-auto">Products Table</h2>
        </div>
        
        <table className="w-full border-collapse font-normal size-3 bg-white gap-6">
          <thead className="bg-blue-50 py-5">
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 text-left w-3">
                <input
                  className="accent-purple-600"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>
                <div className="flex flex-row justify-center items-center">
                  <p>S/N</p>
                </div>
              </th>
              <th>
                <div className="flex flex-row justify-center items-center">
                  <p>Image</p>
                </div>
              </th>
              <th>
                <div className="flex flex-row justify-center items-center">
                  <p>SKU</p>
                </div>
              </th>
              <th onClick={() => handleSort("Name")}>
                <div className="flex flex-row justify-center items-center">
                  <p>Name</p>
                  {sortSvg("Name")}
                </div>
              </th>
              <th onClick={() => handleSort("Title")}>
                <div className="flex flex-row justify-center items-center">
                  <p>Title</p>
                  {sortSvg("Title")}
                </div>
              </th>
              <th onClick={() => handleSort("Description")}>
                <div className="flex flex-row justify-center items-center">
                  <p>Description</p>
                  {sortSvg("Description")}
                </div>
              </th>
              <th onClick={() => handleSort("Brand")}>
                <div className="flex flex-row justify-center items-center">
                  <p>Brand</p>
                  {sortSvg("Brand")}
                </div>
              </th>
              <th onClick={() => handleSort("Cost Price")}>
                <div className="flex flex-row justify-center items-center">
                  <p>Cost Price</p>
                  {sortSvg("Cost Price")}
                </div>
              </th>
              <th onClick={() => handleSort("Quantity")}>
                <div className="flex flex-row justify-center items-center">
                  <p>Quantity</p>
                  {sortSvg("Quantity")}
                </div>
              </th>
              <th onClick={() => handleSort("size")}>
                <div className="flex flex-row justify-center items-center">
                  <p>Size</p>
                  {sortSvg("size")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.filter((d: ApiResponse)=> d.Name.toLowerCase().includes(searchTerm)).map((product, index) => (
              <tr
                key={index}
                className={`${
                  isSelected(index) ? "bg-gray-100" : ""
                } border-b border-gray-200`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    onChange={() => handleSelectProduct(index)}
                    checked={isSelected(index)}
                    className="text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-600 accent-purple-600"
                  />
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  <Image className="w-[60px] h-[60px]" width={60} height={60} src={product.Image_1} alt="avatar" />
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product.SKU} 
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product.Name}
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product.Title}
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product.Description}
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product.Brand}
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product['Cost Price'] as any}
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product.Quantity}
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product.size}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const App = () => {
  const url = 'http://3.88.1.181:8000/products/public/catalog?supplier=FragranceX';

  return (
    <FetchProvider url={url}>
      <Home />
    </FetchProvider>
  );
};

export default App;