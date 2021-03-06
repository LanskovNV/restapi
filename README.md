# restapi

## Simple CRUD rest api with jwt bearer authorisation

# Environment

specify .env file with:

```dotenv
HOST=...
PORT=...
DB_URL=...
PAGE_SIZE=...
AUTH_SECRET=...
```

# Run

To run the project, open terminal at location you want, and do the following:
```bash
git clone https://github.com/LanskovNV/restapi.git
cd restapi
npm install
npm run start
```

# Deploy

To deploy with docker, do the following:

1. clone repo
2. run 
```shell
./run.sh
```

# Documentation

Api documentation available [here](https://crud.leins275.xyz/api/v1/swagger/)
