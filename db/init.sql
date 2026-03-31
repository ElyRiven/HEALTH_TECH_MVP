CREATE TABLE IF NOT EXISTS public.pacientes (
    identificacion  INTEGER         PRIMARY KEY,
    nombres         VARCHAR(100)    NOT NULL,
    apellidos       VARCHAR(100)    NOT NULL,
    fecha_de_nacimiento DATE        NOT NULL,
    genero          VARCHAR(50)     NOT NULL,
    criticidad      INTEGER         NOT NULL,
    hora_de_registro TIMESTAMPTZ    NOT NULL,
    estado          VARCHAR(50)     NOT NULL
);

CREATE TABLE IF NOT EXISTS public.constantes_vitales (
    id                      SERIAL          PRIMARY KEY,
    id_paciente             INTEGER         NOT NULL REFERENCES public.pacientes(identificacion),
    frecuencia_cardiaca     INTEGER         NOT NULL,
    frecuencia_respiratoria INTEGER         NOT NULL,
    saturacion_o2           NUMERIC(5,1)    NOT NULL,
    temperatura             NUMERIC(4,1)    NOT NULL,
    presion                 VARCHAR(10)     NOT NULL,
    nivel_de_conciencia     VARCHAR(50)     NOT NULL,
    nivel_de_dolor          INTEGER         NOT NULL
);
