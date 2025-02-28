// 'use client'
// import { createContext, useState, useContext } from "react";

// const SearchContext = createContext();

// export const SearchFormProvider = ({ children }) => {
//   const [searchFormData, setSearchFormData] = useState({});

//   const updateSearchFormData = (newData) => {
//     setSearchFormData((prev) => ({ ...prev, ...newData }));
//   };

//   return (
//     <SearchContext.Provider value={{ searchFormData, updateSearchFormData }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearchFormContext = () => useContext(SearchContext);
