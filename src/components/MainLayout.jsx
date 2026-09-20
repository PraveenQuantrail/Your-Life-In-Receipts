import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";
import { BsCardList } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { categoriesData } from "../services/sampleData";
import { ToastContainer, toast } from "react-toastify";
import { DataContext } from "../App";
import { MdPlaylistRemove } from "react-icons/md";

const TABS = ["All Memories", "New Memory"];

function MainLayout({ logo }) {
  const [tabs, setTabs] = useState(
    TABS?.map((v, i) => {
      if (i == 1) {
        return {
          id: i,
          tab: v,
          isSelect: false,
          icon: <IoMdAdd />,
        };
      }

      return {
        id: i,
        tab: v,
        isSelect: true,
        icon: <BsCardList />,
      };
    }),
  );

  function isSelectedTab(id) {
    return tabs?.find((_v) => _v?.id === id)?.isSelect;
  }

  function changeTab(id) {
    setTabs((prev) =>
      prev?.map((_v) => {
        if (_v?.id === id) {
          return { ..._v, isSelect: true };
        }
        return { ..._v, isSelect: false };
      }),
    );
  }

  function currentSelectedTab() {
    const find = tabs?.filter((_v) => _v?.isSelect);
    return find[0]?.tab;
  }

  return (
    <div className="p-2">
      <Navbar logo={logo} />

      {/* tabs */}
      <div className="p-10">
        <div className="flex gap-5">
          {tabs?.map((_v) => (
            <motion.div
              onClick={() => changeTab(_v?.id)}
              title={_v?.tab}
              key={_v?.id}
              className={`py-1 px-5 ease-in-out flex items-center gap-4  rounded-sm cursor-pointer ${isSelectedTab(_v?.id) ? "bg-blue-800 text-white " : "border border-gray-200 "}`}
            >
              {_v?.icon}
              {_v?.tab}
            </motion.div>
          ))}
        </div>

        {currentSelectedTab() === "All Memories" ? (
          <AllMemoriesComponent />
        ) : (
          <NewMemoryFormComponent />
        )}
      </div>
    </div>
  );
}

function AllMemoriesComponent() {
  const SEKETONNUM = Array(10).fill("_");
  const [loading, setLoading] = useState(true);
  const { allData, isEmpty } = useContext(DataContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <motion.div>
      {loading && (
        <div className="grid my-4 gap-3 grid-cols-3 grid-rows-3">
          {/* <SkeletonTheme baseColor="#202020" highlightColor="#444"> */}
          {SEKETONNUM?.map((_v, idx) => {
            return (
              <div className="w70 h-40 ">
                <Skeleton key={idx} count={6} />
              </div>
            );
          })}
          {/* </SkeletonTheme> */}
        </div>
      )}

      {!loading && (
        <div>
          {isEmpty() ? (
            <div className="flex flex-col items-center justify-center my-30">
              <MdPlaylistRemove size={30} />
              <span>Empty memories</span>
            </div>
          ) : (
            <div className="my-20">
              {allData?.map((_v, idx) => {
                return (
                  <div key={idx} className="w-full my-1 py-3 px-7 rounded-md border border-gray-400">
                    <div>
                      <h5>{_v?.title}</h5>
                      <span className="text-sm text-gray-700">{_v?.group} - {Date(_v?.id).toString()}</span>
                    </div>
                    <div>
                      {_v?.descr}
                      </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

function NewMemoryFormComponent() {
  const [formdata, setFormData] = useState({
    title: "",
    descr: "",
    group: "",
  });

  const { allData, insertData } = useContext(DataContext);

  function clearHandler() {
    setFormData({
      title: "",
      descr: "",
      group: "",
    });
  }

  function insertDataHandler() {
    if (!formdata?.group || !formdata?.title || !formdata?.descr) {
      return;
    }

    insertData({
      id: Date.now(),
      ...formdata,
    });

    clearHandler();
  }

  return (
    <motion.div>
      <div className="my-10">
        <div className="">
          <input
            onChange={(e) =>
              setFormData({ ...formdata, title: e.target?.value })
            }
            value={formdata?.title}
            className="border border-gray-200 px-2 py-2 w-[70%] h-15"
            placeholder="Title of memories"
          />
          <select
            onChange={(e) =>
              setFormData({ ...formdata, group: e.target.value })
            }
            value={formdata?.group}
            className="w-[25%] border border-gray-200 px-2 py-2 h-15  relative left-[5%]"
          >
            {categoriesData?.map((_v, idx) => {
              return <option key={idx}>{_v}</option>;
            })}
          </select>
        </div>
        <div></div>
        <div className="my-4">
          <textarea
            onChange={(e) =>
              setFormData({ ...formdata, descr: e.target.value })
            }
            value={formdata?.descr}
            className="max-w-full rounded-md min-w-full resize-none border border-gray-200 py-2 px-4 min-h-50 max-h-50"
            placeholder="Description"
          />
        </div>

        <div className="flex items-center justify-end gap-5">
          <button
            className="px-10 py-3 bg-blue-500 text-white rounded-sm flex items-center gap-5"
            onClick={() => insertDataHandler()}
          >
            <IoMdAdd /> Submit
          </button>
          <button
            onClick={() => clearHandler()}
            className="px-10 py-3 bg-red-500 text-white rounded-sm flex items-center gap-5"
          >
            <MdClear /> Clear
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default MainLayout;
