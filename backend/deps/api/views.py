from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from dependency_injector.wiring import inject, Provide

from debts.containers import Container
from debts.services import StorageService
from debts.models import File
from .serializers import FileSerializer, FileSerializerResponse

class FilesView(APIView):
    @inject
    def post(
            self,
            request,
            storage_service: StorageService = Provide[Container.storage_service],
        ):
        file = FileSerializer(data=request.data)
        if file.is_valid():
            file_name = file.validated_data.get('name')
            upload_url, path = storage_service.generate_presigned_upload_url(file_name)
            file.save(path=path)
            return Response({'upload_url': upload_url })
        return Response(file.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        files = File.objects.all()
        if files:
            serializer = FileSerializerResponse(files, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class FileView(APIView):
    @inject
    def get(
        self,
        request,
        file_path,
        storage_service: StorageService = Provide[Container.storage_service],
    ):
        file = storage_service.generate_presigned_download_url(file_path)
        return Response({'download_url': file })
