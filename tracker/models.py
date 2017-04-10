from django.db import models
from django.contrib.auth.models import User
import csv

# Create your models here.

class Geolabels(models.Model):
    student = models.ForeignKey(User)
    latitude = models.FloatField()
    longitude = models.FloatField()
    location_date = models.DateTimeField('date of tracking')


