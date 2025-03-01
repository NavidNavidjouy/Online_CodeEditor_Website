from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms
from .forms import SignUpForm
from .forms import UserProfileForm
from django.urls import reverse_lazy

def login_user(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("mainpage")
        else:
            messages.success(request, ("User with this profile was not found"))
            return redirect("login")
    else:    
        return render(request, 'login.html')

def logout_user(request):
    logout(request)
    return redirect("mainpage")

def signup_user(request):
    form = SignUpForm()
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username  = form.cleaned_data['username']
            password1 = form.cleaned_data['password1']
            user = authenticate(request, username=username, password=password1)
            login(request, user)
            messages.success(request, ("account create"))
            return redirect("mainpage")
        else:
            messages.error(request, ("There was a problem with your registration: check the password conditions and try again, pay attention to repeating the password."))
            return redirect("mainpage")
    else:    
     return render(request, 'signup.html', {'form':form})

def edit_profile(request):
    user = request.user
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()
            return redirect('mainpage')
    else:
        form = UserProfileForm(instance=user)
    return render(request, 'profile.html', {'form': form})