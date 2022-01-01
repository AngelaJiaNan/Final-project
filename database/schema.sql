set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "users" (
	"userID" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "events" (
	"userID" integer NOT NULL,
	"eventID" serial NOT NULL,
	"title" TEXT NOT NULL,
	"date" DATE,
	"address" TEXT,
	"lat" DECIMAL,
	"lng" DECIMAL,
	"startingtime" TIME,
	CONSTRAINT "events_pk" PRIMARY KEY ("eventID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "runninglogs" (
	"runninglogID" serial NOT NULL,
	"date" DATE NOT NULL,
	"duration" DECIMAL NOT NULL,
	"distance" integer NOT NULL,
	"userID" integer NOT NULL,
	"startingtime" TIME NOT NULL,
	CONSTRAINT "runninglogs_pk" PRIMARY KEY ("runninglogID")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("userID") REFERENCES "users"("userID");

ALTER TABLE "runninglogs" ADD CONSTRAINT "runninglogs_fk0" FOREIGN KEY ("userID") REFERENCES "users"("userID");
