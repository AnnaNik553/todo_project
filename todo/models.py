from django.db import models

from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=200)
    repository = models.URLField(blank=True, null=True)
    users = models.ManyToManyField(User)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f'id: {self.pk} | {self.name}'


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'id: {self.pk} | project: {self.project} | active {self.is_active}'
