import { useState, useEffect,useContext} from "react";
import CustomizedTables from "../components/Table";

import { StyledTableRow , StyledTableCell} from "../components/Table";
import { getLogs } from "../services/logApi";

const columnHeading = [
    "Sr No","id","Username","Operation Time","Table Name", "Operation Type", "tupleKeyvalue"
]

function ViewLogPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("called")
    getLogs()
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const renderedData = data.map((item,index) => {
    return (
      <StyledTableRow key={item.id}>
        <StyledTableCell>{index + 1}</StyledTableCell>
        <StyledTableCell>{item.id}</StyledTableCell>
        <StyledTableCell>{item.userName}</StyledTableCell>
        <StyledTableCell>{item.opTime}</StyledTableCell>
        <StyledTableCell>{item.tableName}</StyledTableCell>
        <StyledTableCell>{item.operation}</StyledTableCell>
        <StyledTableCell>{item.tupleKeyvalue}</StyledTableCell>
      </StyledTableRow>
    )
  })


    return (
    <>
      <CustomizedTables columns={columnHeading} Data={renderedData} />
    </>
  );
}

export default ViewLogPage;
