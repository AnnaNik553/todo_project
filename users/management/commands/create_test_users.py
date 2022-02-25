from django.core.management.base import BaseCommand

from users.models import User

class Command(BaseCommand):
    def handle(self, *args, **options):
        test_super_user = User(username='admin_test', first_name='Ivan', last_name='Ivanov', email='Ivanov@ya.ru', is_superuser=True, is_staff=True)
        test_super_user.set_password('admin')
        test_super_user.save()

        test_user1 = User(username='user1', first_name='user1', email='user1@ya.ru')
        test_user1.set_password('user1')
        test_user1.save()

        test_user2 = User(username='user2', first_name='user2', email='user2@ya.ru')
        test_user2.set_password('user2')
        test_user2.save()

        test_user3 = User(username='user3', first_name='user3', email='user3@ya.ru')
        test_user3.set_password('user3')
        test_user3.save()
