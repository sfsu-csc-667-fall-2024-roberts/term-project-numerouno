import pgp from "pg-promise";


const connection = pgp()(process.env.DATABASE_URL as string);

export default connection; 
