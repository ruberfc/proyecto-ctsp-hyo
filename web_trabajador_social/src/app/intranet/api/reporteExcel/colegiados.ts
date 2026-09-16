import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ColegiadoFiltro } from '../model/interface/colegiado';
import { formatRegistrationDate } from '../../tools/helper';

export const exportToExcelJSColegiados = async (data: ColegiadoFiltro[], filename = "Reporte Excel Marcación Coordinadores y Mas", codigo: string, usuario: string) => {


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hoja 1');

    // Definir el título
    const title = "Registro de Colegiados de la Region VI - Huancayo - Junin";
    const titleRow = worksheet.addRow([title]);

    // Fusionar celdas del título
    worksheet.mergeCells('A1:N1');
    titleRow.getCell(1).font = { bold: true, size: 16, color: { argb: '166bff' } };
    titleRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };

    // Fila en blanco después del título
    worksheet.addRow([]);

    // Definir estilos para los encabezados
    const headerStyle = {
        font: { bold: true, color: { argb: 'FFFFFF' } },
        fill: { type: "pattern" as const, pattern: "solid" as const, fgColor: { argb: "3980fb" } },
        alignment: { horizontal: "center" as const, vertical: "middle" as const },
        border: {
          top: { style: "thin" as const },
          left: { style: "thin" as const },
          bottom: { style: "thin" as const },
          right: { style: "thin" as const }
        }
      };

    // Encabezados ajustados
    const headers = ["#", "CÓDIGO", "DNI", "APELLIDOS", "NOMBRES", "ESPECIALIDAD", "CELULAR", "CORREO",
        "DIRECCIÓN", "SEXO", "FECHA NACIMIENTO", "ESTADO", "HABILIDAD", "ULTIMA FECHA"];
    const headerRow = worksheet.addRow(headers);

    // Aplicar estilos a los encabezados
    headers.forEach((_, colIndex) => {
        headerRow.getCell(colIndex + 1).style = headerStyle;
    });

    // Procesar datos
    let currentRow = (worksheet.lastRow?.number ?? 0) + 1; // Empieza después de los encabezados

    await data.forEach((item, index) => {
        // const detalles = Array.isArray(item.detalles) ? item.detalles : [];
        // const startRow = currentRow;
        // const endRow = startRow + (detalles.length > 0 ? detalles.length - 1 : 0);

        // Agregar la primera fila con datos generales
        worksheet.addRow([
            index + 1, 
            item.codigo_colegiado ?? '', 
            item.numero_documento ?? '',
            item.apellidos ?? '',
            item.nombres ?? '',
            item.nombre_especialidad ?? '',
            item.celular ?? '',
            item.correo_personal ?? '',
            item.direccion ?? '',
            item.sexo === 1 ? 'MASCULINO' : item.sexo === 2 ? 'FEMENINO' : '-',
            item.fecha_nacimiento === '' ? '-' : item.fecha_nacimiento === '1900-01-01' ? '-' : formatRegistrationDate(item.fecha_nacimiento),
            item.estado === 1 ? 'ACTIVO' : item.sexo === 0 ? 'INACTIVO' : '-',
            item.habilitacion === 1 ? 'HABILITADO' : item.sexo === 0 ? 'INHABILITADO' : '-',
            item.fecha_fin === '' ? '-' : item.fecha_fin === '1900-01-01' ? '-' : formatRegistrationDate(item.fecha_fin)

        ]);

        // Agregar filas para los detalles (sin repetir los datos generales)
        // detalles.slice(1).forEach(det => {

        //     const condicionKey = parseInt(det.condicion, 10); // Asegurar que es un número
        //     const condMacTextGen = condicionesMarcacion[condicionKey] ?? det.condicion; // Si no encuentra, usa el valor original

        //     worksheet.addRow([
        //         '', '', '', '', '', '',  // Vacío para columnas combinadas
        //         det.puertaIngreso ?? '', det.puertaSalida ?? '',
        //         det.horaIngreso ?? '', det.horaSalida ?? '',
        //         det.diferenciaHoras ?? '', condMacTextGen ?? ''
        //     ]);
        // });

        // Combinar celdas de columnas principales si hay múltiples detalles
        // if (detalles.length > 1) {
        //     ["A", "B", "C", "D", "E", "F"].forEach(col => {
        //         worksheet.mergeCells(`${col}${startRow}:${col}${endRow}`)

        //         // Aplicar alineación centrada verticalmente
        //         const mergedCell = worksheet.getCell(`${col}${startRow}`);

        //         mergedCell.alignment = { vertical: 'middle', /*horizontal: 'center',*/ wrapText: true };

        //     });

        //     // Aplicar color de fondo a la celda combinada en "T. H. CRONOLÓGICAS"
        //     worksheet.getCell(`F${startRow}`).fill = {
        //         type: 'pattern',
        //         pattern: 'solid',
        //         fgColor: { argb: 'FFFF00' } // Fondo amarillo
        //     };
        // }

        //currentRow = endRow + 1; // Avanzar a la siguiente fila disponible
    });


    // Obtener la última fila con datos
    const lastRow = worksheet.rowCount;
    const startRow = 4; // Ajusta según la primera fila con datos

    for (let row = startRow; row <= lastRow; row++) {
        const cellValue = worksheet.getCell(`A${row}`).value; // Tomar el valor de la columna "#"

        if (typeof cellValue === 'number' && cellValue % 2 === 0) { // Verificar si es par
            worksheet.getRow(row).eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'eeeeee' }
                };
            });
        }
    }

    //  Aplicar el color a toda la columna "T. H. CRONOLÓGICAS" (columna F)
    // const startRow = 4; // Ajusta según dónde empiezan los datos
    // const lastRow = worksheet.rowCount; // Última fila con datos

    for (let row = startRow; row <= lastRow; row++) {
        worksheet.getCell(`B${row}`).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'f1faff' }
        };
    }

    // Agregar fila en blanco después de los datos
    worksheet.addRow([]);

    // Pie de página
    const footerMessage = `Generado por: ${codigo} - ${usuario} el ${new Date().toLocaleString()}`;
    const footerRow = worksheet.addRow([footerMessage]);

    // Fusionar celdas del pie de página
    worksheet.mergeCells(`A${footerRow.number}:N${footerRow.number}`);
    footerRow.getCell(1).font = { italic: true, color: { argb: '000000' } };
    footerRow.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };

    // Ajustar tamaños de columnas
    worksheet.columns = [
        { width: 5 }, { width: 12 }, { width: 12 }, { width: 40 }, { width: 40 }, { width: 25 },
        { width: 12 }, { width: 20 }, { width: 40 }, { width: 12 }, { width: 20 }, { width: 12 },
        { width: 12 }, { width: 20 }
    ];

    // Generar archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${filename}.xlsx`);

};


