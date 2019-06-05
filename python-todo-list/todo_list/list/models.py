# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Section (models.Model):
    name = models.CharField(max_length = 50)

class Job (models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length=120)
    section = models.ForeignKey(Section, on_delete = models.CASCADE)