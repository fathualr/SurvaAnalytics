SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.admin (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_pengguna uuid NOT NULL,
    nama_admin character varying(255),
    kontak_darurat character varying(255)
);

CREATE TABLE public.hadiah (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nama character varying(255) NOT NULL,
    deskripsi text,
    stok bigint NOT NULL,
    harga_poin bigint NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);

CREATE TABLE public.konfigurasi_harga (
    id integer DEFAULT 1 NOT NULL,
    harga_dasar numeric(20,2) NOT NULL,
    harga_per_pertanyaan numeric(20,2) NOT NULL,
    harga_per_responden numeric(20,2) NOT NULL,
    harga_per_durasi numeric(20,2) NOT NULL,
    updated_at timestamp with time zone NOT NULL
);

CREATE TABLE public.pembayaran_survei (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_survei uuid,
    id_umum uuid,
    jumlah_tagihan numeric NOT NULL,
    metode_pembayaran character varying,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    invoice_url text,
    jumlah_dibayar numeric,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.pengguna (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    email_confirmed boolean DEFAULT false,
    email_confirmation_token character varying(255),
    email_confirmation_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    reauth_token character varying(255),
    reauth_sent_at timestamp with time zone,
    role character varying(50) DEFAULT 'umum'::character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.penukaran_hadiah (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_umum uuid,
    total_poin bigint NOT NULL,
    keterangan text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.pertanyaan_survei (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_survei uuid NOT NULL,
    teks_pertanyaan text NOT NULL,
    tipe_pertanyaan character varying(255) NOT NULL,
    opsi jsonb,
    is_required boolean DEFAULT true NOT NULL,
    tipe_visualisasi character varying(255) DEFAULT 'pie'::character varying NOT NULL,
    index integer
);

CREATE TABLE public.respon_survei (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_survei uuid NOT NULL,
    id_umum uuid,
    respon jsonb NOT NULL,
    profil_metadata jsonb,
    is_completed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survei (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_umum uuid,
    judul character varying(255) NOT NULL,
    deskripsi text,
    status character varying(255) DEFAULT 'draft'::character varying,
    kriteria jsonb,
    jumlah_responden bigint NOT NULL,
    tanggal_mulai date NOT NULL,
    tanggal_berakhir date NOT NULL,
    hadiah_poin bigint NOT NULL,
    umpan_balik text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.umum (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_pengguna uuid NOT NULL,
    nama character varying(255),
    profil_responden jsonb,
    profil_klien jsonb,
    poin bigint DEFAULT 0
);

INSERT INTO public.admin VALUES ('77597ed9-c00c-4a6e-9c7c-2fcd18160e36', 'b82a663f-bc50-40fc-b82b-5d9672f7e909', NULL, NULL);
INSERT INTO public.pengguna VALUES ('b82a663f-bc50-40fc-b82b-5d9672f7e909', 'admin@email.com', '$2b$10$Fn4OeE4DYqdm0oeexB.Z.OHo5Bfx5Q0bv02IJNdwYDAffkLwPFra2', true, NULL, NULL, '2025-06-23 17:33:52.346+00', NULL, NULL, 'admin', '2025-06-23 17:33:44.66+00', '2025-06-23 17:33:52.353+00');

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.hadiah
    ADD CONSTRAINT hadiah_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.konfigurasi_harga
    ADD CONSTRAINT konfigurasi_harga_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pembayaran_survei
    ADD CONSTRAINT pembayaran_survei_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pengguna
    ADD CONSTRAINT pengguna_email_key UNIQUE (email);
ALTER TABLE ONLY public.pengguna
    ADD CONSTRAINT pengguna_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.penukaran_hadiah
    ADD CONSTRAINT penukaran_hadiah_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pertanyaan_survei
    ADD CONSTRAINT pertanyaan_survei_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.respon_survei
    ADD CONSTRAINT respon_survei_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survei
    ADD CONSTRAINT survei_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.umum
    ADD CONSTRAINT umum_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT fk_admin_pengguna FOREIGN KEY (id_pengguna) REFERENCES public.pengguna(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.pembayaran_survei
    ADD CONSTRAINT fk_pembayaran_survei_survei FOREIGN KEY (id_survei) REFERENCES public.survei(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.penukaran_hadiah
    ADD CONSTRAINT fk_penukaran_hadiah_umum FOREIGN KEY (id_umum) REFERENCES public.umum(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.pertanyaan_survei
    ADD CONSTRAINT fk_pertanyaan_survei_survei FOREIGN KEY (id_survei) REFERENCES public.survei(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.respon_survei
    ADD CONSTRAINT fk_respon_survei_survei FOREIGN KEY (id_survei) REFERENCES public.survei(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.respon_survei
    ADD CONSTRAINT fk_respon_survei_umum FOREIGN KEY (id_umum) REFERENCES public.umum(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.survei
    ADD CONSTRAINT fk_survei_umum FOREIGN KEY (id_umum) REFERENCES public.umum(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public.umum
    ADD CONSTRAINT fk_umum_pengguna FOREIGN KEY (id_pengguna) REFERENCES public.pengguna(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.pembayaran_survei
    ADD CONSTRAINT pembayaran_survei_id_umum_fkey FOREIGN KEY (id_umum) REFERENCES public.umum(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hadiah ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.konfigurasi_harga ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pembayaran_survei ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengguna ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.penukaran_hadiah ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pertanyaan_survei ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.respon_survei ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survei ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umum ENABLE ROW LEVEL SECURITY;
