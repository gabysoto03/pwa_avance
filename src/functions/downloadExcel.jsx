import React from "react";
import ExcelJS, { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import Logo from '../assets/icons/logo.png';
import { IoCloudDownload } from "react-icons/io5";


const DownloadGeneralReport = ({data}) => {

    const generarExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reporte general");

        //Fusionar todas las celdas necesarias
        worksheet.mergeCells("D2:G4");
        worksheet.mergeCells("I3:J3");
        worksheet.mergeCells("I4:J4");
        worksheet.mergeCells("E6:F6");
        worksheet.mergeCells("H6:I6");
        worksheet.mergeCells("E7:F7");
        worksheet.mergeCells("E9:F9");
        worksheet.mergeCells("H9:I9");
        worksheet.mergeCells("H7:I7");

        // Aplicar configuraciones globales de las celdas o algunas celdas
        const cells = [
            "D2", "H9", "H3", "I3", "H4", "I4", "E6", "H6", "E9", "E10", "F10", "E11", "F11", "H10", "I10", "H11", "I11", "D14", "I15", "J15"
          ];

        const cellsValues = [
            "E7", "H7"
        ];

        const borderFuerte = [
            "H3", "H4", "I3", "I4", "E6" , "E7", "H6", "H7", "I15", "J15" 
        ];

        const lightBorder = [
            "E9", "E10", "E11", "F10", "F11", "H9", "H10", "H11", "I10", "I11"
        ]

        cells.forEach(cell => {
            const targetCell = worksheet.getCell(cell);
            targetCell.alignment = { horizontal: "center", vertical: "middle" };
            targetCell.font = { name: "Poppins", size: 10 };
        });

        cellsValues.forEach(cell => {
            const targetCell = worksheet.getCell(cell);
            targetCell.alignment = { horizontal: "center", vertical: "middle" };
            targetCell.font = { name: "Poppins", size: 40 };
        });

        borderFuerte.forEach(cell => {
            const targetCell = worksheet.getCell(cell);
            targetCell.border = {
                top: { style: "thick", color: { argb: "00568A" } },
                left: { style: "thick", color: { argb: "00568A" } },
                bottom: { style: "thick", color: { argb: "00568A" } },
                right: { style: "thick", color: { argb: "00568A" } },
              };
        });


        lightBorder.forEach(cell => {
            const targetCell = worksheet.getCell(cell);
            targetCell.border = {
                top: { style: "thick", color: { argb: "00adee" } },
                left: { style: "thick", color: { argb: "00adee" } },
                bottom: { style: "thick", color: { argb: "00adee" } },
                right: { style: "thick", color: { argb: "00adee" } },
              };
        });

        //Aplicar colores de fondo
        worksheet.getCell('E6').fill = { type: "pattern", pattern: "solid", fgColor: { argb: "00568A" } };
        worksheet.getCell('H6').fill = { type: "pattern", pattern: "solid", fgColor: { argb: "00568A" } };
        worksheet.getCell('I15').fill = { type: "pattern", pattern: "solid", fgColor: { argb: "00568A" } };

        worksheet.getCell('E9').fill = { type: "pattern", pattern: "solid", fgColor: { argb: "00adee" } };
        worksheet.getCell('H9').fill = { type: "pattern", pattern: "solid", fgColor: { argb: "00adee" } };

        // Colocar valores por defecto
        worksheet.getCell('H3').value = "Período";
        worksheet.getCell('H4').value = "Cliente";
        worksheet.getCell('E6').value = "Ventas";
        worksheet.getCell('H6').value = "Cotizaciones";
        worksheet.getCell('E9').value = "Ventas";
        worksheet.getCell('E10').value = "Número de ventas";
        worksheet.getCell('E11').value = "Cantidad vendida";
        worksheet.getCell('H9').value = "Cotizaciones";
        worksheet.getCell('H10').value = "Número de cotizaciones";
        worksheet.getCell('H11').value = "Dinero cotizado";
        worksheet.getCell('I15').value = "Comisiones";

        // Valores de data 
        worksheet.getCell('I3').value = `${data.startDate} - ${data.endDate}`;
        worksheet.getCell('I4').value = data.cliente || "Todos";
        worksheet.getCell('E7').value = data.ventasCount;
        worksheet.getCell('H7').value = data.cotizacionesCount;
        worksheet.getCell('F10').value = data.ventasCount;
        worksheet.getCell('F11').value = data.cantVentas;
        worksheet.getCell('I10').value = data.cotizacionesCount;
        worksheet.getCell('I11').value = data.cantCotizaciones;
        worksheet.getCell('J15').value = data.comision;



        // Color blanco de las letras
        worksheet.getCell('E6').font = { name: 'Poppins', size: 14, color: { argb: 'FFFFFF' } };
        worksheet.getCell('E9').font = { name: 'Poppins', size: 14, color: { argb: 'FFFFFF' } };
        worksheet.getCell('H6').font = { name: 'Poppins', size: 14, color: { argb: 'FFFFFF' } };
        worksheet.getCell('H9').font = { name: 'Poppins', size: 14, color: { argb: 'FFFFFF' } };
        worksheet.getCell('I15').font = { name: 'Poppins', size: 14, color: { argb: 'FFFFFF' } };

        //Cambiar el tamaño de las celdas 

        // Ajustar ancho de columnas
        worksheet.columns = [
            { key: "A", width: 5 },
            { key: "B", width: 5 },
            { key: "C", width: 5 },
            { key: "D", width: 10 }, 
            { key: "E", width: 20 }, 
            { key: "F", width: 20 }, 
            { key: "G", width: 25 }, 
            { key: "H", width: 25 }, 
            { key: "I", width: 20 }, 
            { key: "J", width: 10 }  
        ];

        // Ajustar altura de filas específicas
        worksheet.getRow(2).height = 80;
        worksheet.getRow(3).height = 50;
        worksheet.getRow(4).height = 50; 
        worksheet.getRow(5).height = 50; 
        worksheet.getRow(8).height = 50; 
        worksheet.getRow(7).height = 100; 
        worksheet.getRow(10).height = 55; 
        worksheet.getRow(11).height = 55; 
        worksheet.getRow(15).height = 30; 


        //Agregar foto
        const toBase64 = async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(",")[1]);
                reader.readAsDataURL(blob);
            });
        };
  
      // Obtener la imagen en formato Base64
      const imageBase64 = await toBase64(Logo);
  
      // Agregar imagen a Excel
      const imageId = workbook.addImage({
        base64: imageBase64,
        extension: "png",
      });
  
      // Insertar la imagen en el rango de celdas fusionadas (D2:G4)
      worksheet.addImage(imageId, {
        tl: { col: 3, row: 1 },
        br: { col: 6, row: 3 },
      });

       

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const nombreArchivo = `Reporte General ${data.startDate} al ${data.endDate}.xlsx`;
        saveAs(blob, nombreArchivo);
    };


    return ( 
    <div>
        <button className="h-[95%] w-full rounded-3xl bg-header p-2" onClick={generarExcel}>
            <IoCloudDownload className="p-4 h-full w-full"/>
        </button>
    </div> 
    );
}

export default DownloadGeneralReport;