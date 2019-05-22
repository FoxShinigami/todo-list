# -*- coding: utf-8 -*-
from django.conf.urls import include
from django.urls import path
from . import api

from rest_framework import routers

router = routers.SimpleRouter()
router.register('section', api.SectionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
