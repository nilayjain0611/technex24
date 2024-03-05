import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export const SupremeCourt = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");
  const [cases, setCases] = useState() ;
  const userRole = "admin";



  useEffect(()=>{
    const getData = async () => {
      const res = await axios.get("https://technex24.onrender.com/case/getCase")
  
      if(res.status == 200){
        // console.log(cases)
        console.log(res.data)
        setCases(res.data)
        
      }
    }

    getData() ;
  },[])



  return (
    <>
      <div className="min-h-screen md:mx-12 mx-4 md:pt-24  pt-16">
        <div className="bgSc min-h-[120vh] pt-6 md:pb-0 pb-12">

          <div>
            <p className="gradient-font text-center font-semibold text-3xl md:text-4xl">
              Priority Dashboard
            </p>

            <div className="my-12 mx-12">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Case Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Parties
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Filed Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {cases && cases
    .filter(singleCase => singleCase.court === "Supreme Court")
    .map((singleCase, index) => (
      <tr key={index}>
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{singleCase.caseNo}</td>
        <td className="px-6 py-4">{singleCase.caseCategory}</td>
        <td className="px-6 py-4">{singleCase.caseDescription}</td>
        <td className="px-6 py-4">{singleCase.parties.join(", ")}</td>
        <td className="px-6 py-4">{new Date(singleCase.filingDate).toLocaleDateString()}</td>
        <td className="px-6 py-4">{singleCase.status}</td>
      </tr>
  ))}

                  </tbody>
                </table>
              </div>
            </div>

            {isLogin && userRole === "admin" && (
              <div className="flex justify-center items-center">
                <Link to="/supremecourt/updatecase" className="gradient-bg text-sm px-10 py-2 font-semibold text-white rounded-2xl">
                  Update new Case
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default SupremeCourt;
