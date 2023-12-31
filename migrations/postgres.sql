-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.category
(
    title text COLLATE pg_catalog."default" NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    CONSTRAINT category_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.priority
(
    title text COLLATE pg_catalog."default" NOT NULL,
    color text COLLATE pg_catalog."default" NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    CONSTRAINT priority_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.task
(
    title text COLLATE pg_catalog."default" NOT NULL,
    completed numeric NOT NULL,
    task_date timestamp without time zone,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    category_id bigint,
    priority_id bigint,
    user_id bigint NOT NULL,
    CONSTRAINT task_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE public.task
    IS 'user tasks';

CREATE TABLE IF NOT EXISTS public.user_data
(
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    photo text COLLATE pg_catalog."default",
    CONSTRAINT user_data_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE public.user_data
    IS 'this is a user_data table';

ALTER TABLE IF EXISTS public.category
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id)
    REFERENCES public.user_data (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.priority
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id)
    REFERENCES public.user_data (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task
    ADD CONSTRAINT category_fkey FOREIGN KEY (category_id)
    REFERENCES public.category (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task
    ADD CONSTRAINT priority_fkey FOREIGN KEY (priority_id)
    REFERENCES public.priority (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id)
    REFERENCES public.user_data (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;