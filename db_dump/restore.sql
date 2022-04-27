--
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE cse412_bank;
--
-- Name: cse412_bank; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE cse412_bank WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE cse412_bank OWNER TO postgres;

\connect cse412_bank

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: acc_holders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.acc_holders (
    uemail character varying(50),
    accid integer
);


ALTER TABLE public.acc_holders OWNER TO postgres;

--
-- Name: idseq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.idseq
    START WITH 6
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.idseq OWNER TO postgres;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    accountid integer DEFAULT nextval('public.idseq'::regclass) NOT NULL,
    balance double precision DEFAULT 0 NOT NULL,
    type character varying(25) NOT NULL,
    bankid integer NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: banks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banks (
    bankid integer NOT NULL,
    credit_min double precision DEFAULT 0 NOT NULL,
    address character varying(60) NOT NULL,
    name character varying(60)
);


ALTER TABLE public.banks OWNER TO postgres;

--
-- Name: qual_credit_card; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.qual_credit_card (
    uemail character varying(50),
    b_bankid integer,
    status boolean DEFAULT false NOT NULL
);


ALTER TABLE public.qual_credit_card OWNER TO postgres;

--
-- Name: transidseq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transidseq
    START WITH 2
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transidseq OWNER TO postgres;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    uemail character varying(50) NOT NULL,
    accid integer NOT NULL,
    transactionid integer DEFAULT nextval('public.transidseq'::regclass) NOT NULL,
    type character varying(25) NOT NULL,
    amount double precision
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email character varying(40) NOT NULL,
    name character varying(45) NOT NULL,
    address character varying(60) NOT NULL,
    upassword character varying(60) NOT NULL,
    age integer NOT NULL,
    rep_income integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: acc_holders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.acc_holders (uemail, accid) FROM stdin;
\.
COPY public.acc_holders (uemail, accid) FROM '$$PATH$$/3884.dat';

--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (accountid, balance, type, bankid) FROM stdin;
\.
COPY public.accounts (accountid, balance, type, bankid) FROM '$$PATH$$/3882.dat';

--
-- Data for Name: banks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banks (bankid, credit_min, address, name) FROM stdin;
\.
COPY public.banks (bankid, credit_min, address, name) FROM '$$PATH$$/3883.dat';

--
-- Data for Name: qual_credit_card; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qual_credit_card (uemail, b_bankid, status) FROM stdin;
\.
COPY public.qual_credit_card (uemail, b_bankid, status) FROM '$$PATH$$/3886.dat';

--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (uemail, accid, transactionid, type, amount) FROM stdin;
\.
COPY public.transactions (uemail, accid, transactionid, type, amount) FROM '$$PATH$$/3885.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, name, address, upassword, age, rep_income) FROM stdin;
\.
COPY public.users (email, name, address, upassword, age, rep_income) FROM '$$PATH$$/3881.dat';

--
-- Name: idseq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.idseq', 30, true);


--
-- Name: transidseq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transidseq', 29, true);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (accountid);


--
-- Name: banks banks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banks
    ADD CONSTRAINT banks_pkey PRIMARY KEY (bankid);


--
-- Name: transactions transactions_transactionid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_transactionid_key UNIQUE (transactionid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- Name: acc_holders acc_holders_accid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acc_holders
    ADD CONSTRAINT acc_holders_accid_fkey FOREIGN KEY (accid) REFERENCES public.accounts(accountid) ON DELETE CASCADE;


--
-- Name: acc_holders acc_holders_uemail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acc_holders
    ADD CONSTRAINT acc_holders_uemail_fkey FOREIGN KEY (uemail) REFERENCES public.users(email) ON DELETE CASCADE;


--
-- Name: accounts accounts_bankid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_bankid_fkey FOREIGN KEY (bankid) REFERENCES public.banks(bankid) ON DELETE CASCADE;


--
-- Name: qual_credit_card qual_credit_card_b_bankid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qual_credit_card
    ADD CONSTRAINT qual_credit_card_b_bankid_fkey FOREIGN KEY (b_bankid) REFERENCES public.banks(bankid) ON DELETE CASCADE;


--
-- Name: qual_credit_card qual_credit_card_uemail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qual_credit_card
    ADD CONSTRAINT qual_credit_card_uemail_fkey FOREIGN KEY (uemail) REFERENCES public.users(email) ON DELETE CASCADE;


--
-- Name: transactions transactions_accid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_accid_fkey FOREIGN KEY (accid) REFERENCES public.accounts(accountid) ON DELETE CASCADE;


--
-- Name: transactions transactions_uemail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_uemail_fkey FOREIGN KEY (uemail) REFERENCES public.users(email) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

