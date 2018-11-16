DROP TRIGGER US001_T1
/
DROP TABLE US001
/
DROP TABLE US002
/
CREATE TABLE "US002"
(
  "ID" NUMBER(4,0) GENERATED BY DEFAULT AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 ORDER  NOCYCLE NOT NULL ENABLE,
  "NOME" VARCHAR2(50) NOT NULL ENABLE,
  "ID_UF" NUMBER(2,0) NOT NULL ENABLE,
  "IDADE_MINIMA" NUMBER(3,0) DEFAULT 18,
  "ID_NACIONALIDADE" NUMBER(3,0) DEFAULT 32, 
   CONSTRAINT "US002_PK" PRIMARY KEY ("ID")
  USING INDEX  ENABLE
)
/
ALTER TABLE  "US002" ADD CONSTRAINT "US002_FK" FOREIGN KEY ("ID_UF") REFERENCES  "UF" ("ID") ENABLE
/
CREATE TABLE  "US001" 
(	
"ID" NUMBER(4,0) GENERATED BY DEFAULT AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 ORDER  NOCYCLE  NOT NULL ENABLE, 
"NOME" VARCHAR2(100) NOT NULL ENABLE, 
"IDADE" NUMBER(3,0) DEFAULT 18, 
"ID_NACIONALIDADE" NUMBER(3,0) DEFAULT 32, 
"CHAVE" VARCHAR2(4), 
"ID_CARGO" NUMBER(4,0) NOT NULL ENABLE, 
CONSTRAINT "US001_PK" PRIMARY KEY ("ID")
USING INDEX  ENABLE
)
/
ALTER TABLE  "US001" ADD CONSTRAINT "US001_FK_CARGO" FOREIGN KEY ("ID_CARGO") REFERENCES  "US002" ("ID") ENABLE
/
ALTER TABLE  "US001" ADD CONSTRAINT "US001_FK_NACIONALIDADE" FOREIGN KEY ("ID_NACIONALIDADE") REFERENCES  "COUNTRY" ("ID") ENABLE
/
CREATE OR REPLACE EDITIONABLE TRIGGER  "US001_T1" 
BEFORE
insert on "US001"
for each row
begin
DECLARE
v_chave varchar2(4);
BEGIN
SELECT DBMS_RANDOM.STRING('X', 4) INTO v_chave FROM DUAL;
:new.CHAVE := v_chave;
END;
end;
/
ALTER TRIGGER  "US001_T1" ENABLE
/
INSERT INTO US002 (NOME,ID_UF,IDADE_MINIMA,ID_NACIONALIDADE) VALUES('VEREADOR',25,18,32);
INSERT INTO US002 (NOME,ID_UF,IDADE_MINIMA,ID_NACIONALIDADE) VALUES('PREFEITO',25,18,32);
INSERT INTO US001 (NOME,IDADE,ID_NACIONALIDADE,ID_CARGO) VALUES('JOSÉ DA SILVA',30,32,1);
INSERT INTO US001 (NOME,IDADE,ID_NACIONALIDADE,ID_CARGO) VALUES('MARIA DA SILVA',25,32,2);
/
