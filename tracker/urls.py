from django.conf.urls import url
from . import views

urlpatterns = [

    url(r'^tracking/', views.LoginFormView.as_view()),
    url(r'^wacs/', views.wacs, name='wacs'),
]