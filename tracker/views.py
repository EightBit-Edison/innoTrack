from django.shortcuts import render

# Create your views here.
from django.views.generic.edit import FormView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import auth
from django.http import HttpResponseRedirect

def wacs(request):
    context = {'li','lo'}
    return render(request, 'wacs.html', context)

class LoginFormView(FormView):
    form_class = AuthenticationForm

    # Аналогично регистрации, только используем шаблон аутентификации.
    template_name = "login.html"

    # В случае успеха перенаправим на .
    success_url = "/wacs"

    def form_valid(self, form):
        # Получаем объект пользователя на основе введённых в форму данных.
        self.user = form.get_user()

        # Выполняем аутентификацию пользователя.
        auth.login(self.request, self.user)
        return super(LoginFormView, self).form_valid(form)
