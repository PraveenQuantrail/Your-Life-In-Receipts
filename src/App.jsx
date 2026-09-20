import React, { createContext, useEffect, useState } from "react";
import GobalLoadingComponent from "./components/GobalLoadingComponent";
import logo from "./assets/favicon.png";
import MainLayout from "./components/MainLayout";
import { ToastContainer, toast } from 'react-toastify';

const DATAKEY = "YLIR-data";

function GetData() {
  return new Promise((res, rej) => {
    try {
      const isFind = localStorage?.getItem(DATAKEY);
      if (!isFind) {
        localStorage?.setItem(DATAKEY, JSON.stringify([]));
        setTimeout(() => {
          res({ status: true, data: [] });
        }, 2000);
      }

      const data = JSON.parse(localStorage?.getItem(DATAKEY));
      if (!data) {
        rej({ status: false, data: [] });
      }

      setTimeout(() => {
        res({ status: true, data });
      }, 2000);
    } catch (err) {
      rej({ status: false, data: [] });
    }
  });
}

export const DataContext = createContext([]);

function App() {
  const [gobalLoading, setGobalLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    async function initMethod() {
      setGobalLoading(true);
      const data = await GetData();
      setAllData(data?.data);
      setGobalLoading(false);
    }

    return () => {
      initMethod();
    };
  }, []);

function isEmpty(){
  return allData?.length === 0
}

  function insertData(data) {
    const final = [...allData,data]
    setAllData(final);
    localStorage.setItem(DATAKEY,JSON.stringify(final));
    toast.success("Memories Added successfully!")
  }

  if (gobalLoading) {
    return <GobalLoadingComponent logo={logo} />;
  }

  return (
    <div className="w-full h-screen absolute left-0 top-0">
      <ToastContainer />
      <DataContext.Provider value={{ allData,insertData, isEmpty}}>
        <MainLayout logo={logo} />
      </DataContext.Provider>
    </div>
  );
}

export default App;
