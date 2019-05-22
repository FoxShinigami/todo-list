from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Section
from .serializers import SectionSerializer

class SectionViewSet(viewsets.ModelViewSet):
    
    queryset = Section.objects.all()
    serializer_class = SectionSerializer