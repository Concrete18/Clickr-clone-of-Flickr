npx sequelize model:generate --name User --attributes userName:string,email:string,hashedPassword:string

npx sequelize model:generate --name Photo --attributes title:string,albumId:string,description:string,imgUrl:string

npx sequelize model:generate --name Comment --attributes userId:string,photoId:integer,commentBody:string

npx sequelize model:generate --name Album --attributes userId:integer,title:string,description:string

npx sequelize seed:generate --name seed_user

npx sequelize seed:generate --name seed_photo

npx sequelize seed:generate --name seed_comment

npx sequelize seed:generate --name seed_album
