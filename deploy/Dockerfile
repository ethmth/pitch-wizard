FROM python:3.12
WORKDIR /app
COPY ./deploy/requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . /app/pitch-wizard
WORKDIR /app/pitch-wizard
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:80"]