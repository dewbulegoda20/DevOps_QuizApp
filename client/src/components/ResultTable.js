import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';
import './free/Main.css'; 

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, (res) => {
      setData(res);
    });
  }, []); 

  return (
    <>
    <div className="table-container">
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attempts</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="4">No Data Found</td>
            </tr>
          )}
          {data.length > 0 &&
            data.map((v, i) => (
              <tr className="table-body" key={i}>
                <td>{v?.username || ''}</td>
                <td>{v?.attempts || 0}</td>
                <td>{v?.points || 0}</td>
                <td>{v?.achived || ''}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
    </div>
    <br></br>
    </>
  );
  
}
