from rest_framework.serializers import ModelSerializer

from users.serializers import UserModelSerializer
from .models import Project, ToDo

class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    author = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'