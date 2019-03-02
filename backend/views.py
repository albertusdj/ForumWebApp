from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import User, ActiveUser
from django.views.decorators.csrf import ensure_csrf_cookie
from .forms import SignUpForm, LogInForm
from .utility import createHashPassword, authenticateUser, findIfUserExist
import random
import string
from datetime import datetime, timezone

@ensure_csrf_cookie
def index(request):
    token = request.COOKIES.get('login')
    activeUser = authenticateUser(token)

    if activeUser==None:
        return redirect('login')
    
    return HttpResponse('This is index')

@ensure_csrf_cookie
def login(request):
    if request.method=='GET':
        token = request.COOKIES.get('login')
        activeUser = authenticateUser(token)

        if activeUser == None:
            return render(request, 'login.html')
        else:
            return redirect('index')
    elif request.method=='POST':
        form = LogInForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = createHashPassword(form.cleaned_data['password'])

            user = User.objects.get(username=username, password=password)
            if user==None:
                return render(request, 'login.html')
            else:
                response = redirect('index')
                cookie = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(20))
                activeUser = ActiveUser(token=cookie)
                activeUser.user = user
                activeUser.created = datetime.now(timezone.utc)
                activeUser.save()
                response.set_cookie('login', cookie)
                return response

@ensure_csrf_cookie
def register(request):
    if request.method=='GET':
        return render(request, 'register.html')
    elif request.method=='POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = createHashPassword(form.cleaned_data['password'])
            email = form.cleaned_data['email']

            if findIfUserExist(username):
                return render(request, 'register.html')

            newUser = User(username=username, password=password, email=email)
            newUser.save()
            return redirect('login')
        else:
            return render(request, 'register.html')