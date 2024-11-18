"use client"
import { ChangeEvent, useState } from "react"
import * as XLSX from "xlsx"

type RowData = {
  [key: string]: string | number | boolean | null
}

const SheetEditor = () => {
  const [data, setData] = useState<RowData[]>([])
  const [selectedCell, setSelectedCell] = useState<{
    rowIndex: number
    column: string
  } | null>(null)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result
        if (arrayBuffer) {
          const workbook = XLSX.read(arrayBuffer, {
            type: "array",
            cellFormula: true,
          })
          const sheetName = workbook.SheetNames[0]
          const sheetData: RowData[] = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName]
          )
          setData(sheetData)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleCellClick = (rowIndex: number, column: string) => {
    setSelectedCell({ rowIndex, column })
  }

  const handleEdit = (rowIndex: number, column: string, value: string) => {
    const updatedData = [...data]
    updatedData[rowIndex][column] = isNaN(Number(value)) ? value : Number(value)
    setData(updatedData)
  }

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
      />
      {data.length > 0 && (
        <>
          <table
            border={1}
            style={{ marginTop: "20px", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([column, value]) => (
                    <td
                      key={column}
                      onClick={() => handleCellClick(rowIndex, column)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedCell?.rowIndex === rowIndex &&
                          selectedCell.column === column
                            ? "yellow"
                            : "white",
                      }}
                    >
                      <input
                        value={value as string}
                        onChange={(e) =>
                          handleEdit(rowIndex, column, e.target.value)
                        }
                        style={{
                          border: "none",
                          background: "transparent",
                          width: "100%",
                          textAlign: "center",
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default SheetEditor
