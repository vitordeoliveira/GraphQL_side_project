yarn install

ON UBUNTU
sudo apt-get install libtinfo5 libaio1

*if U do not have mysql installed*
asdf plugin-add mysql
asdf list-all mysql
asdf install mysql [VERSION]
asdf global mysql [VERSION]

## Setup

export DATADIR = [PATH_U_CHOOSE]

* For 5.x
  1. ```mysql_install_db --datadir=$DATADIR```
  1. ```mysql_secure_installation```
* For 8.x+
  1. ```mysqld --initialize-insecure --datadir=$DATADIR```
  1. ```mysql_ssl_rsa_setup --datadir=$DATADIR```


## Running

To run the server: ```mysqld -D --datadir=$DATADIR```

export NODE_ENV=development && yarn sequelize db:create
export NODE_ENV=development && yarn sequelize db:migrate
export NODE_ENV=development && yarn sequelize db:seed:all
