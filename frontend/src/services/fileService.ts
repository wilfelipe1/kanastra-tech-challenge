import axios from 'axios';
import toast from 'react-simple-toasts';


const uploadFile = async (file: File) => {
    let uploadUrl: string;

    // Inicializa o upload e obtém a URL de upload
    try {
        const initResponse = await axios.post('http://localhost:8000/files', {
            name: file.name,
            type: file.type
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        uploadUrl = initResponse.data.upload_url;

        if (!uploadUrl) {
            throw new Error('Upload URL not provided by the server');
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to initialize upload');
    }

    // Realiza o upload do arquivo para a URL obtida
    try {
        const uploadResponse = await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type
            }
        });
        toast('File uploaded successfully', {  className: 'success' });
        return uploadResponse.data; // Retorna a resposta do servidor após o upload
    } catch (error: any) {
        toast('Failed to upload the file', { className: 'danger' });
    }
};

const getFiles = async () => {
    try {
        const response = await axios.get('http://localhost:8000/files');
        return response.data;
    } catch (error: any) {
        toast('Failed to fetch files', { className: 'danger' });
    }
}


const downloadFile = async (filePath: string) => {
    try {
        // Fazendo a solicitação para o endpoint de download
        const response = await axios.get(`http://localhost:8000/files/${filePath}`);

        // Obtendo a URL de download da resposta
        const downloadUrl = response.data.download_url;

        // Criando um elemento <a> temporário para disparar o download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', ''); // O atributo 'download' sugere que o link seja baixado ao invés de navegado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        // Tratando erros, exibindo uma mensagem com toast em caso de falha
        toast('Failed to download file', { className: 'danger' });
        console.error('Download error:', error);
    }
}

export { uploadFile, getFiles, downloadFile };
