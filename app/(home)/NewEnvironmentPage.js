import React, { useState } from "react";
import CreateEnvironmentName from "../components/AddNewEnvironment/CreateEnvironmentName.js";
import AddPeople from "../components/AddNewEnvironment/AddPeople.js";
import EnvironmentCreated from "../components/AddNewEnvironment/EnvironmentCreated.js";
import { useRouter } from 'expo-router';

const NewEnvironmentPage = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [flatname, setFlatname] = useState(null)

  const router = useRouter();

  const incCurrentPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const decCurrentPage = () => {
    if(currentPage <= 0) {
      router.replace('/')
    } 
    setCurrentPage(currentPage - 1)
  }
  
  switch(currentPage) {
    case 0:
      return <CreateEnvironmentName 
        nextItem={incCurrentPage}
        previousItem={decCurrentPage}
        setFlatname={setFlatname}
      />
    case 1:
      return <AddPeople 
        nextItem={incCurrentPage}
        previousItem={decCurrentPage}
        flatname={flatname}
      />
    case 2:
      return <EnvironmentCreated />
  }
}



export default NewEnvironmentPage;
