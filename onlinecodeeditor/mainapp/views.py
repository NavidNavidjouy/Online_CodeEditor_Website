from django.shortcuts import render

def mainpage(request):
    return render(request,'index.html')
def python(request):
    return render(request,'python-editor.html')
def frontend(request):
    return render(request,'frontend-editor.html')