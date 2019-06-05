from rest_framework import serializers

from .models import Section, Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = (
            'id',
            'name',
            'description',
            'section'
        )  

class SectionSerializer(serializers.ModelSerializer):

    job = serializers.SerializerMethodField('jobs')

    class Meta:
        model = Section
        fields = (
            'id',
            'name',
            'job',
        )    

    def jobs(self,section):
        return JobSerializer(Job.objects.filter(section = section), many = True).data