// const workbook = new ExcelJS.Workbook();
// const worksheet = workbook.addWorksheet('Hoja 1');

// // Definir el título
// const title = "Reporte de Marcaciones de Coodinadores y Mas";
// const titleRow = worksheet.addRow([title]);

// // Fusionar celdas del título
// worksheet.mergeCells('A1:L1');
// titleRow.getCell(1).font = { bold: true, size: 16, color: { argb: '166bff' } };
// titleRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };

// // Fila en blanco después del título
// worksheet.addRow([]);

// // Definir estilos para los encabezados
// const headerStyle = {
//     font: { bold: true, color: { argb: 'FFFFFF' } },
//     fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '3980fb' } },
//     alignment: { horizontal: 'center', vertical: 'middle' },
//     border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
// };

// // Encabezados ajustados
// const headers = ["#", "DNI", "NOMBRES", "FECHA", "DIA", "T. H. CRONOLOGICAS",
//     "PUERTA INGRESO", "PUERTA SALIDA", "HORA INGRESO", "HORA SALIDA", "DIF. HORAS", "CONDICIÓN"];
// const headerRow = worksheet.addRow(headers);

// // Aplicar estilos a los encabezados
// headers.forEach((_, colIndex) => {
//     headerRow.getCell(colIndex + 1).style = headerStyle;
// });

// // Procesar datos
// let currentRow = worksheet.lastRow.number + 1; // Empieza después de los encabezados

// await data.forEach((item, index) => {
//     const detalles = Array.isArray(item.detalles) ? item.detalles : [];
//     const startRow = currentRow;
//     const endRow = startRow + (detalles.length > 0 ? detalles.length - 1 : 0);

