from django.shortcuts import render

# Create your views here.
from django.views.generic.edit import FormView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import auth
from django.http import HttpResponseRedirect


def wacs(request):
    context = {"in","lo"}
    return render(request, 'wacs.html', context)


class LoginFormView(FormView):
    form_class = AuthenticationForm

    # Аналогично регистрации, только используем шаблон аутентификации.
    template_name = "auth.html"

    # В случае успеха перенаправим на .
    success_url = "/wacs"

    def form_valid(self, form):
        # Получаем объект пользователя на основе введённых в форму данных.
        self.username = self.request.POST['username']
        self.password = self.request.POST['password']
        self.user = auth.authenticate(username=self.username, password=self.password)

        # Выполняем аутентификацию пользователя.
        auth.login(self.request, self.user)
        return super(LoginFormView, self).form_valid(form)
