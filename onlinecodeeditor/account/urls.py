from django.urls import path
from . import views

urlpatterns = [
     path('login/',views.login_user, name="login"),
     path('logout/',views.logout_user, name="logout"),
     path('profile/', views.edit_profile, name="profile"),
     path('', views.signup_user, name="signup"),
]