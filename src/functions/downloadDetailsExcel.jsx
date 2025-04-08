import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Logo from "../assets/icons/logo.png";
import { IoCloudDownload } from "react-icons/io5";

const DownloadDetailsReport = ({ data }) => {
    //console.log("Info: ", data)
  const generarExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte cotizaciones");
    const worksheetVentas = workbook.addWorksheet("Reporte de ventas");


    // CONFIGURACIÓN DE LA PRIMERA HOJA 
    
    // Diseño
    worksheet.mergeCells("A2:B3");
    worksheet.getCell("D2").font = { bold: true, size: 16 };
    worksheet.getCell("D2").alignment = { horizontal: "center", vertical: "middle" };

    worksheet.getCell("D3").value = "Período";
    worksheet.getCell("E3").value = `${data.startDate} - ${data.endDate}`;
    worksheet.getCell("D4").value = "Cliente";
    worksheet.getCell("E4").value = data.cliente || "Todos";

    const cells = ["D3", "D4", "E3", "E4"]

    
    cells.forEach((cell) => {
        worksheet.getCell(cell).font = { name: "Poppins", size: 10, bold: true };
        worksheet.getCell(cell).alignment = { horizontal: "center" };
        worksheet.getCell(cell).border = {
            top: { style: "thick", color: { argb: "00568A" } },
            left: { style: "thick", color: { argb: "00568A" } },
            bottom: { style: "thick", color: { argb: "00568A" } },
            right: { style: "thick", color: { argb: "00568A" } },
        };
        worksheet.getCell(cell).alignment = { 
            horizontal: "center",
            vertical: "middle" 
        };
    });


    worksheet.columns = [
        { key: "A", width: 30 },
        { key: "B", width: 30 },
        { key: "C", width: 30 },
        { key: "D", width: 15 }, 
        { key: "E", width: 30 }, 
    ];

    worksheet.getRow(2).height = 80;
    worksheet.getRow(3).height = 40;
    worksheet.getRow(4).height = 40; 
    worksheet.getRow(5).height = 40; 

    // Agregar imagen
    const toBase64 = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(blob);
      });
    };

    const imageBase64 = await toBase64(Logo);
    const imageId = workbook.addImage({ base64: imageBase64, extension: "png" });
    worksheet.addImage(imageId, { tl: { col: 0, row: 1 }, br: { col: 2, row: 4 } });

    // Insertar cotizaciones en la hoja
    let rowIndex = 6;
    if (data.cotizaciones?.length > 0) {
        data.cotizaciones.forEach((cotizacion) => {
            worksheet.addRow([]); 
            worksheet.getCell(`A${rowIndex}`).value = `Folio: ${cotizacion.id}`;
            worksheet.getCell(`B${rowIndex}`).value = `Fecha: ${cotizacion.fechaVenta}`;
            worksheet.getCell(`C${rowIndex}`).value = `Cliente: ${cotizacion.cliente}`;
            worksheet.getRow(rowIndex).font = { bold: true };
            worksheet.getRow(rowIndex).height = 40; 
            worksheet.getRow(rowIndex).font = { name: "Poppins", size: 12 };
            rowIndex++;

            // Encabezados de la tabla 
            worksheet.addRow(["Producto", "Categoría", "Precio Unitario", "Cantidad", "Total"]).eachCell((cell) => {
                cell.font = { name: 'Poppins', size: 12, color: { argb: 'FFFFFF' } };
                cell.alignment = { 
                    horizontal: "center",
                    vertical: "middle" 
                };
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "00568A" } }; 
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" },
                    bottom: { style: "thin" },
                };
            });
            worksheet.getRow(rowIndex).height = 50;
            rowIndex++;

            // Agregar productos de la cotización
            let totalCotizacion = 0;
            cotizacion.productos.forEach((producto) => {
                const total = producto.precioUnitario * producto.cantidad;
                totalCotizacion += total;

                // Agregar producto
                worksheet.addRow([ 
                    producto.producto, producto.categoria, 
                    `$${producto.precioUnitario}`, producto.cantidad,`$${total}`,
                ]);

                worksheet.getRow(rowIndex).height = 60;

                worksheet.getCell(`A${rowIndex}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
                worksheet.getCell(`B${rowIndex}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
                worksheet.getCell(`C${rowIndex}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
                worksheet.getCell(`D${rowIndex}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
                worksheet.getCell(`E${rowIndex}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };

                worksheet.getRow(rowIndex).font = { name: "Poppins", size: 12 };
                rowIndex++;
            });

            // Total de la cotización
            worksheet.addRow(["Total", "", "", "", `$${totalCotizacion}`]).eachCell((cell) => {
                cell.font = { name: "Poppins", size: 12, bold: true };
                cell.border = { top: { style: "thick" }, bottom: { style: "thick" } };
            });
            worksheet.getRow(rowIndex).height = 30;
            rowIndex++;

            worksheet.addRow([]); 
            worksheet.getRow(rowIndex).height = 50; 
            rowIndex++;
        });
    }



    




    // CONFIGURACION DE LA HOJA 2

    // Diseño
    worksheetVentas.mergeCells("A2:B3");
    worksheetVentas.getCell("D2").font = { bold: true, size: 16 };
    worksheetVentas.getCell("D2").alignment = { horizontal: "center", vertical: "middle" };

    worksheetVentas.getCell("D3").value = "Período";
    worksheetVentas.getCell("E3").value = `${data.startDate} - ${data.endDate}`;
    worksheetVentas.getCell("D4").value = "Cliente";
    worksheetVentas.getCell("E4").value = data.cliente || "Todos";

    const cellsVentas = ["D3", "D4", "E3", "E4"]

    
    cellsVentas.forEach((cell) => {
        worksheetVentas.getCell(cell).font = { name: "Poppins", size: 10, bold: true };
        worksheetVentas.getCell(cell).alignment = { horizontal: "center" };
        worksheetVentas.getCell(cell).border = {
            top: { style: "thick", color: { argb: "00568A" } },
            left: { style: "thick", color: { argb: "00568A" } },
            bottom: { style: "thick", color: { argb: "00568A" } },
            right: { style: "thick", color: { argb: "00568A" } },
        };
        worksheetVentas.getCell(cell).alignment = { 
            horizontal: "center",
            vertical: "middle" 
        };
    });


    worksheetVentas.columns = [
        { key: "A", width: 70 },
        { key: "B", width: 30 },
        { key: "C", width: 30 },
        { key: "D", width: 15 }, 
        { key: "E", width: 30 }, 
    ];

    worksheetVentas.getRow(2).height = 80;
    worksheetVentas.getRow(3).height = 40;
    worksheetVentas.getRow(4).height = 40; 
    worksheetVentas.getRow(5).height = 40; 

    // Agregar imagen
    const toBase64Ventas = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(blob);
        });
    };

    const imageBase64Ventas = await toBase64Ventas(Logo);
    const imageIdVentas = workbook.addImage({ base64: imageBase64Ventas, extension: "png" });
    worksheetVentas.addImage(imageIdVentas, { tl: { col: 0, row: 1 }, br: { col: 1, row: 4 } });

    // Insertar ventas en la hoja
    let rowIndexVentas = 6;
    if (data.ventas?.length > 0) {
        data.ventas.forEach((venta) => {
            worksheetVentas.addRow([]); 
            worksheetVentas.getCell(`A${rowIndexVentas}`).value = `Folio: ${venta.id}`;
            worksheetVentas.getCell(`B${rowIndexVentas}`).value = `Fecha: ${venta.fechaVenta}`;
            worksheetVentas.getCell(`C${rowIndexVentas}`).value = `Cliente: ${venta.cliente}`;
            worksheetVentas.getRow(rowIndexVentas).font = { bold: true };
            worksheetVentas.getRow(rowIndexVentas).height = 40; 
            worksheetVentas.getRow(rowIndexVentas).font = { name: "Poppins", size: 12 };
            rowIndexVentas++;

            // Encabezados de la tabla 
            worksheetVentas.addRow(["Producto", "Categoría", "Precio Unitario", "Cantidad", "Total"]).eachCell((cell) => {
                cell.font = { name: 'Poppins', size: 12, color: { argb: 'FFFFFF' } };
                cell.alignment = { 
                    horizontal: "center",
                    vertical: "middle" 
                };
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "00568A" } }; 
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" },
                    bottom: { style: "thin" },
                };
            });
            worksheetVentas.getRow(rowIndexVentas).height = 50;
            rowIndexVentas++;

            // Agregar productos de la cotización
            let totalVenta = 0;
            venta.productos.forEach((producto) => {
                const total = producto.precioUnitario * producto.cantidad;
                totalVenta += total;

                // Agregar producto
                worksheetVentas.addRow([ 
                    producto.producto, producto.categoria, 
                    `$${producto.precioUnitario}`, producto.cantidad,`$${total}`,
                ]);

                worksheetVentas.getRow(rowIndexVentas).height = 60;

                worksheetVentas.getCell(`A${rowIndexVentas}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
                worksheetVentas.getCell(`B${rowIndexVentas}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
                worksheetVentas.getCell(`C${rowIndexVentas}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
                worksheetVentas.getCell(`D${rowIndexVentas}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
                worksheetVentas.getCell(`E${rowIndexVentas}`).alignment = { wrapText: true, horizontal: "center", vertical: "middle" };

                worksheetVentas.getRow(rowIndexVentas).font = { name: "Poppins", size: 12 };
                rowIndexVentas++;
            });

            // Total de la cotización
            worksheetVentas.addRow(["Total", "", "", "", `$${totalVenta}`]).eachCell((cell) => {
                cell.font = { name: "Poppins", size: 12, bold: true };
                cell.border = { top: { style: "thick" }, bottom: { style: "thick" } };
            });
            worksheetVentas.getRow(rowIndexVentas).height = 30;
            rowIndexVentas++;

            worksheetVentas.addRow([]); 
            worksheetVentas.getRow(rowIndexVentas).height = 50; 
            rowIndexVentas++;
        });
    }
    

    // Guardar archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const nombreArchivo = `Reporte Detallado ${data.startDate} al ${data.endDate}.xlsx`;
    saveAs(
      new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
      nombreArchivo
    );
  };

  return (
    <button className="h-[95%] w-full rounded-3xl bg-header p-2" onClick={generarExcel}>
      <IoCloudDownload className="p-4 h-full w-full" />
    </button>
  );
};

export default DownloadDetailsReport;
