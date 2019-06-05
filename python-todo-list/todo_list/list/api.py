from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Section, Job
from .serializers import SectionSerializer,JobSerializer

class SectionViewSet(viewsets.ModelViewSet):
    
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class JobViewSet(viewsets.ModelViewSet):
    
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def partial_update(self, request, pk=None):
        data = request.data
        section = data.get('section', '')
        name = data.get('name', '')
        description = data.get('description', '')
        if section and pk:
            job = Job.objects.get(id=pk)
            if job:
                job.section = Section.objects.get(id=section)
                job.save()
                return Response({'sucess':True}, status=status.HTTP_200_OK)
        elif name and pk:
            job = Job.objects.get(id=pk)
            if job:
                job.name = name
                job.save()
                return Response({'sucess':True}, status=status.HTTP_200_OK)
        elif description and pk:
            job = Job.objects.get(id=pk)
            if job:
                job.description = description
                job.save()
                return Response({'sucess':True}, status=status.HTTP_200_OK)
        return Response('err', status=status.HTTP_400_BAD_REQUEST)
