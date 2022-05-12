from django.core.management.base import BaseCommand

from users.models import User
from todo.models import ToDo, Project

class Command(BaseCommand):
    def handle(self, *args, **options):
        test_super_user = User.objects.create(username='admin_test', first_name='Ivan', last_name='Ivanov', email='Ivanov@ya.ru', is_superuser=True, is_staff=True)
        test_super_user.set_password('admin')
        test_super_user.save()

        test_user1 = User(username='user1', first_name='user1', last_name='user1', email='user1@ya.ru')
        test_user1.set_password('user1')
        test_user1.save()

        test_user2 = User(username='user2', first_name='user2', last_name='user2', email='user2@ya.ru')
        test_user2.set_password('user2')
        test_user2.save()

        test_user3 = User(username='user3', first_name='user3', last_name='user3', email='user3@ya.ru')
        test_user3.set_password('user3')
        test_user3.save()

        test_project = Project.objects.create(name='first_proj', repository='https://github.com/AnnaNik553/todo_project')
        test_project.users.add(test_super_user.id)

        test_todo = ToDo.objects.create(project=test_project, text='text todo', author=test_super_user, is_active=True)
