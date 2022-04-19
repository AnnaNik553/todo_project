from graphene import ObjectType, String, Int, ID, List, Schema, Field, Mutation, Boolean
from graphene_django import DjangoObjectType

from todo.models import ToDo, Project
from users.models import User


class UserType(DjangoObjectType):

    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):

    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'



class Query(ObjectType):

# получение списка
    all_users = List(UserType)
    all_todo = List(ToDoType)
    all_projects = List(ProjectType)

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()
    
# получение одного объекта по id
    user_by_id = Field(UserType, id=Int(required=True))
    todo_by_id = Field(ToDoType, id=Int(required=True))
    project_by_id = Field(ProjectType, id=Int(required=True))

    def resolve_user_by_id(self, info, id=None):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None
    
    def resolve_todo_by_id(self, info, id=None):
        try:
            return ToDo.objects.get(id=id)
        except ToDo.DoesNotExist:
            return None
    
    def resolve_project_by_id(self, info, id=None):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

# фильтрация
    todo_by_author_last_name = List(ToDoType, last_name=String(required=False))
    todo_by_project_name = List(ToDoType, name=String(required=False))
    project_by_username = List(ProjectType, username=String(required=False))

    def resolve_todo_by_author_last_name(self, info, last_name=None):
        todo_list = ToDo.objects.all()
        if last_name:
            todo_list = todo_list.filter(author__last_name=last_name)
        return todo_list

    def resolve_todo_by_project_name(self, info, name=None):
        todo_list = ToDo.objects.all()
        if name:
            todo_list = todo_list.filter(project__name=name)
        return todo_list

    def resolve_project_by_username(self, info, username=None):
        projects = Project.objects.all()
        if username:
            projects = projects.filter(users__username=username)
        return projects

# изменение данных todo
class TodoUpdateMutation(Mutation):
    class Arguments:
        text = String(required=True)
        id = ID()

    todo = Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo = ToDo.objects.get(id=id)
        todo.text = text
        todo.save()
        return TodoUpdateMutation(todo=todo)

class TodoCreateMutation(Mutation):
    class Arguments:
        project_id = Int(required=True)
        text = String(required=True)
        author_id = Int(required=True)
        is_active = Boolean(default_value=True)

    todo = Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, project_id, text, author_id, is_active):
        project = Project.objects.get(id=project_id)
        author = User.objects.get(id=author_id)
        todo = ToDo.objects.create(project=project, text=text, author=author, is_active=is_active)
        return TodoCreateMutation(todo=todo)

class TodoDeleteMutation(Mutation):
    class Arguments:
        id = ID()

    todo = List(ToDoType)

    @classmethod
    def mutate(cls, root, info, id):
        ToDo.objects.get(id=id).delete()
        return TodoUpdateMutation(todo=ToDo.objects.all())

class Mutation(ObjectType):
    update_todo = TodoUpdateMutation.Field()
    create_todo = TodoCreateMutation.Field()
    delete_todo = TodoDeleteMutation.Field()


schema = Schema(query=Query, mutation=Mutation)