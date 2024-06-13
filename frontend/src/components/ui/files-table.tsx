import  { useEffect, useState } from 'react';
import { FileActionType, useFileContext } from './file.tsx';
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "./table";
import { getFiles, downloadFile } from '@/services/fileService';

const FilesTable = () => {
    const { state, dispatch } = useFileContext();
    const { fileList, isLoading } = state;
    console.log(fileList);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    dispatch({ type: FileActionType.FETCHING_FILES });
    try {
        const fetchedFiles = await getFiles();
        dispatch({ type: FileActionType.FETCH_FILES_SUCCESS, payload: { fileList: fetchedFiles } });
    } catch (error) {
        dispatch({ type: FileActionType.FETCH_FILES_ERROR });
    }
  };

  const handleDownload = async (filePath) => {
    try {
      await downloadFile(filePath);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  return (
    <div className="App">
      <Table className="min-w-full shadow-lg overflow-x-auto">
        <TableCaption className="text-xs sm:text-sm">Catálogo de Produtos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs sm:text-sm">Horário</TableHead>
            <TableHead className="text-xs sm:text-sm">Nome</TableHead>
            <TableHead className="text-xs sm:text-sm">Tipo</TableHead>
            <TableHead className="text-xs sm:text-sm">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fileList.map((file) => (
            <TableRow key={file.id}>
                <TableCell className="text-xs sm:text-sm">
                    {new Date(file.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-xs sm:text-sm">{file.name}</TableCell>
                <TableCell className="text-xs sm:text-sm">{file.type}</TableCell>
                <TableCell className="text-xs sm:text-sm">
                    <button
                        onClick={() => handleDownload(file.path)}
                        className="bg-transparent text-blue-500 border-none underline"
                    >Download</button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-xs sm:text-sm text-right font-bold">
              Total Arquivos: 100
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default FilesTable;
