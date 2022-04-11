from django.test import TestCase
import json

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer

from users.models import User
from users.views import UserModelViewSet
from .models import ToDo, Project
from .views import ToDoModelViewSet, ProjectModelViewSet



class TestUserModelViewSet(TestCase):


    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin123456'
        self.email = 'admin@ya.ru'
        self.data = {'username': 'user_1', 'first_name': 'user_1', 'last_name': 'user_1', 'email': 'user_1@ya.ru'}
        self.url = '/api/users/'
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)


    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        admin = self.admin
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestToDoModelViewSet(TestCase):


    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin123456'
        self.email = 'admin@ya.ru'
        self.data_edit = {'text': 'new text todo', 'is_active': False}
        self.url = '/api/todo/'
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)


    def test_get_detail_todo(self):
        todo = mixer.blend(ToDo)
        client = APIClient()
        response = client.get(f'{self.url}{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
    def test_edit_todo_guest(self):
        todo = mixer.blend(ToDo)
        client = APIClient()
        response = client.patch(f'{self.url}{todo.id}/', self.data_edit)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    
    def test_edit_todo_admin(self):
        todo = mixer.blend(ToDo)
        client = APIClient()
        admin = self.admin
        client.login(username=self.name, password=self.password)
        response = client.patch(f'{self.url}{todo.id}/', self.data_edit)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'new text todo')
        self.assertEqual(todo.is_active, False)
        client.logout()


class TestProjectModelViewSet(APITestCase):


    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin123456'
        self.email = 'admin@ya.ru'
        self.data_edit = {'name': 'second', 'repository': 'https://github.com/AnnaNik553/todo_project'}
        self.url = '/api/projects/'
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)


    def test_get_list_projects(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
    def test_edit_project_admin(self):
        project = mixer.blend(Project)
        admin = self.admin
        self.client.login(username=self.name, password=self.password)
        response = self.client.patch(f'{self.url}{project.id}/', self.data_edit)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'second')
