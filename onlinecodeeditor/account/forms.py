from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms

class SignUpForm(UserCreationForm):
    first_name = forms.CharField(
        label="",
        max_length=20,
        widget=forms.TextInput(attrs={'class':'input','placeholder':'First Name'})
    )
    last_name = forms.CharField(
        label="",
        max_length=20,
        widget=forms.TextInput(attrs={'class':'input','placeholder':'Last Name'})
    )    
    email = forms.EmailField(
        label="",
        widget=forms.TextInput(attrs={'class':'input','placeholder':'Email'})
    ) 
    username = forms.CharField(
        label="",
        max_length=20,
        widget=forms.TextInput(attrs={'class':'input','placeholder':'Username'})
    )  
    password1 = forms.CharField(
        label="",
        widget=forms.PasswordInput(
            attrs={
                'class' : 'input',
                'name'  : 'password',
                'type' : 'password',
                'placeholder' : 'Password: numbers, letters, at least 8 characters'

            }
        )
    )
    password2 = forms.CharField(
        label="",
        widget=forms.PasswordInput(
            attrs={
                'class' : 'input',
                'name'  : 'password',
                'type' : 'password',
                'placeholder' : 'Password again'

            }
        )
    )
    class Meta:
        model = User
        fields = ('first_name','last_name','email','username','password1','password2')



class UserProfileForm(forms.ModelForm):
    # profile_picture = forms.ImageField(required=False)
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        labels = {
            'username':'Username',
            'email':'Email',
            'first_name':'First Name ',
            'last_name':'Last Name'
        }