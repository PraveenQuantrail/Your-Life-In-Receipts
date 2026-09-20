import React, { createContext, useEffect, useState } from "react";
import GobalLoadingComponent from "./components/GobalLoadingComponent";
import logo from "./assets/favicon.png";
import MainLayout from "./components/MainLayout";
import { ToastContainer, toast } from 'react-toastify';

const DATAKEY = "YLIR-data";

function GetData() {
  return new Promise((res, rej) => {
    try {
      const raw = localStorage.getItem(DATAKEY);
      
      if (!raw) {
        localStorage.setItem(DATAKEY, JSON.stringify([]));
        setTimeout(() => {
          res({ status: true, data: [] });
        }, 1000);
        return; 
      }

      const parsed = JSON.parse(raw);
      setTimeout(() => {
        res({ status: true, data: parsed || [] });
      }, 1000);
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
      try {
        setGobalLoading(true);
        const res = await GetData();
        setAllData(res?.data || []);
      } catch (error) {
        console.error("Failed to load initial data:", error);
        setAllData([]);
      } finally {
        setGobalLoading(false);
      }
    }

    initMethod(); 
  }, []);

  function isEmpty() {
    return allData?.length === 0;
  }

  function insertData(data) {
    const final = [...allData, data];
    setAllData(final);
    localStorage.setItem(DATAKEY, JSON.stringify(final));
    toast.success("Memories Added successfully!");
  }

  if (gobalLoading) {
    return <GobalLoadingComponent logo={logo} />;
  }

  return (
    <div className="w-full h-screen absolute left-0 top-0">
      <ToastContainer />
      <DataContext.Provider value={{ allData, insertData, isEmpty }}>
        <MainLayout logo={logo} />
      </DataContext.Provider>
    </div>
  );
}

export default App;