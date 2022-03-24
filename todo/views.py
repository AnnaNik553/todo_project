from rest_framework.viewsets import ModelViewSet

from .serializers import ToDoModelSerializer, ProjectModelSerializer
from .models import Project, ToDo


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer





