import React, { useState } from "react";
import CreateEnvironmentName from "../components/AddNewEnvironment/CreateEnvironmentName.js";
import QrGenerator from "./QrGenerator.js";
import EnvironmentCreated from "../components/AddNewEnvironment/EnvironmentCreated.js";
import { useRouter } from 'expo-router';

const NewEnvironmentPage = () => {
  const [currentPage, setCurrentPage] = useState(0)

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
      />
    case 1:
      return <QrGenerator 
        nextItem={incCurrentPage}
      />
    case 2:
      return <EnvironmentCreated />
  }
}



export default NewEnvironmentPage;
