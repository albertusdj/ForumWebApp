from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import User, ActiveUser, Question, Answer
from django.views.decorators.csrf import ensure_csrf_cookie
from .forms import SignUpForm, LogInForm, QuestionForm, AnswerForm
from .utility import createHashPassword, authenticateUser, findIfUserExist
import random
import string
from datetime import datetime, timezone
from django.core import serializers
import json

@ensure_csrf_cookie
def index(request):
    token = request.COOKIES.get('login')
    activeUser = authenticateUser(token)

    if activeUser==None:
        return redirect('login')
    
    return render(request, 'index.html')

@ensure_csrf_cookie
def getQuestions(request):
    questions = serializers.serialize('json', Question.objects.all())
    return HttpResponse(questions, content_type='application/json')

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

@ensure_csrf_cookie
def logout(request):
    token = request.COOKIES.get('login')
    activeUser = ActiveUser.objects.get(token=token)
    activeUser.delete()

    response = redirect('login')
    response.delete_cookie('login')
    return response

@ensure_csrf_cookie
def ask(request):
    if request.method=='GET':
        token = request.COOKIES.get('login')
        activeUser = authenticateUser(token)

        if activeUser == None:
            return redirect('login')
        else:
            return render(request, 'ask.html')
    elif request.method=='POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            token = request.COOKIES.get('login')
            currentUser = ActiveUser.objects.get(token=token)

            title = form.cleaned_data['title']
            content = form.cleaned_data['content']

            newQuestion = Question(title=title, content=content)
            newQuestion.user = currentUser.user
            newQuestion.created = datetime.now(timezone.utc)

            newQuestion.save()

            return redirect(index)

@ensure_csrf_cookie
def answer(request):
    if request.method=='GET':
        token = request.COOKIES.get('login')
        activeUser = authenticateUser(token)

        if activeUser == None:
            return redirect('login')
        else:
            return render(request, 'answer.html')

@ensure_csrf_cookie
def getDetail(request):
    if request.method=='GET':
        token = request.COOKIES.get('login')
        activeUser = authenticateUser(token)

        if activeUser == None:
            return redirect('login')
        else:
            questionID = request.GET.get('id', '')
            question = Question.objects.filter(pk=questionID)
            answers = Answer.objects.filter(question=questionID)

            props = {
                'question': serializers.serialize('json', question),
                'answers': serializers.serialize('json', answers) 
            }

            return render(request, 'detail.html', {'props':props})