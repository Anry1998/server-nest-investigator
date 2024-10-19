FROM node

# Рабочая директория, где лежат все преокты
# Если мы указали эту папку, то при копировании нам достаточно указать . и файлы будут помещены именно сюда
WORKDIR /investigator-server-nest

# Если мы не будем менять нод модули, то докер возьмет их из кеша и не будет по новой загружать их
# Это нужно на случай, если изменения были только в коде
# COPY package.json /investigator-server-nest

# RUN npm install 

# Копируем определенный папки в докер image
# Сначала указываем, откуда мы хотим скопировать, если стоит . - это означает, что все файлы в корне проекта
# Корень проекта - то место, где лежит сам докерфайл
# Следом указваем, в какую папку мы хоти мположить, если стоит . - это означает, что все файлы будут помещены в корнь проекта
COPY . .
RUN npm install

# Запускается - когда мы строим образ


# COPY . .

# COPY ./dist ./dist

# ENV APP_PORT=5001


# # Обозначаем порт
# EXPOSE 5000

# # Обозначаем порт, ссылаясь на переменную
# EXPOSE $APP_PORT

# -v logs:/investigator-server-nest/data
# при удалении кгонтейнера данные в нем сохраняются

VOLUME [ "/investigator-server-nest/data" ]

# Запускается - когда мы запускаем образ
CMD ["npm", "run", "start:dev"]


# docker login --username anry1998
# docker build . - строим свой собственный образ, и также указываем, где нам надо взять инструкции 
# docker build -t logsApp(-t - задать название образа, либо его версии logsApp:exc).
# docker run e2b8a94c70a8 - запуск контейнера
# docker run -p 5000:5000 e2b8a94c70a8 - первый порт на локальной машине, второй - какой порт из докер контейнера мы хотим замапить на наш локальный
# docker stop e2b8a94c70a8 - остановка контейнера
# docker images -

# docker run -d -p 3000:3000 --name --rm(удаление после стоп) -e PORT-3000 (задаем env  переменную на уровне запуска контейнера)

# docker run --env-file ./env - задаем env переменную из файла .env  в проекте

# docker rmi(удаление образа)


# docker push [OPTIONS] NAME[:TAG]

# переименовываем
# docker tag e2b8a94c70a8 anry1998/investigator-server-nest

# пушим
# docker push anry1998/investigator-server-nest:latest


# docker rmi 027f4598a94e08e4e8d33c6571e6fe4804c77a0bd085a0aa1f45db5d7744ef6e





