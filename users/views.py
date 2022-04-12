from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins

from .models import User
from .serializers import UserModelSerializer, UserWithIsStaffModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserWithIsStaffModelSerializer
        return UserModelSerializer
