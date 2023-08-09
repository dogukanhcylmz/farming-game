'use client'

import React, { useState, useEffect } from 'react';
import './style.css';
import { useRouter } from 'next/navigation';

const numRows = 5;
const numCols = 5;

export default function Page() {

  const router = useRouter();

  const initialMatrixData = Array.from({ length: numRows }, () => Array(numCols).fill('T'));

  const [matrixData, setMatrixData] = useState<string[][]>(initialMatrixData);
  const [budget, setBudget] = useState<number>(100); 


  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if(budget <= 0){
      alert("Game Over!!!");
      router.push('/gameover');
    }

    if (matrixData[rowIndex][colIndex] === 'T') {
      const updatedMatrix = matrixData.map((row, rIndex) =>
        row.map((cellValue, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            setBudget(prevBudget => prevBudget -5); 
            return 'F';
          }
          return cellValue;
        })
      );
      setMatrixData(updatedMatrix);
    } else if (matrixData[rowIndex][colIndex] === 'D') {
      setBudget(prevBudget => prevBudget +10); 
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixData((prevMatrixData) =>
        prevMatrixData.map((row) =>
          row.map((cellValue) => {
            if (cellValue === 'F') return 'D';
            else if (cellValue === 'D') return 'Ç';
            else return cellValue;
          })
        )
      );
    }, 3000);
  
    const timeout = setTimeout(() => {
      setMatrixData((prevMatrixData) =>
        prevMatrixData.map((row) =>
          row.map((cellValue) => {
            if (cellValue === 'D') return 'Ç';
            else return cellValue;
          })
        )
      );
    }, 10000);
  
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  

  return (
    <div className="container">
      <br />
      <h2>YTE-VILLE</h2>
      <hr />
      <br />
      <h2>Farm: {budget}$</h2> 

      <table>
        <tbody>
          {matrixData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cellValue, colIndex) => (
                <td
                  key={colIndex}
                  className="cell"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cellValue}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="eastLabel">Mehmet Doğukan Hiçyılmaz</div> 

    </div>
  );
}
