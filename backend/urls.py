from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout, name='logout'),
    path('ask/', views.ask, name='ask'),
    path('get-questions/', views.getQuestions, name='getQuestions'),
    path('detail/', views.getDetail, name='getDetail'),
    path('answer/', views.answer, name='answer'),
]