
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT 'false'
);

CREATE TABLE "retailer" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(255),
"website" TEXT
);

CREATE TABLE "size" (
"id" SERIAL PRIMARY KEY,
"type" TEXT
);

CREATE TABLE "retailer_size" (
"id" SERIAL PRIMARY KEY,
"retailer_id" INT REFERENCES "retailer",
"size_id" INT REFERENCES "size",
"available" TEXT
);