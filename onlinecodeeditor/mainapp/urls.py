from django.urls import path
from . import views
urlpatterns = [
    path('home',views.mainpage,name='mainpage'),
    path('pythonEditor/',views.python,name='python'),
    path('frontendEditor/',views.frontend,name='frontend')
]
