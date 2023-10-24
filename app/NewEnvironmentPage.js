import React, { useState } from "react";
import CreateEnvironmentName from "./components/addNewEnvironment/CreateEnvironmentName.js";
import AddPeople from "./components/addNewEnvironment/AddPeople.js";


const NewEnvironmentPage = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [environmentDetails, setEnvironmentDetails] = useState({
    "name": undefined,
    "people": [],
    "tasks": []
  })

  const incCurrentPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const decCurrentPage = () => {
    setCurrentPage(currentPage - 1)
  }
  
  switch(currentPage) {
    case 0:
      return <CreateEnvironmentName 
        nextItem={incCurrentPage}
        previousItem={decCurrentPage}
        setEnvironmentDetails={setEnvironmentDetails}
      />
    case 1:
      return <AddPeople 
        nextItem={incCurrentPage}
        previousItem={decCurrentPage}
        setEnvironmentDetails={setEnvironmentDetails}
      />
    case 2:
      return <></>
  }
}



export default NewEnvironmentPage;
