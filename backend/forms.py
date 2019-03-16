from django import forms

class SignUpForm(forms.Form):
    username = forms.CharField(label='Username', max_length=30)
    email = forms.EmailField(label='Email')
    password = forms.CharField(label='Password', max_length=256)

class LogInForm(forms.Form):
    username = forms.CharField(label='Username', max_length=30)
    password = forms.CharField(label='Password', max_length=256)

class QuestionForm(forms.Form):
    title = forms.Charfield(label='Title', max_length=50)
    content = forms.Charfield(label='Content', max_length=256)

class AnswerForm(forms.Form):
    content = forms.CharField(label='Answer', max_length=1024)