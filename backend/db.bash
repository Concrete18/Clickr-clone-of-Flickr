if [ $1 == 'seed' ]; then
    npx dotenv sequelize db:seed:undo:all
    npx dotenv sequelize db:seed:all
elif [ $1 == 'migrate' ]; then
    npx dotenv sequelize db:migrate:undo:all
    npx dotenv sequelize db:migrate
elif [ $1 == 'both' ]; then
    npx dotenv sequelize db:seed:undo:all
    npx dotenv sequelize db:migrate:undo:all
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
else
    echo "Unknown arg given. $1 is invalid."
fi