//     // Agregar la primera fila con datos generales
//     worksheet.addRow([
//         index + 1, item.dni ?? '', item.nombres ?? '',
//         item.fechaIngreso ?? '', item.diaSemanaEsp ?? '',
//         item.total_horario ?? '',
//         detalles.length > 0 ? detalles[0].puertaIngreso ?? '' : '',
//         detalles.length > 0 ? detalles[0].puertaSalida ?? '' : '',
//         detalles.length > 0 ? detalles[0].horaIngreso ?? '' : '',
//         detalles.length > 0 ? detalles[0].horaSalida ?? '' : '',
//         detalles.length > 0 ? detalles[0].diferenciaHoras ?? '' : '',
//         detalles.length > 0 ? condicionesMarcacion[parseInt(detalles[0].condicion, 10)] ?? detalles[0].condicion : ''
//     ]);

//     // Agregar filas para los detalles (sin repetir los datos generales)
//     detalles.slice(1).forEach(det => {

//         const condicionKey = parseInt(det.condicion, 10); // Asegurar que es un número
//         const condMacTextGen = condicionesMarcacion[condicionKey] ?? det.condicion; // Si no encuentra, usa el valor original

//         worksheet.addRow([
//             '', '', '', '', '', '',  // Vacío para columnas combinadas
//             det.puertaIngreso ?? '', det.puertaSalida ?? '',
//             det.horaIngreso ?? '', det.horaSalida ?? '',
//             det.diferenciaHoras ?? '', condMacTextGen ?? ''
//         ]);
//     });

//     // Combinar celdas de columnas principales si hay múltiples detalles
//     if (detalles.length > 1) {
//         ["A", "B", "C", "D", "E", "F"].forEach(col => {
//             worksheet.mergeCells(`${col}${startRow}:${col}${endRow}`)

//             // Aplicar alineación centrada verticalmente
//             const mergedCell = worksheet.getCell(`${col}${startRow}`);

//             mergedCell.alignment = { vertical: 'middle', /*horizontal: 'center',*/ wrapText: true };

//         });

//         // Aplicar color de fondo a la celda combinada en "T. H. CRONOLÓGICAS"
//         // worksheet.getCell(`F${startRow}`).fill = {
//         //     type: 'pattern',
//         //     pattern: 'solid',
//         //     fgColor: { argb: 'FFFF00' } // Fondo amarillo
//         // };
//     }

//     currentRow = endRow + 1; // Avanzar a la siguiente fila disponible
// });


// // Obtener la última fila con datos
// const lastRow = worksheet.rowCount;
// const startRow = 4; // Ajusta según la primera fila con datos

// for (let row = startRow; row <= lastRow; row++) {
//     const cellValue = worksheet.getCell(`A${row}`).value; // Tomar el valor de la columna "#"

//     if (typeof cellValue === 'number' && cellValue % 2 === 0) { // Verificar si es par
//         worksheet.getRow(row).eachCell((cell) => {
//             cell.fill = {
//                 type: 'pattern',
//                 pattern: 'solid',
//                 fgColor: { argb: 'eeeeee' }
//             };
//         });
//     }
// }

// //  Aplicar el color a toda la columna "T. H. CRONOLÓGICAS" (columna F)
// // const startRow = 4; // Ajusta según dónde empiezan los datos
// // const lastRow = worksheet.rowCount; // Última fila con datos

// for (let row = startRow; row <= lastRow; row++) {
//     worksheet.getCell(`F${row}`).fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: 'f1faff' }
//     };
// }

// // Agregar fila en blanco después de los datos
// worksheet.addRow([]);

// // Pie de página
// const footerMessage = `Generado por: ${codigo} - ${usuario} el ${new Date().toLocaleString()}`;
// const footerRow = worksheet.addRow([footerMessage]);

// // Fusionar celdas del pie de página
// worksheet.mergeCells(`A${footerRow.number}:L${footerRow.number}`);
// footerRow.getCell(1).font = { italic: true, color: { argb: '000000' } };
// footerRow.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };

// // Ajustar tamaños de columnas
// worksheet.columns = [
//     { width: 5 }, { width: 12 }, { width: 40 }, { width: 15 }, { width: 12 }, { width: 25 },
//     { width: 40 }, { width: 40 }, { width: 15 }, { width: 15 }, { width: 12 }, { width: 25 }
// ];

// // Generar archivo Excel
// const buffer = await workbook.xlsx.writeBuffer();
// const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// saveAs(blob, `${filename}.xlsx`);
